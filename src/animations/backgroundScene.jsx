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

/* ── Subtle Background Planets with Scroll Parallax ── */
vec3 drawPlanet(vec2 p, vec2 center, float radius, vec3 color, vec3 atmosphere, float shadowAngle){
  vec2 d = p - center;
  float dist = length(d);
  if(dist > radius * 1.8) return vec3(0.0);

  // Smooth sphere mask
  float mask = smoothstep(radius, radius - 0.002, dist);
  
  // Normalized planet local coordinates [-1, 1]
  vec2 sphereUv = d / radius;
  float z = sqrt(max(0.0, 1.0 - dot(sphereUv, sphereUv)));
  vec3 normal = vec3(sphereUv, z);

  // Soft directional light direction
  vec3 lightDir = normalize(vec3(cos(shadowAngle), sin(shadowAngle), 0.6));
  float diff = max(0.0, dot(normal, lightDir));
  
  // Planet surface noise texture
  float surface = fbm4(sphereUv * 2.5);
  vec3 planetBody = color * (diff * 0.45 + 0.08) * (0.85 + surface * 0.3);

  // Subtle limb atmosphere glow
  float rim = 1.0 - z;
  float atmosphereGlow = pow(rim, 3.0) * smoothstep(radius * 1.6, radius, dist);
  
  vec3 result = mix(vec3(0.0), planetBody, mask);
  result += atmosphere * atmosphereGlow * 0.25;

  return result;
}

vec3 renderPlanets(vec2 p, float sc, float t){
  vec3 planetsCol = vec3(0.0);

  // Planet 1: Muted Violet gas world (Top-Left) - moves upward on scroll
  vec2 pos1 = vec2(-0.65, 0.55 + sc * 0.35 + sin(t * 0.05) * 0.02);
  planetsCol += drawPlanet(p, pos1, 0.075, vec3(0.12, 0.08, 0.18), vec3(0.30, 0.15, 0.45), 0.8);

  // Planet 2: Small Dark Cyan world (Middle-Right) - moves downward on scroll
  vec2 pos2 = vec2(0.72, -0.25 - sc * 0.25 + cos(t * 0.04) * 0.015);
  planetsCol += drawPlanet(p, pos2, 0.045, vec3(0.05, 0.12, 0.16), vec3(0.10, 0.35, 0.45), 2.2);

  // Planet 3: Soft Copper/Amber dwarf planet (Bottom-Left) - subtle parallax
  vec2 pos3 = vec2(-0.80, -0.60 + sc * 0.18);
  planetsCol += drawPlanet(p, pos3, 0.032, vec3(0.15, 0.09, 0.06), vec3(0.35, 0.20, 0.12), 3.5);

  return planetsCol;
}

/* ── Glowing & Denser Cosmic Stars ── */
vec3 stars(vec2 uv, float t, float density){
  // Layer 1: Dense Tiny Background Stars
  vec2 gc1=floor(uv*360.);
  vec2 jc1=vec2(hash(gc1+vec2(.31,.74)),hash(gc1+vec2(.82,.15)));
  float sd1=length(fract(uv*360.)-jc1);
  float st1=step(.985,hash(gc1+vec2(.55,.22)))*pow(hash(gc1+vec2(.11,.67)),1.8)
            *(smoothstep(.40,.0,sd1)+smoothstep(.60,.0,sd1)*.7)
            *(sin(hash(gc1+.3)*6.28+t*(1.2+hash(gc1+.5)*1.5))*.35+.65);

  // Layer 2: Medium Glowing Stars
  vec2 gc2=floor(uv*620.);
  vec2 jc2=vec2(hash(gc2+vec2(.23,.61)),hash(gc2+vec2(.77,.44)));
  float sd2=length(fract(uv*620.)-jc2);
  float st2=step(.991,hash(gc2+vec2(.38,.91)))*pow(hash(gc2+vec2(.66,.28)),2.2)
            *(smoothstep(.30,.0,sd2)+smoothstep(.50,.0,sd2)*.6)
            *(sin(hash(gc2+.4)*6.28+t*(1.5+hash(gc2+.6)*2.0))*.30+.70);

  // Layer 3: Ultra-fine Stardust
  vec2 gc3=floor(uv*1100.);
  vec2 jc3=vec2(hash(gc3+vec2(.55,.18)),hash(gc3+vec2(.29,.83)));
  float sd3=length(fract(uv*1100.)-jc3);
  float st3=step(.993,hash(gc3+vec2(.72,.36)))*pow(hash(gc3+vec2(.44,.91)),2.8)
            *(smoothstep(.20,.0,sd3)+smoothstep(.40,.0,sd3)*.4)
            *(sin(hash(gc3+.7)*6.28+t*(2.0+hash(gc3+.8)*2.5))*.25+.75);

  // Layer 4: Soft Accent Stars
  vec2 gc4=floor(uv*180.);
  vec2 jc4=vec2(hash(gc4+vec2(.12,.44)),hash(gc4+vec2(.91,.33)));
  float sd4=length(fract(uv*180.)-jc4);
  float st4=step(.996,hash(gc4+vec2(.18,.77)))*pow(hash(gc4+vec2(.88,.12)),1.5)
            *(smoothstep(.15,.0,sd4)*1.5+smoothstep(.55,.0,sd4)*.3)
            *(sin(hash(gc4+.9)*6.28+t*1.1)*.20+.80);

  float vis=smoothstep(.70,.10,density);
  
  vec3 c1 = vec3(0.70, 0.82, 1.00) * st1;
  vec3 c2 = vec3(1.00, 0.90, 0.80) * st2;
  vec3 c3 = vec3(0.80, 0.90, 1.00) * st3;
  vec3 c4 = vec3(1.00, 0.95, 0.90) * st4;

  return (c1*.8 + c2*.6 + c3*.45 + c4*1.0) * vis;
}

/* ── SCENE 0: Smooth Dark Cosmic Nebula with Luminous White Core ── */
vec3 s0(vec2 uv,float t,vec2 m,float ms,float sc){
  vec2 p=uv*2.-1.; p.x*=u_res.x/u_res.y;
  vec2 mv=m*2.-1.; mv.x*=u_res.x/u_res.y;
  float md=length(p-mv);
  float mw=exp(-md*md*1.2)*(.18+ms*.32);
  
  // Slow, majestic smoke flow
  vec2 warp=vec2(fbm(p*0.75 + vec2(t*.032, t*.025) + mv*.09) - .5,
                 fbm(p*0.75 + vec2(-t*.025, t*.032) + mv*.09) - .5) * 1.6;
  warp+=normalize(p-mv+.001)*(-mw);
  
  vec2 warp2=vec2(fbm(p*1.6 + t*.045 + warp*.3) - .5,
                  fbm(p*1.6 - t*.035 - warp*.3) - .5) * 0.5;
                  
  vec2 wp=p + (warp + warp2) * .6;
  float d=length(wp);
  
  float f1=fbm(wp*1.0 + t*.035);
  float f2=fbm(wp*1.9 - t*.025 + f1*.8);
  float f3=fbm(wp*3.8 + t*.050 + f2*.5);
  
  float cloud=smoothstep(.95, .0, d*.7) * f2 * f1 * 1.25;
  float detail=smoothstep(.8, .0, d*.9) * f3 * .55;
  float combined=cloud + detail * .45;
  
  // Base cosmic colors with bright white dust highlights
  vec3 space     = vec3(0.010, 0.012, 0.022);
  vec3 darkBlue  = vec3(0.040, 0.075, 0.160);
  vec3 plum      = vec3(0.120, 0.055, 0.150);
  vec3 softCrim  = vec3(0.220, 0.080, 0.120);
  vec3 coreWhite = vec3(0.420, 0.400, 0.450);

  // Smooth gradient mapping density -> white smoke center
  vec3 nebColor = mix(darkBlue, plum, smoothstep(0.04, 0.22, combined));
  nebColor = mix(nebColor, softCrim, smoothstep(0.22, 0.45, combined + f3*.10));
  nebColor = mix(nebColor, coreWhite, smoothstep(0.45, 0.75, combined));

  float intensity = smoothstep(0.01, 0.55, combined);
  vec3 col = mix(space, nebColor, intensity);

  // Render background planets under/behind smoke highlights
  col += renderPlanets(p, sc, t);

  // Fine noise highlights for smoke texture
  col += fbm4(wp*4.0 + t*.08) * combined * 0.08 * vec3(0.9, 0.95, 1.0);

  // Subtle ambient mouse interaction
  col += vec3(0.08, 0.04, 0.12) * exp(-md*md*2.0) * (.04 + ms*.10);
  col += vec3(0.04, 0.08, 0.14) * exp(-md*md*6.0) * ms * .06;

  col += stars(uv, t, combined);

  return col;
}

/* ── SCENE 1: Contour Terrain with Subtle Cosmic Tint ── */
vec3 s1(vec2 uv,float t,vec2 m,float ms,float sc){
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

  vec3 cyanTint   = vec3(0.05, 0.12, 0.18);
  vec3 violetTint = vec3(0.14, 0.07, 0.18);
  vec3 lineColor  = mix(cyanTint, violetTint, smoothstep(-0.5, 0.5, mp.x + sin(t*.2)*.3));

  vec3 col = vec3(lum) * (vec3(0.75) + lineColor * 1.5);
  
  // Background planets in terrain scene as well
  col += renderPlanets(p, sc, t) * 0.6;
  
  col += stars(uv, t, allL);
  col += vec3(0.02, 0.01, 0.04) * exp(-md*md*2.8) * (.022 + ms*.07);
  
  return col;
}

void main(){
  vec2 uv=v_uv;
  float sc=u_scroll;
  float t=u_t;

  float prog=sc*2.0;
  float sf=clamp(prog,0.,1.);
  float sf2=clamp(prog-1.0,0.,1.);

  float zoom=1.0+sc*.35+sin(t*.28)*.04+sin(t*.17)*.025;

  vec2 pan=vec2(
    sin(t*.12)*.015,
    -sc*.12+sin(t*.09)*.010
  )+(u_mouse-.5)*.032;

  float rot=sc*.04+sin(t*.15)*.008;
  vec2 center=uv-.5;
  float cr=cos(rot),sr=sin(rot);
  center=vec2(cr*center.x-sr*center.y,sr*center.x+cr*center.y);
  vec2 tuv=center/zoom+pan+.5;

  float blend=smoothstep(.20,.80,sf);
  float dip=1.-sin(clamp(sf,0.,1.)*3.14159)*.50;

  vec3 c0=s0(tuv,t,u_mouse,u_mspeed,sc);
  vec3 c1=s1(tuv,t,u_mouse,u_mspeed,sc);
  vec3 col=mix(c0,c1,blend)*dip;

  /* Side vignette */
  vec2 vig=uv-.5;
  col*=1.-dot(vig,vig)*3.1;

  /* Ambient purple glow center */
  float radial=1.-smoothstep(.0,.85,length(vig*vec2(1.,.8)));
  col+=vec3(.010,.006,.022)*radial;

  /* Subtle noise grain */
  col+=(hash(uv+fract(t*.073))-.5)*.022;
  col=clamp(col,vec3(0.),vec3(.38));
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

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      s.rawScroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const loop = (now) => {
      if (!s.startT) s.startT = now;
      const t = (now - s.startT) * 0.001;

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
