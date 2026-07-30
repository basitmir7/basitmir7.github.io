import { useEffect, useRef } from 'react';
import './backgroundScene.css';

const VS = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main(){ v_uv=a_pos*.5+.5; gl_Position=vec4(a_pos,0.,1.); }
`;

const FS = `
precision highp float;
varying vec2 v_uv;
uniform vec2  u_res;
uniform float u_t;
uniform float u_scroll;
uniform vec2  u_mouse;
uniform float u_mspeed;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  mat2 m=mat2(.8,.6,-.6,.8);
  for(int i=0;i<7;i++){v+=a*noise(p);p=m*p*2.02+vec2(1.9,7.3);a*=.52;}
  return v;
}
float fbm4(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.1+vec2(3.1,1.7);a*=.5;}
  return v;
}

/* ── shared stars — used by both scenes ── */
float stars(vec2 uv, float t, float density){
  vec2 gc1=floor(uv*260.);
  vec2 jc1=vec2(hash(gc1+vec2(.31,.74)),hash(gc1+vec2(.82,.15)));
  float sd1=length(fract(uv*260.)-jc1);
  float st1=step(.993,hash(gc1+vec2(.55,.22)))*pow(hash(gc1+vec2(.11,.67)),2.2)
            *(smoothstep(.36,.0,sd1)+smoothstep(.52,.0,sd1)*.5)
            *(sin(hash(gc1+.3)*6.28+t*(1.1+hash(gc1+.5)*1.8))*.35+.65);

  vec2 gc2=floor(uv*500.);
  vec2 jc2=vec2(hash(gc2+vec2(.23,.61)),hash(gc2+vec2(.77,.44)));
  float sd2=length(fract(uv*500.)-jc2);
  float st2=step(.9965,hash(gc2+vec2(.38,.91)))*pow(hash(gc2+vec2(.66,.28)),2.8)
            *(smoothstep(.26,.0,sd2)+smoothstep(.40,.0,sd2)*.4)
            *(sin(hash(gc2+.4)*6.28+t*(1.6+hash(gc2+.6)*2.2))*.28+.72);

  vec2 gc3=floor(uv*920.);
  vec2 jc3=vec2(hash(gc3+vec2(.55,.18)),hash(gc3+vec2(.29,.83)));
  float sd3=length(fract(uv*920.)-jc3);
  float st3=step(.9978,hash(gc3+vec2(.72,.36)))*pow(hash(gc3+vec2(.44,.91)),3.5)
            *(smoothstep(.16,.0,sd3)+smoothstep(.28,.0,sd3)*.3)
            *(sin(hash(gc3+.7)*6.28+t*(2.2+hash(gc3+.8)*2.8))*.20+.80);

  float vis=smoothstep(.54,.20,density);
  return (st1*.65+st2*.42+st3*.26)*vis;
}

/* ── SCENE 0: smoke nebula ── */
vec3 s0(vec2 uv,float t,vec2 m,float ms){
  vec2 p=uv*2.-1.; p.x*=u_res.x/u_res.y;
  vec2 mv=m*2.-1.; mv.x*=u_res.x/u_res.y;
  float md=length(p-mv);
  float mw=exp(-md*md*1.2)*(.18+ms*.32);
  vec2 warp=vec2(fbm(p*.75+vec2(t*.032,t*.025)+mv*.09)-.5,
                 fbm(p*.75+vec2(t*.025,-t*.032)+mv*.09)-.5)*1.5;
  warp+=normalize(p-mv+.001)*(-mw);
  vec2 warp2=vec2(fbm(p*1.6+t*.055+warp*.3)-.5,
                  fbm(p*1.6+t*.045-warp*.3)-.5)*.5;
  vec2 wp=p+(warp+warp2)*.6;
  float d=length(wp);
  float f1=fbm(wp*1.0+t*.04);
  float f2=fbm(wp*1.9-t*.03+f1*.8);
  float f3=fbm(wp*3.8+t*.06+f2*.5);
  float cloud=smoothstep(.92,.0,d*.7)*f2*f1*1.1;
  float detail=smoothstep(.8,.0,d*.9)*f3*.5;
  float combined=cloud+detail*.4;
  float lum=.018;
  lum=mix(lum,.075,combined*.7);
  lum=mix(lum,.175,combined*combined*1.5);
  lum=mix(lum,.300,combined*combined*combined*1.1);
  lum+=fbm4(wp*4.+t*.08)*combined*.08;
  lum+=stars(uv,t,combined);
  lum+=exp(-md*md*2.0)*(.04+ms*.10);
  lum+=exp(-md*md*6.0)*ms*.06;
  float purp=smoothstep(.1,.35,lum);
  return vec3(lum*(.92+purp*.06),lum*(.88+purp*.04),lum*(1.0+purp*.14));
}

/* ── SCENE 1: terrain contour ── */
vec3 s1(vec2 uv,float t,vec2 m,float ms){
  vec2 p=uv*2.-1.; p.x*=u_res.x/u_res.y;
  vec2 mv=m*2.-1.; mv.x*=u_res.x/u_res.y;
  float md=length(p-mv);
  float mpull=exp(-md*md*1.2)*(.16+ms*.20);
  vec2 mp=p-normalize(p-mv+.001)*mpull*.4;
  float h =fbm(mp*.65+vec2(t*.038,-t*.022));
  float h2=fbm(mp*1.3-vec2(t*.018,t*.030))*.45;
  float ht=h+h2;
  float cont =abs(fract(ht*6. +t*.035)-.5)*2.;
  float line =smoothstep(.055,.0,cont*.5)*.90;
  float cont2=abs(fract(ht*18.+t*.035)-.5)*2.;
  float line2=smoothstep(.038,.0,cont2*.5)*.30;
  float cont3=abs(fract(ht*54.+t*.035)-.5)*2.;
  float line3=smoothstep(.025,.0,cont3*.5)*.12;
  float allL=max(max(line,line2),line3);
  float lum=mix(.010,mix(.12,.24,line),allL);
  lum+=line*line*.05;
  lum+=stars(uv,t,allL);
  lum+=exp(-md*md*2.8)*(.022+ms*.07);
  float purp=smoothstep(.05,.22,lum)*line;
  return vec3(lum*(.91+purp*.05),lum*(.87+purp*.03),lum*(1.0+purp*.16));
}

void main(){
  vec2 uv=v_uv;
  float sc=u_scroll; /* 0-1, guaranteed to start at 0 */
  float t=u_t;

  /* scene split: first half of scroll = nebula, second = terrain */
  float prog=sc*2.0;
  float sf=clamp(prog,0.,1.);            /* 0→1 blend across full first half */
  float sf2=clamp(prog-1.0,0.,1.);      /* terrain phase (second half) */

  /* zoom: breathes independently of scroll scenes */
  float zoom=1.0+sc*.35+sin(t*.28)*.04+sin(t*.17)*.025;

  /* pan */
  vec2 pan=vec2(
    sin(t*.12)*.015,
    -sc*.12+sin(t*.09)*.010
  )+(u_mouse-.5)*.032;

  float rot=sc*.04+sin(t*.15)*.008;
  vec2 center=uv-.5;
  float cr=cos(rot),sr=sin(rot);
  center=vec2(cr*center.x-sr*center.y,sr*center.x+cr*center.y);
  vec2 tuv=center/zoom+pan+.5;

  /* blend: nebula fades out, terrain fades in — clean crossfade */
  float blend=smoothstep(.20,.80,sf);
  /* dip to black exactly at the midpoint */
  float dip=1.-sin(clamp(sf,0.,1.)*3.14159)*.50;

  vec3 c0=s0(tuv,t,u_mouse,u_mspeed);
  vec3 c1=s1(tuv,t,u_mouse,u_mspeed);
  vec3 col=mix(c0,c1,blend)*dip;

  /* strong side vignette */
  vec2 vig=uv-.5;
  col*=1.-dot(vig,vig)*3.1;

  /* subtle purple centre ambient */
  float radial=1.-smoothstep(.0,.85,length(vig*vec2(1.,.8)));
  col+=vec3(.010,.006,.022)*radial;

  /* grain */
  col+=(hash(uv+fract(t*.073))-.5)*.026;
  col=clamp(col,vec3(0.),vec3(.40));
  gl_FragColor=vec4(col,1.);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error('Shader:', gl.getShaderInfoLog(s));
  return s;
}

const lerp = (a, b, t) => a + (b - a) * t;

export default function BackgroundScene() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    mx: 0.5,
    my: 0.5,
    rmx: 0.5,
    rmy: 0.5,
    mvx: 0,
    mvy: 0,
    mspd: 0,
    rawScroll: 0,
    rScroll: 0,
    startT: null,
    raf: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
    if (!gl) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, 'u_res'),
      t: gl.getUniformLocation(prog, 'u_t'),
      scroll: gl.getUniformLocation(prog, 'u_scroll'),
      mouse: gl.getUniformLocation(prog, 'u_mouse'),
      mspeed: gl.getUniformLocation(prog, 'u_mspeed'),
    };

    const s = stateRef.current;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth;
      const ny = 1 - e.clientY / window.innerHeight;
      s.mvx = (nx - s.mx) * 10;
      s.mvy = (ny - s.my) * 10;
      s.mx = nx;
      s.my = ny;
    };
    window.addEventListener('mousemove', onMove);

    /* Read scroll directly — no spring, no framer-motion, no overshooting */
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      s.rawScroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const loop = (now) => {
      if (!s.startT) s.startT = now;
      const t = (now - s.startT) * 0.001;

      /* manual lerp — starts at 0, moves only when user actually scrolls */
      s.rScroll = lerp(s.rScroll, s.rawScroll, 0.04);

      s.rmx = lerp(s.rmx, s.mx, 0.07);
      s.rmy = lerp(s.rmy, s.my, 0.07);
      const spd = Math.sqrt(s.mvx ** 2 + s.mvy ** 2);
      s.mspd = lerp(s.mspd, spd, 0.1);
      s.mvx *= 0.78;
      s.mvy *= 0.78;

      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.t, t);
      gl.uniform1f(U.scroll, s.rScroll);
      gl.uniform2f(U.mouse, s.rmx, s.rmy);
      gl.uniform1f(U.mspeed, Math.min(s.mspd * 0.4, 1));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-scene" />;
}
