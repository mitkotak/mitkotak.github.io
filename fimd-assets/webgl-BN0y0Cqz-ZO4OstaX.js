import{S as m,E as g,U as y,d as B,s as h,r as S,i as F,a as R,b as M}from"./fimd-Bz3YK2ya.js";const L=`
uvec2 threefry2x32(uvec2 key, uvec2 ctr) {
  uint ks0 = key.x;
  uint ks1 = key.y;
  uint ks2 = ks0 ^ ks1 ^ 0x1BD11BDAu;

  uint x0 = ctr.x + ks0;
  uint x1 = ctr.y + ks1;

  x0 += x1; x1 = (x1 << 13u) | (x1 >> 19u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 15u) | (x1 >> 17u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 26u) | (x1 >> 6u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 6u) | (x1 >> 26u); x1 ^= x0;
  x0 += ks1;
  x1 += ks2 + 1u;

  x0 += x1; x1 = (x1 << 17u) | (x1 >> 15u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 29u) | (x1 >> 3u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 16u) | (x1 >> 16u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 24u) | (x1 >> 8u); x1 ^= x0;
  x0 += ks2;
  x1 += ks0 + 2u;

  x0 += x1; x1 = (x1 << 13u) | (x1 >> 19u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 15u) | (x1 >> 17u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 26u) | (x1 >> 6u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 6u) | (x1 >> 26u); x1 ^= x0;
  x0 += ks0;
  x1 += ks1 + 3u;

  x0 += x1; x1 = (x1 << 17u) | (x1 >> 15u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 29u) | (x1 >> 3u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 16u) | (x1 >> 16u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 24u) | (x1 >> 8u); x1 ^= x0;
  x0 += ks1;
  x1 += ks2 + 4u;

  x0 += x1; x1 = (x1 << 13u) | (x1 >> 19u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 15u) | (x1 >> 17u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 26u) | (x1 >> 6u); x1 ^= x0;
  x0 += x1; x1 = (x1 << 6u) | (x1 >> 26u); x1 ^= x0;
  x0 += ks2;
  x1 += ks0 + 5u;

  return uvec2(x0, x1);
}`,D=`
const float _erf_p = 0.3275911;
const float _erf_a1 = 0.254829592;
const float _erf_a2 = -0.284496736;
const float _erf_a3 = 1.421413741;
const float _erf_a4 = -1.453152027;
const float _erf_a5 = 1.061405429;
float erf(float x) {
  float t = 1.0 / (1.0 + _erf_p * abs(x));
  float P_t = (((((_erf_a5 * t) + _erf_a4) * t + _erf_a3) * t + _erf_a2) * t + _erf_a1) * t;
  return sign(x) * (1.0 - P_t * exp(-x * x));
}
float erfc(float x) {
  float t = 1.0 / (1.0 + _erf_p * abs(x));
  float P_t = (((((_erf_a5 * t) + _erf_a4) * t + _erf_a3) * t + _erf_a2) * t + _erf_a1) * t;
  float E = P_t * exp(-x * x);
  return x >= 0.0 ? E : 2.0 - E;
}`;var k=class{type="webgl";maxArgs=8;gl;#t;#e;#r;#o;constructor(t){this.gl=t,this.#t=t.createFramebuffer(),this.#e=new Map,this.#r=new Map,this.#o=1}malloc(t,o){const i=this.gl,e=Math.ceil(t/4)||1,{width:r,height:d}=I(Math.ceil(e/4)||1),f=i.createTexture();if(!f)throw new Error("Failed to create texture");i.bindTexture(i.TEXTURE_2D,f),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);const u=r*d*4;let c=null;o&&(c=new Float32Array(u),new Uint8Array(c.buffer).set(o)),i.texImage2D(i.TEXTURE_2D,0,i.RGBA32F,r,d,0,i.RGBA,i.FLOAT,c),i.bindTexture(i.TEXTURE_2D,null);const l=this.#o++;return this.#e.set(l,{ref:1,size:t,texture:f,width:r,height:d}),l}incRef(t){const o=this.#e.get(t);if(!o)throw new m(t);o.ref++}decRef(t){const o=this.#e.get(t);if(!o)throw new m(t);o.ref--,o.ref===0&&(this.gl.deleteTexture(o.texture),this.#e.delete(t))}async read(t,o,i){const e=this.#e.get(t);if(!e)throw new m(t);const r=this.gl;o===void 0&&(o=0),i===void 0&&(i=e.size-o),r.bindFramebuffer(r.FRAMEBUFFER,this.#t),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e.texture,0);const d=e.width*e.height*4*4,f=new Float32Array(d/4),u=r.createBuffer();if(!u)throw new Error("Failed to create PBO");r.bindBuffer(r.PIXEL_PACK_BUFFER,u),r.bufferData(r.PIXEL_PACK_BUFFER,d,r.STREAM_READ),r.readPixels(0,0,e.width,e.height,r.RGBA,r.FLOAT,0);const c=r.getError();if(c!==r.NO_ERROR)throw r.deleteBuffer(u),new Error(`WebGL error after readPixels: ${c}`);const l=r.fenceSync(r.SYNC_GPU_COMMANDS_COMPLETE,0);if(!l)throw new Error("Failed to create sync object");r.flush(),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),r.bindFramebuffer(r.FRAMEBUFFER,null),await new Promise((s,a)=>{const x=()=>{const $=r.clientWaitSync(l,0,0);if($===r.TIMEOUT_EXPIRED){setTimeout(x,5);return}if($===r.WAIT_FAILED){r.deleteSync(l),r.deleteBuffer(u),a(new Error("clientWaitSync failed"));return}s()};x()}),r.deleteSync(l),r.bindBuffer(r.PIXEL_PACK_BUFFER,u),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,f),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),r.deleteBuffer(u);const n=new Uint8Array(f.buffer);return new Uint8Array(n.slice(o,o+i))}readSync(t,o,i){const e=this.#e.get(t);if(!e)throw new m(t);const r=this.gl;o===void 0&&(o=0),i===void 0&&(i=e.size-o),r.bindFramebuffer(r.FRAMEBUFFER,this.#t),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e.texture,0);const d=e.width*e.height*4,f=new Float32Array(d);r.readPixels(0,0,e.width,e.height,r.RGBA,r.FLOAT,f),r.bindFramebuffer(r.FRAMEBUFFER,null);const u=new Uint8Array(f.buffer);return new Uint8Array(u.slice(o,o+i))}async prepareKernel(t){return this.prepareKernelSync(t)}prepareKernelSync(t){const o=P(t),i=this.#r.get(o.code);if(i)return new g(t,i);const e=v(this.gl,o);return this.#r.set(o.code,e),new g(t,e)}prepareRoutine(t){throw new y(t.name,"webgl")}prepareRoutineSync(t){throw new y(t.name,"webgl")}dispatch(t,o,i){const e=this.gl;if(e.isContextLost())throw new Error("WebGL context lost - cannot dispatch");const{program:r,inputLocations:d}=t.data;if(o.length!==t.data.numInputs)throw new Error(`Expected ${t.data.numInputs} inputs, got ${o.length}`);if(i.length!==1)throw new Error(`Expected 1 output, got ${i.length}`);const f=this.#e.get(i[0]);if(!f)throw new m(i[0]);e.bindFramebuffer(e.FRAMEBUFFER,this.#t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,f.texture,0);const u=e.checkFramebufferStatus(e.FRAMEBUFFER);if(u!==e.FRAMEBUFFER_COMPLETE)throw new Error(`Framebuffer incomplete: ${u}`);e.viewport(0,0,f.width,f.height),e.useProgram(r);for(let l=0;l<o.length;l++){const n=this.#e.get(o[l]);if(!n)throw new m(o[l]);e.activeTexture(e.TEXTURE0+l),e.bindTexture(e.TEXTURE_2D,n.texture),d[l]!==null&&e.uniform1i(d[l],l)}e.drawArrays(e.TRIANGLES,0,3);const c=e.getError();if(c!==e.NO_ERROR){let l;throw c===e.INVALID_ENUM?l="INVALID_ENUM":c===e.INVALID_VALUE?l="INVALID_VALUE":c===e.INVALID_OPERATION?l="INVALID_OPERATION":c===e.INVALID_FRAMEBUFFER_OPERATION?l="INVALID_FRAMEBUFFER_OPERATION":c===e.OUT_OF_MEMORY?l="OUT_OF_MEMORY":c===e.CONTEXT_LOST_WEBGL?l="CONTEXT_LOST_WEBGL":l=`UNKNOWN(${c})`,new Error(`WebGL error after drawArrays: ${l}`)}e.bindFramebuffer(e.FRAMEBUFFER,null),e.useProgram(null)}};function P(t){const o=B(t),{nargs:i,reduction:e}=t,r=t.dtype,d=I(Math.ceil(t.size/4)||1),f=Array(i).fill("float32"),u={erf:!1,threefry:!1},c=E=>{E.op==="GlobalIndex"?f[E.arg[0]]=E.dtype:E.op==="Erf"||E.op==="Erfc"?u.erf=!0:E.op==="Threefry2x32"&&(u.threefry=!0)};o.exp.fold(c),o.epilogue?.fold(c);const l=[];let n="";const s=Symbol("pushIndent"),a=Symbol("popIndent"),x=(...E)=>{for(const T of E)T===s?n+="  ":T===a?n=n.slice(0,-2):l.push(T&&n+T)};x("#version 300 es","precision highp float;","precision highp int;","");const $=Array.from({length:i},(E,T)=>`in${T}`),p=w(r);for(let E=0;E<i;E++)x(`uniform highp sampler2D ${$[E]};`);x("out vec4 out0;");const _=new Set;for(const E of f)_.add(E);for(const E of _)x(C(E));if(u.erf&&x(D),u.threefry&&x(L),x(`${p} compute(int gidx) {`,s,`${p} result = ${b(r,0)};`,`if (gidx < ${t.size}) {`,s),!e)x(`result = ${h(A(o.exp,$,f))};`);else{x(`${w(e.dtype)} acc = ${b(e.dtype,e.identity)};`,`for (int ridx = 0; ridx < ${o.size.reduce}; ridx++) {`,s);const E=A(o.exp,$,f);if(e.op==="Add")x(`acc += ${h(E)};`);else if(e.op==="Mul")x(`acc *= ${h(E)};`);else if(e.op==="Min")e.dtype!=="bool"?x(`acc = min(acc, ${h(E)});`):x(`acc = acc && ${E};`);else if(e.op==="Max")e.dtype!=="bool"?x(`acc = max(acc, ${h(E)});`):x(`acc = acc || ${E};`);else throw new Error(`Unsupported reduction op: ${e.op}`);x(a,"}"),x(`result = ${A(o.epilogue,$,f)};`)}return x(a,"}","return result;",a,`}
`),x("void main() {",s,"ivec2 fragCoord = ivec2(gl_FragCoord.xy);",`int texelIdx = fragCoord.y * ${d.width} + fragCoord.x;`,`${p} result0 = compute(texelIdx * 4);`,`${p} result1 = compute(texelIdx * 4 + 1);`,`${p} result2 = compute(texelIdx * 4 + 2);`,`${p} result3 = compute(texelIdx * 4 + 3);`,`out0 = vec4(${S(4).map(E=>X(r,`result${E}`)).join(", ")});`),x(a,"}"),{code:l.join(`
`),numInputs:i,outputSize:[d.width,d.height],outputDtype:r}}function U(t,o,i){const e=t.createShader(o);if(t.shaderSource(e,i),t.compileShader(e),!t.getShaderParameter(e,t.COMPILE_STATUS))throw new Error(t.getShaderInfoLog(e)??"Unknown shader compile error");return e}function O(t,o,i){const e=t.createProgram();if(t.attachShader(e,U(t,t.VERTEX_SHADER,o)),t.attachShader(e,U(t,t.FRAGMENT_SHADER,i)),t.linkProgram(e),!t.getProgramParameter(e,t.LINK_STATUS))throw new Error(t.getProgramInfoLog(e)??"Unknown program link error");return e}const N=`#version 300 es
precision highp float;
const vec2 pos[3] = vec2[](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main() { gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0); }
`;function v(t,o){const i=O(t,N,o.code),e=[];for(let r=0;r<o.numInputs;r++)e.push(t.getUniformLocation(i,`in${r}`));return{...o,program:i,inputLocations:e}}function I(t){let i=Math.min(Math.ceil(Math.sqrt(t)),16384);i=Math.min(1<<Math.ceil(Math.log2(i)),16384);const e=Math.min(Math.ceil(t/i),16384);return{width:i,height:e}}function w(t){switch(t){case"float32":return"float";case"int32":return"int";case"uint32":return"uint";case"bool":return"bool";default:throw new Error(`Unsupported dtype for WebGL: ${t}`)}}function C(t){const o=`load_${t}`,i=w(t);let e;if(F(t))e="val";else if(t==="int32")e="floatBitsToInt(val)";else if(t==="uint32")e="floatBitsToUint(val)";else if(t==="bool")e="floatBitsToInt(val) != 0";else throw new Error(`Unsupported dtype for WebGL fetch: ${t}`);return`
${i} ${o}(highp sampler2D tex, int idx) {
  ivec2 texSize = textureSize(tex, 0);
  int texel = idx / 4;
  int component = idx - texel * 4;
  ivec2 coord = ivec2(texel % texSize.x, texel / texSize.x);
  vec4 texVal = texelFetch(tex, coord, 0);
  float val;
  if (component == 0) val = texVal.x;
  else if (component == 1) val = texVal.y;
  else if (component == 2) val = texVal.z;
  else val = texVal.w;
  return ${e};
}
`}function X(t,o){switch(t){case"float32":return o;case"int32":return`intBitsToFloat(${o})`;case"uint32":return`uintBitsToFloat(${o})`;case"bool":return`intBitsToFloat(${o} ? 1 : 0)`;default:throw new Error(`Unsupported dtype for WebGL output: ${t}`)}}function b(t,o){switch(t){case"bool":return o?"true":"false";case"int32":return o.toString();case"uint32":return o.toString()+"u";case"float32":return Number.isNaN(o)?"uintBitsToFloat(0x7fc00000u)":Number.isFinite(o)?"float("+o.toString()+")":o>0?"uintBitsToFloat(0x7f800000u)":"uintBitsToFloat(0xff800000u)";default:throw new Error(`Unsupported dtype for WebGL constant: ${t}`)}}function A(t,o,i){const e=new Map,r=d=>{if(e.has(d))return e.get(d);const{op:f,src:u,dtype:c,arg:l}=d;let n="";if(R.Binary.has(f)){const s=r(u[0]),a=r(u[1]);if(f==="Add")c==="bool"?n=`(${s} || ${a})`:n=`(${s} + ${a})`;else if(f==="Sub")n=`(${s} - ${a})`;else if(f==="Mul")c==="bool"?n=`(${s} && ${a})`:n=`(${s} * ${a})`;else if(f==="Idiv")F(c)?n=`trunc(${s} / ${a})`:n=`(${s} / ${a})`;else if(f==="Mod")F(c)?n=`(${s} - ${a} * trunc(${s} / ${a}))`:n=`(${s} % ${a})`;else if(f==="Min")c==="bool"?n=`(${s} && ${a})`:n=`min(${s}, ${a})`;else if(f==="Max")c==="bool"?n=`(${s} || ${a})`:n=`max(${s}, ${a})`;else if(f==="BitCombine"){let x=l==="and"?"&":l==="or"?"|":"^";c==="bool"&&(x=x+x),n=`(${s} ${x} ${a})`}else f==="BitShift"&&(l==="shl"?n=`(${s} << ${a})`:n=`(${s} >> ${a})`)}else if(R.Compare.has(f)){const s=r(u[0]),a=r(u[1]);f==="Cmplt"?n=`(${s} < ${a})`:f==="Cmpne"&&(F(u[0].dtype)?n=`(${s} != ${a} || isnan(${s}) || isnan(${a}))`:n=`(${s} != ${a})`)}else if(R.Unary.has(f)){const s=r(u[0]);if(f==="Sin")n=`sin(${h(s)})`;else if(f==="Cos")n=`cos(${h(s)})`;else if(f==="Asin")n=`asin(${h(s)})`;else if(f==="Atan")n=`atan(${h(s)})`;else if(f==="Exp")n=`exp(${h(s)})`;else if(f==="Log")n=`log(${h(s)})`;else if(f==="Erf")n=`erf(${h(s)})`;else if(f==="Erfc")n=`erfc(${h(s)})`;else if(f==="Sqrt")n=`sqrt(${h(s)})`;else if(f==="Floor")n=`floor(${h(s)})`;else if(f==="Ceil")n=`ceil(${h(s)})`;else if(f==="Reciprocal")n=`(1.0 / ${s})`;else if(f==="Cast")n=`${w(c)}(${h(s)})`;else if(f==="Bitcast"){const a=u[0].dtype;c===a?n=s:c==="float32"?a==="int32"?n=`intBitsToFloat(${h(s)})`:a==="uint32"&&(n=`uintBitsToFloat(${h(s)})`):c==="int32"?a==="float32"?n=`floatBitsToInt(${h(s)})`:a==="uint32"&&(n=`int(${h(s)})`):c==="uint32"&&(a==="float32"?n=`floatBitsToUint(${h(s)})`:a==="int32"&&(n=`uint(${h(s)})`))}}else if(f==="Threefry2x32"){const[s,a,x,$]=u.map(E=>h(r(E))),p=l,_=`threefry2x32(uvec2(${s}, ${a}), uvec2(${x}, ${$}))`;p==="xor"?n=`(${_}.x ^ ${_}.y)`:p===0?n=`${_}.x`:p===1&&(n=`${_}.y`)}else if(f==="Where"){const[s,a,x]=u.map(r);n=`(${s} ? ${a} : ${x})`}else if(f==="Const")n=b(c,l);else if(f==="Special")n=l[0];else if(f==="Variable")n=l;else if(f==="GlobalIndex"){const s=l[0],a=r(u[0]);n=`load_${i[s]}(${o[s]}, ${h(a)})`}if(!n)throw new M(f,c,"webgl",l);return e.set(d,n),n};return r(t)}export{k as WebGLBackend};
