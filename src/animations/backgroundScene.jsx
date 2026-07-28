import { useEffect, useRef } from 'react';
import { useScroll, useSpring } from 'framer-motion';
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
  for(int i=0;i<7;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.52;}
  return v;
}
float fbm4(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.1+vec2(3.1,1.7);a*=.5;}
  return v;
}

/* ── 0: volumetric ink nebula ── */
vec3 s0(vec2 uv,float t,vec2 m,float ms,float zp){
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
  lum+=zp*combined*.06;
  float s1=pow(hash(floor(uv*480.)),30.)*step(.9940,hash(floor(uv*480.+.3)));
  float s2=pow(hash(floor(uv*820.)),38.)*step(.9968,hash(floor(uv*820.+.7)));
  lum+=s1*.55+s2*.30;
  lum+=exp(-md*md*2.0)*(.04+ms*.10);
  lum+=exp(-md*md*6.0)*ms*.06;
  return vec3(lum);
}

/* ── 1: infinite grid tunnel ── */
vec3 s1(vec2 uv,float t,vec2 m,float ms,float zp){
  vec2 p=uv*2.-1.; p.x*=u_res.x/u_res.y;
  vec2 mv=m*2.-1.; mv.x*=u_res.x/u_res.y;
  float md=length(p-mv);
  p+=mv*.08*(1.-length(p)*.5);
  float r=length(p);
  float a=atan(p.y,p.x);
  float speed=.65+zp*.25;
  vec2 tuv=vec2(a/6.2832+t*.028,1./(r+.008)-t*speed);
  tuv+=vec2(fbm(tuv*.35+mv*.06+t*.018)-.5)*.12;
  float lx=abs(fract(tuv.x*10.)-.5)*2.;
  float ly=abs(fract(tuv.y*6.)-.5)*2.;
  float grid=smoothstep(.84,1.,max(lx,ly));
  float lx2=abs(fract(tuv.x*40.)-.5)*2.;
  float ly2=abs(fract(tuv.y*24.)-.5)*2.;
  float grid2=smoothstep(.92,1.,max(lx2,ly2))*.28;
  float ld=abs(fract((tuv.x+tuv.y*2.)*7.)-.5)*2.;
  float diag=smoothstep(.92,1.,ld)*.18;
  float fade=smoothstep(2.4,.0,r)*smoothstep(.0,.06,r);
  float g=max(max(grid,grid2),diag)*fade;
  float lum=mix(.010,.28,g);
  lum=mix(lum,.010,smoothstep(.5,2.4,r));
  float ring=smoothstep(.012,.0,abs(fract(1./(r+.01)*.18-t*.3)-.5))*.15*fade;
  lum+=ring;
  lum+=exp(-md*md*3.5)*(.030+ms*.09)*max(g,.15);
  lum+=exp(-md*md*8.)*(.015+ms*.04);
  lum+=zp*exp(-r*r*1.5)*.08;
  return vec3(lum);
}

/* ── 2: terrain contour lines ── */
vec3 s2(vec2 uv,float t,vec2 m,float ms,float zp){
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
  lum+=line*line*.05+zp*line*.04;
  lum*=smoothstep(.78,.05,length(uv-.5));
  lum+=exp(-md*md*2.8)*(.022+ms*.07);
  return vec3(lum);
}

/* ── 3: vortex with animated rings ── */
vec3 s3(vec2 uv,float t,vec2 m,float ms,float zp){
  vec2 p=uv*2.-1.; p.x*=u_res.x/u_res.y;
  vec2 mv=m*2.-1.; mv.x*=u_res.x/u_res.y;
  float md=length(p-mv);
  vec2 rp=p-mv*.22;
  float r=length(rp);
  float a=atan(rp.y,rp.x);
  float swirl=a+log(max(r,.001))*2.4-t*(.20+zp*.18);
  float fn=fbm(vec2(swirl*.32,r*1.0)+t*.04);
  float arms =(sin(swirl*2.+fn*6.)*.5+.5);
  float arms2=(sin(swirl*3.+fn*4.+1.2)*.5+.5);
  float fade=exp(-r*r*.65)*(1.-exp(-r*r*9.));
  float combined=(arms*.7+arms2*.3)*fade;
  float rOff=zp*.02;
  float rings=smoothstep(.016,.0,abs(r-(.22+rOff)))*.75
             +smoothstep(.012,.0,abs(r-(.40+rOff)))*.55
             +smoothstep(.010,.0,abs(r-(.58+rOff)))*.38
             +smoothstep(.008,.0,abs(r-(.74+rOff)))*.22
             +smoothstep(.006,.0,abs(r-(.88+rOff)))*.12;
  rings*=.8+(sin(t*.9+r*6.)*.5+.5)*.2;
  float lum=combined*.14+rings;
  lum+=fbm(rp*2.8+t*.07)*.028;
  lum=mix(.010,.26,lum);
  lum+=exp(-md*md*2.0)*(.020+ms*.06);
  lum+=zp*exp(-r*r*3.)*.07;
  return vec3(lum);
}

void main(){
  vec2 uv=v_uv;
  float sc=u_scroll;
  float t=u_t;
  float prog=sc*3.;
  int   si=int(min(prog,2.999));
  float sf=fract(prog);

  /* zoom: base + per-section pulse + slow breathe */
  float zoom=1.0+sc*.55+sin(sf*3.14159)*.22+sin(t*.28)*.04+sin(t*.17)*.025;

  /* pan drifts + mouse parallax */
  vec2 pan=vec2(
    sin(sc*6.2832*.5)*.06+sin(t*.12)*.015,
   -sc*.18+sin(t*.09)*.010
  )+(u_mouse-.5)*.032;

  /* slow rotation */
  float rot=sc*.055+sin(t*.15)*.008;
  vec2 center=uv-.5;
  float cr=cos(rot),sr=sin(rot);
  center=vec2(cr*center.x-sr*center.y,sr*center.x+cr*center.y);
  vec2 tuv=center/zoom+pan+.5;

  float zp=sin(sf*3.14159); /* 0→1→0 within each section */
  float blend=smoothstep(.22,.78,sf);
  float dip  =1.-sin(sf*3.14159)*.52;

  vec3 curr,next_;
  if(si==0){curr=s0(tuv,t,u_mouse,u_mspeed,zp);next_=s1(tuv,t,u_mouse,u_mspeed,zp);}
  else if(si==1){curr=s1(tuv,t,u_mouse,u_mspeed,zp);next_=s2(tuv,t,u_mouse,u_mspeed,zp);}
  else{curr=s2(tuv,t,u_mouse,u_mspeed,zp);next_=s3(tuv,t,u_mouse,u_mspeed,zp);}

  vec3 col=mix(curr,next_,blend)*dip;

  /* double vignette */
  vec2 vig=uv-.5;
  col*=1.-dot(vig,vig)*2.6;
  col*=smoothstep(.9,.1,length(vig)*1.4);

  /* grain */
  col+=(hash(uv+fract(t*.073))-.5)*.026;

  /* cap at .35 — brighter but never blows out */
  col=clamp(col,vec3(0.),vec3(.35));

  gl_FragColor=vec4(col,1.);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error('Shader error:', gl.getShaderInfoLog(s));
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
    startT: null,
    raf: null,
  });

  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 36, damping: 24 });

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
      s.mvx = (nx - s.mx) * 8;
      s.mvy = (ny - s.my) * 8;
      s.mx = nx;
      s.my = ny;
    };
    window.addEventListener('mousemove', onMove);

    const loop = (now) => {
      if (!s.startT) s.startT = now;
      const t = (now - s.startT) * 0.001;

      s.rmx = lerp(s.rmx, s.mx, 0.07);
      s.rmy = lerp(s.rmy, s.my, 0.07);
      const spd = Math.sqrt(s.mvx ** 2 + s.mvy ** 2);
      s.mspd = lerp(s.mspd, spd, 0.1);
      s.mvx *= 0.78;
      s.mvy *= 0.78;

      const sc = smoothScroll.get();

      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.t, t);
      gl.uniform1f(U.scroll, sc);
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
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, [smoothScroll]);

  return <canvas ref={canvasRef} className="bg-scene" />;
}
