import{S as L,F as ee,E as G,r as te,t as re,f as C,s as h,A as U,U as ie,p as q,m as se,a as O,i as R,b as W,c as ae,e as oe}from"./fimd-_XJxjlWt.js";const ne=`
fn threefry2x32(key: vec2<u32>, ctr: vec2<u32>) -> vec2<u32> {
  let ks0: u32 = key.x;
  let ks1: u32 = key.y;
  let ks2: u32 = ks0 ^ ks1 ^ 0x1BD11BDAu;

  var x0: u32 = ctr.x + ks0;
  var x1: u32 = ctr.y + ks1;

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

  return vec2<u32>(x0, x1);
}`,ue=`
const _erf_p: f32 = 0.3275911;
const _erf_a1: f32 = 0.254829592;
const _erf_a2: f32 = -0.284496736;
const _erf_a3: f32 = 1.421413741;
const _erf_a4: f32 = -1.453152027;
const _erf_a5: f32 = 1.061405429;
fn erf(x: f32) -> f32 {
  let t = 1.0 / (1.0 + _erf_p * abs(x));
  let P_t = fma(fma(fma(fma(_erf_a5, t, _erf_a4), t, _erf_a3), t, _erf_a2), t, _erf_a1) * t;
  return sign(x) * (1.0 - P_t * exp(-x * x));
}
fn erfc(x: f32) -> f32 {
  let t = 1.0 / (1.0 + _erf_p * abs(x));
  let P_t = fma(fma(fma(fma(_erf_a5, t, _erf_a4), t, _erf_a3), t, _erf_a2), t, _erf_a1) * t;
  let E = P_t * exp(-x * x);
  return select(2.0 - E, E, x >= 0.0);
}`,z=String.raw`
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn inf() -> f32 { let bits = 0x7f800000u; return bitcast<f32>(bits); }
`.trim();var V=class{pushIndent=Symbol("pushIndent");popIndent=Symbol("popIndent");lines=[];#e="";emit(...t){for(const e of t)e===this.pushIndent?this.#e+="  ":e===this.popIndent?this.#e=this.#e.slice(0,-2):this.lines.push(e?this.#e+e:"")}emitPreamble(t,e){let s=!1,i=new Map;for(const o of e)o!=null&&(s||=o.some(r=>r.dtype==="float16"),i=se(i,o.distinctOps()));if(s){if(!t.features.has("shader-f16"))throw new Error("WebGPU device does not support shader-f16 feature");this.emit("enable f16;")}this.emit(z),i.has("Threefry2x32")&&this.emit(ne),(i.has("Erf")||i.has("Erfc"))&&this.emit(ue),this.emit("")}emitPhonyAssignments(t){t.length>0&&this.emit(t.map(e=>`_ = &${e};`).join(" "))}toString(){return this.lines.join(`
`)}};function w(t,e=!1){switch(t){case"bool":return e?"i32":"bool";case"int32":return"i32";case"uint32":return"u32";case"float32":return"f32";case"float16":return"f16";default:throw new Error(`Unsupported dtype for WebGPU: ${t}`)}}function K(t){switch(t){case"bool":return"1";case"int32":return"2147483647";case"uint32":return"4294967295u";case"float32":return"inf()";case"float16":return"f16(inf())";default:throw new Error(`Unsupported dtype for WebGPU: ${t}`)}}function Q(t,e){if(t==="bool")return e?"true":"false";if(t==="int32")return e.toString();if(t==="uint32")return e.toString()+"u";if(t==="float32")return Number.isNaN(e)?"nan()":Number.isFinite(e)?"f32("+e.toString()+")":e>0?"inf()":"-inf()";if(t==="float16")return Number.isNaN(e)?"f16(nan())":Number.isFinite(e)?"f16("+e.toString()+")":e>0?"f16(inf())":"f16(-inf())";throw new Error(`Unsupported const dtype: ${t}`)}function le(t,e,s,i){if(t==="Add")return`(${s} + ${i})`;if(t==="Mul")return`(${s} * ${i})`;if(t==="Min")return e==="bool"?`(${s} && ${i})`:`min(${s}, ${i})`;if(t==="Max")return e==="bool"?`(${s} || ${i})`:`max(${s}, ${i})`;throw new Error(`Unsupported reduction op: ${t}`)}var Z=class{wb;args;#e=0;#r=new Map;#i=new Set;#s=new Map;constructor(t,e){this.wb=t,this.args=e}#t(){return`alu${this.#e++}`}#a(t){return t.match(/^alu[0-9]+$/)}countReferences(t){if(this.#r.set(t,(this.#r.get(t)??0)+1),!this.#i.has(t)){this.#i.add(t);for(const e of t.src)this.countReferences(e)}}reset(){this.#r.clear(),this.#i.clear(),this.#s.clear()}run(t){if(this.#s.has(t))return this.#s.get(t);const{op:e,src:s,dtype:i,arg:o}=t;let r="";if(O.Binary.has(e)||O.Compare.has(e)){const a=this.run(s[0]),n=this.run(s[1]);if(e==="Add")i==="bool"?r=`(${a} || ${n})`:r=`(${a} + ${n})`;else if(e==="Sub")r=`(${a} - ${n})`;else if(e==="Mul")i==="bool"?r=`(${a} && ${n})`:r=`(${a} * ${n})`;else if(e==="Idiv")r=R(i)?`trunc(${a} / ${n})`:`(${a} / ${n})`;else if(e==="Mod")r=`(${a} % ${n})`;else if(e==="Min")i==="bool"?r=`(${a} && ${n})`:r=`min(${h(a)}, ${h(n)})`;else if(e==="Max")i==="bool"?r=`(${a} || ${n})`:r=`max(${h(a)}, ${h(n)})`;else if(e==="BitCombine")o==="and"?r=`(${a} & ${n})`:o==="or"?r=`(${a} | ${n})`:r=i==="bool"?`(${a} != ${n})`:`(${a} ^ ${n})`;else if(e==="BitShift")o==="shl"?r=`(${a} << ${n})`:r=`(${a} >> ${n})`;else if(e==="Cmplt")r=`(${a} < ${n})`;else if(e==="Cmpne")if(R(s[0].dtype)){const p=this.#a(a)?a:this.#t();p!==a&&this.wb.emit(`let ${p} = ${a};`),r=`(${p} != ${n} || min(${p}, ${w(s[0].dtype)}(inf())) != ${p})`}else r=`(${a} != ${n})`}else if(O.Unary.has(e))if(e==="Reciprocal"&&s[0].op==="Sqrt")r=`inverseSqrt(${this.run(s[0].src[0])})`;else{const a=this.run(s[0]);if(e==="Sin")r=`sin(${h(a)})`;else if(e==="Cos")r=`cos(${h(a)})`;else if(e==="Asin")r=`asin(${h(a)})`;else if(e==="Atan")r=`atan(${h(a)})`;else if(e==="Exp")r=`exp(${h(a)})`;else if(e==="Log")r=`log(${h(a)})`;else if(e==="Erf"||e==="Erfc"){const n=e==="Erf"?"erf":"erfc";i!=="float32"?r=`${w(i)}(${n}(f32(${h(a)})))`:r=`${n}(${h(a)})`}else if(e==="Sqrt")r=`sqrt(${h(a)})`;else if(e==="Reciprocal")r=`(1.0 / ${a})`;else if(e==="Floor")r=`floor(${h(a)})`;else if(e==="Ceil")r=`ceil(${h(a)})`;else if(e==="Cast"){const n=w(s[0].dtype),p=w(i);if(R(s[0].dtype)&&!(R(i)||i==="bool")){const c=K(i),g=this.#a(a)?a:this.#t();g!==a&&this.wb.emit(`let ${g}: ${n} = ${h(a)};`),r=`select(${p}(${g}), ${c}, ${g} >= ${n}(${c}))`}else r=`${p}(${h(a)})`}else e==="Bitcast"&&(r=`bitcast<${w(i)}>(${h(a)})`)}else if(e==="Where")r=`select(${h(this.run(s[2]))}, ${h(this.run(s[1]))}, ${h(this.run(s[0]))})`;else if(e==="Threefry2x32"){const a=this.#t(),[n,p,c,g]=s.map(v=>h(this.run(v)));if(this.wb.emit(`let ${a} = threefry2x32(vec2(${n}, ${p}), vec2(${c}, ${g}));`),o==="xor")r=`(${a}.x ^ ${a}.y)`;else if(o===0)r=`${a}.x`;else if(o===1)r=`${a}.y`;else throw new W(e,i,"webgpu",o)}else{if(e==="Const")return Q(i,o);if(e==="Special")return o[0];if(e==="Variable")return o;e==="GlobalIndex"&&(r=`${this.args[o[0]]}[${h(this.run(s[0]))}]`,i==="bool"&&(r=`(${r} != 0)`))}if(!r)throw new W(e,i,"webgpu",o);const u=w(i);if((this.#r.get(t)??0)>1){const a=this.#t();return this.#s.set(t,a),this.wb.emit(`let ${a}: ${u} = ${h(r)};`),a}else return this.#s.set(t,r),r}};const M=16384;function E(t){let e=t,s=1;return t>65535&&(e=M,s=Math.ceil(t/M)),[e,s]}function ce(t){return t==="float16"?"float32":t==="bool"?"int32":t}function fe({name:t,dtype:e,uniformDtype:s}){const i=U.variable(s,`uniforms.${t}`);return e==="float16"?U.cast("float16",i):e==="bool"?U.cmpne(i,U.i32(0)):i}function pe(t,e,s,i){switch(s){case"float32":t.setFloat32(e,i,!0);break;case"int32":t.setInt32(e,i,!0);break;case"uint32":t.setUint32(e,i,!0);break;default:throw new Error(`Unsupported dtype for constant uniform: ${s}`)}}function de(t){const e=[];return[t.rewrite(s=>{if(s.op!=="Const"||s.arg===0)return;const i={name:`c${e.length}`,dtype:s.dtype,uniformDtype:ce(s.dtype),value:s.arg};return e.push(i),fe(i)}),e]}function ge(t){const e=new Uint8Array(t.length*4),s=new DataView(e.buffer);return t.forEach((i,o)=>pe(s,o*4,i.uniformDtype,i.value)),e}function me(t,e){if(e.nargs!==0||e.reduction)return null;let s=e.exp.substitute({gidx:U.special("int32","gidx",e.size)}).simplify(),i=[];[s,i]=de(s);const o=new V;o.emitPreamble(t,[s]),i.length>0&&o.emit("struct Uniforms {",o.pushIndent,...i.map(g=>`${g.name}: ${w(g.uniformDtype)},`),o.popIndent,`}
`);const r=w(e.dtype,!0);o.emit(`@group(0) @binding(0) var<storage, read_write> result : array<${r}>;`),i.length>0&&o.emit("@group(1) @binding(0) var<uniform> uniforms: Uniforms;");const u=C(e.size,256),[a,n]=E(Math.ceil(e.size/u));if(o.emit("",`@compute @workgroup_size(${u})`,"fn main(@builtin(global_invocation_id) id : vec3<u32>) {",o.pushIndent),n===1)o.emit(`if (id.x >= ${e.size}) { return; }`,"let gidx: i32 = i32(id.x);");else{const g=a*u;o.emit(`if (${g} * id.y + id.x >= ${e.size}) { return; }`,`let gidx: i32 = i32(${g} * id.y + id.x);`)}const p=new Z(o,[]);p.countReferences(s);let c=h(p.run(s));return r!==w(s.dtype)&&(c=`${r}(${c})`),o.emit(`result[gidx] = ${c};`,o.popIndent,"}"),{code:o.toString(),numInputs:0,numOutputs:1,hasUniform:i.length>0,passes:[{grid:[a,n],uniform:i.length>0?ge(i):void 0}]}}var xe=class k{device;static alphaModes=["opaque","premultiplied"];static width=256;static height=256;initialized=!1;deviceStorage;deviceContexts;hostStorage;hostContext;constructor(e){this.device=e}#e(){if(typeof OffscreenCanvas>"u")throw new Error("OffscreenCanvas is not available in this environment, so you cannot read data from WebGPU synchronously. Consider using the async API.");const e=()=>new OffscreenCanvas(k.width,k.height);this.deviceStorage=k.alphaModes.map(e),this.deviceContexts=this.deviceStorage.map((s,i)=>{const o=s.getContext("webgpu");return o.configure({device:this.device,format:"bgra8unorm",usage:GPUTextureUsage.COPY_DST,alphaMode:k.alphaModes[i]}),o}),this.hostStorage=e(),this.hostContext=this.hostStorage.getContext("2d",{willReadFrequently:!0}),this.initialized=!0}read(e,s,i){this.initialized||this.#e();const o=this.deviceStorage,r=this.deviceContexts,u=this.hostContext,a=Math.ceil(i/4),n=k.width*4,p=new ArrayBuffer(a*4);for(let c=0;c<r.length;c++){const g=r[c].getCurrentTexture(),v=(m,b,A)=>{const I=this.device.createCommandEncoder();I.copyBufferToTexture({buffer:e,bytesPerRow:n,offset:A+s},{texture:g},{width:m,height:b,depthOrArrayLayers:1});const B=I.finish();this.device.queue.submit([B]),u.clearRect(0,0,m,b),u.drawImage(o[c],0,0);const P=u.getImageData(0,0,m,b).data,j=new Uint8ClampedArray(p,A,4*m*b),l=k.alphaModes[c];for(let d=0;d<j.length;d+=4)l==="premultiplied"?j[d+3]=P[d+3]:(j[d]=P[d+2],j[d+1]=P[d+1],j[d+2]=P[d])},y=k.width*k.height,_=Math.floor(a/y);let $=a%y;const x=Math.floor($/k.width);$=$%k.width;let f=0;for(let m=0;m<_;m++)v(k.width,k.height,f),f+=y*4;x>0&&(v(k.width,x,f),f+=x*k.width*4),$>0&&v($,1,f)}return new Uint8Array(p,0,i)}};function he(t){const e=new Uint32Array(3);return e[0]=t.kind==="sort"?0:1,e[1]=t.mergeStep??0,e[2]=t.mergeStage??0,new Uint8Array(e.buffer)}function J(t,e,s,i,o){const r=w(e,!0),u=1<<Math.ceil(Math.log2(s||1)),a=Math.ceil(u/2),n=C(a,t.limits.maxComputeWorkgroupSizeX),p=a/n,c=Math.log2(u),g=Math.min(c,Math.log2(n*2)),v=e==="float16",y=R(e)?`${r}(nan())`:K(e),_=`
${v?"enable f16;":""}
${z}

struct Uniforms {
  kind: u32, // 0 = sort, 1 = merge
  merge_step: u32, // half_block = 2^step
  merge_stage: u32, // only used for merge
}

@group(0) @binding(0) var<storage, read> input: array<${r}>;
@group(0) @binding(1) var<storage, read_write> output: array<${r}>;
${o?"@group(0) @binding(2) var<storage, read_write> output_idx: array<i32>;":""}

@group(1) @binding(0) var<uniform> uniforms: Uniforms;

var<workgroup> shared_vals: array<${r}, ${n*2}>;
${o?`var<workgroup> shared_idx: array<i32, ${n*2}>;`:""}

fn compare(a: ${r}, b: ${r}) -> bool {
${R(e)?`
  let min_value = min(a, b);
  return a == min_value && b != min_value;`:"  return a < b;"}
}

fn compare_and_swap(i: u32, j: u32) {
  let val_i = shared_vals[i];
  let val_j = shared_vals[j];
${o?`
  if (
    compare(val_j, val_i) ||
    (!compare(val_i, val_j) && shared_idx[j] < shared_idx[i])
  ) {
    shared_vals[i] = val_j;
    shared_vals[j] = val_i;
    let tmp_idx = shared_idx[i];
    shared_idx[i] = shared_idx[j];
    shared_idx[j] = tmp_idx;
  }`:`
  if (compare(val_j, val_i)) {
    shared_vals[i] = val_j;
    shared_vals[j] = val_i;
  }`}
}

@compute @workgroup_size(${n})
fn main(
  @builtin(workgroup_id) wg_id: vec3<u32>,
  @builtin(local_invocation_id) local_id: vec3<u32>,
) {
  let blockid = wg_id.x + wg_id.y * ${M}u;
  let batch = blockid / ${p}u;
  let wg_in_batch = blockid % ${p}u;

  let tid = local_id.x;
  let base = batch * ${s}u;

  if (uniforms.kind == 0u || (uniforms.kind == 1u && uniforms.merge_step == ${g-1}u)) {
    let wg_base = wg_in_batch * ${n*2}u;

    // Load data into shared memory (2 elements per thread)
    let idx0 = tid * 2u;
    let idx1 = tid * 2u + 1u;
    // Load from input for initial 'sort' pass, then from output (read-write) for 'merge' passes.
    if (uniforms.kind == 0u) {
      shared_vals[idx0] = select(${y}, input[base + wg_base + idx0], wg_base + idx0 < ${s}u);
      shared_vals[idx1] = select(${y}, input[base + wg_base + idx1], wg_base + idx1 < ${s}u);
${o?`
      shared_idx[idx0] = i32(wg_base + idx0);
      shared_idx[idx1] = i32(wg_base + idx1);`:""}
    } else {
      shared_vals[idx0] = select(${y}, output[base + wg_base + idx0], wg_base + idx0 < ${s}u);
      shared_vals[idx1] = select(${y}, output[base + wg_base + idx1], wg_base + idx1 < ${s}u);
${o?`
      shared_idx[idx0] = select(${s}, output_idx[base + wg_base + idx0], wg_base + idx0 < ${s}u);
      shared_idx[idx1] = select(${s}, output_idx[base + wg_base + idx1], wg_base + idx1 < ${s}u);`:""}
    }
    workgroupBarrier();

    let initial_stage = select(0u, ${g-1}u, uniforms.kind != 0u);
    for (var stage = initial_stage; stage < ${g}u; stage++) {
      for (var step1 = stage + 1u; step1 > 0u; step1--) {
        let step = step1 - 1u;
        let half_block = 1u << step;
        let is_first_step = uniforms.kind == 0u && step == stage;

        let block_offset = (tid / half_block) * half_block;
        let local_offset = tid % half_block;
        let i = block_offset * 2u + local_offset;
        let j = select(i + half_block, i ^ (half_block * 2u - 1u), is_first_step);
        compare_and_swap(i, j);

        workgroupBarrier();
      }
    }

    if (wg_base + idx0 < ${s}u) {
      output[base + wg_base + idx0] = shared_vals[idx0];
      ${o?"output_idx[base + wg_base + idx0] = shared_idx[idx0];":""}
    }
    if (wg_base + idx1 < ${s}u) {
      output[base + wg_base + idx1] = shared_vals[idx1];
      ${o?"output_idx[base + wg_base + idx1] = shared_idx[idx1];":""}
    }
  } else {
    // Execute single merge pass for a step >= numLocalStages.
    let half_block = 1u << uniforms.merge_step;  // half_block >= workgroupSize * 2
    let thread_in_batch = wg_in_batch * ${n} + tid;
    let is_first_step = uniforms.merge_step == uniforms.merge_stage;

    let block_offset = (thread_in_batch / half_block) * half_block;
    let local_offset = thread_in_batch % half_block;
    let i = block_offset * 2u + local_offset;
    let j = select(i + half_block, i ^ (half_block * 2u - 1u), is_first_step);

    // Global version of compare_and_swap()
    if (j < ${s}u) {
      let val_i = output[base + i];
      let val_j = output[base + j];
${o?`
      let idx_i = output_idx[base + i];
      let idx_j = output_idx[base + j];
      if (compare(val_j, val_i) || (!compare(val_i, val_j) && idx_j < idx_i)) {
        output[base + i] = val_j;
        output[base + j] = val_i;
        output_idx[base + i] = idx_j;
        output_idx[base + j] = idx_i;`:`
      if (compare(val_j, val_i)) {
        output[base + i] = val_j;
        output[base + j] = val_i;`}
      }
    }
  }
}
`.trim(),$=E(i*p),x=[{kind:"sort"}];for(let f=g;f<c;f++)for(let m=f;m>=g-1;m--)x.push({kind:"merge",mergeStep:m,mergeStage:f});return[{code:_,numInputs:1,numOutputs:o?2:1,hasUniform:!0,passes:x.map(f=>({grid:$,uniform:he(f)}))}]}function _e(t,e){const s=e.inputDtypes[0],i=e.inputShapes[0],o=i[i.length-1];return J(t,s,o,q(i.slice(0,-1)),!1)}function $e(t,e){const s=e.inputDtypes[0],i=e.inputShapes[0],o=i[i.length-1];return J(t,s,o,q(i.slice(0,-1)),!0)}function be(t,e,s){const i=e.inputDtypes[0],o=e.inputShapes[0],r=e.inputShapes[1],u=o[o.length-1],a=r[r.length-2],n=q(o.slice(0,-2)),p=i==="float16",c=w(i,!0),g=C(u,t.limits.maxComputeWorkgroupSizeX);return[{code:`
${p?"enable f16;":""}
${z}

@group(0) @binding(0) var<storage, read> a: array<${c}>;
@group(0) @binding(1) var<storage, read> b: array<${c}>;
@group(0) @binding(2) var<storage, read_write> x: array<${c}>;

// Shared memory for the current pivot value x[j]
var<workgroup> x_j: ${c};

@compute @workgroup_size(${g})
fn main(
  @builtin(workgroup_id) wg_id: vec3<u32>,
  @builtin(local_invocation_id) local_id: vec3<u32>,
) {
  let wg_idx = wg_id.x + wg_id.y * ${M}u;
  let mat_idx = wg_idx / ${a}u;
  let rhs_idx = wg_idx % ${a}u;

  if (mat_idx >= ${n}u) {
    return;
  }

  let a_base = mat_idx * ${u*u}u;
  let bx_base = (mat_idx * ${a}u + rhs_idx) * ${u}u;
  let tid = local_id.x;

  // Step 1: Copy b to x (threads collaborate)
  for (var idx = tid; idx < ${u}u; idx += ${g}u) {
    x[bx_base + idx] = b[bx_base + idx];
  }
  storageBarrier();

  // Step 2: Back-substitution from j = n-1 down to 0
  for (var jj = 0u; jj < ${u}u; jj++) {
    let j = ${u-1}u - jj;

    // Thread 0 computes x[j] = x[j] / a[j,j]
    if (tid == 0u) {
      ${s.unitDiagonal?"x_j = x[bx_base + j];":`x_j = x[bx_base + j] / a[a_base + j * ${u}u + j];`}
      x[bx_base + j] = x_j;
    }
    workgroupBarrier();  // Sync shared memory x_j

    // All threads subtract x[j] * a[i,j] from x[i] for i < j
    for (var i = tid; i < j; i += ${g}u) {
      x[bx_base + i] -= x_j * a[a_base + i * ${u}u + j];
    }
    workgroupBarrier();
    storageBarrier();
  }
}
`.trim(),numInputs:2,numOutputs:1,hasUniform:!1,passes:[{grid:E(n*a)}]}]}function we(t,e){const s=e.inputDtypes[0],i=e.inputShapes[0],o=i[i.length-1],r=q(i.slice(0,-2)),u=s==="float16",a=w(s,!0),n=C(o,t.limits.maxComputeWorkgroupSizeX);return[{code:`
${u?"enable f16;":""}
${z}

@group(0) @binding(0) var<storage, read> input: array<${a}>;
@group(0) @binding(1) var<storage, read_write> output: array<${a}>;

// Shared memory for the diagonal element
var<workgroup> L_jj: ${a};

@compute @workgroup_size(${n})
fn main(
  @builtin(workgroup_id) wg_id: vec3<u32>,
  @builtin(local_invocation_id) local_id: vec3<u32>,
) {
  let batch = wg_id.x + wg_id.y * ${M}u;
  if (batch >= ${r}u) {
    return;
  }

  let base = batch * ${o*o}u;
  let tid = local_id.x;

  // Zero out output and copy lower triangle from input (threads collaborate)
  for (var idx = tid; idx < ${o*o}u; idx += ${n}u) {
    let row = idx / ${o}u;
    let col = idx % ${o}u;
    output[base + idx] = select(0, input[base + idx], col <= row);
  }
  storageBarrier();

  // Cholesky-Crout algorithm: process column by column
  for (var j = 0u; j < ${o}u; j++) {
    // Step 1: All threads compute sum for their rows i >= j in parallel
    // sum = A[i][j] - sum(L[i][k] * L[j][k] for k < j)
    for (var i = j + tid; i < ${o}u; i += ${n}u) {
      var sum = output[base + i * ${o}u + j];
      for (var k = 0u; k < j; k++) {
        sum -= output[base + i * ${o}u + k] * output[base + j * ${o}u + k];
      }
      output[base + i * ${o}u + j] = sum;
    }
    storageBarrier();

    // Step 2: Thread 0 computes L[j][j] = sqrt(output[j][j])
    if (tid == 0u) {
      L_jj = sqrt(output[base + j * ${o}u + j]);
      output[base + j * ${o}u + j] = L_jj;
    }
    workgroupBarrier();

    // Step 3: All threads divide output[i][j] by L[j][j] for i > j
    for (var i = j + 1u + tid; i < ${o}u; i += ${n}u) {
      output[base + i * ${o}u + j] /= L_jj;
    }
    storageBarrier();
  }
}
`.trim(),numInputs:1,numOutputs:1,hasUniform:!1,passes:[{grid:E(r)}]}]}function ve(t,e){const s=e.inputDtypes[0],i=e.inputShapes[0],o=i[i.length-2],r=i[i.length-1],u=Math.min(o,r),a=q(i.slice(0,-2)),n=s==="float16",p=w(s,!0),c=C(Math.max(o,r),t.limits.maxComputeWorkgroupSizeX);return[{code:`
${n?"enable f16;":""}
${z}

@group(0) @binding(0) var<storage, read> input: array<${p}>;
@group(0) @binding(1) var<storage, read_write> lu: array<${p}>;
@group(0) @binding(2) var<storage, read_write> pivots: array<i32>;
@group(0) @binding(3) var<storage, read_write> perm: array<i32>;

var<workgroup> pivot_row: u32;
var<workgroup> pivot_val: ${p};

@compute @workgroup_size(${c})
fn main(
  @builtin(workgroup_id) wg_id: vec3<u32>,
  @builtin(local_invocation_id) local_id: vec3<u32>,
) {
  let batch = wg_id.x + wg_id.y * ${M}u;
  if (batch >= ${a}u) {
    return;
  }

  let lu_base = batch * ${o*r}u;
  let piv_base = batch * ${u}u;
  let perm_base = batch * ${o}u;
  let tid = local_id.x;

  // Copy input to lu
  for (var idx = tid; idx < ${o*r}u; idx += ${c}u) {
    lu[lu_base + idx] = input[lu_base + idx];
  }
  // Initialize permutation
  for (var idx = tid; idx < ${o}u; idx += ${c}u) {
    perm[perm_base + idx] = i32(idx);
  }
  storageBarrier();

  // LU decomposition with partial pivoting
  for (var j = 0u; j < ${u}u; j++) {
    // Step 1: Thread 0 finds pivot (max abs value in column j, rows >= j)
    if (tid == 0u) {
      var max_val = abs(lu[lu_base + j * ${r}u + j]);
      var max_row = j;
      for (var i = j + 1u; i < ${o}u; i++) {
        let val = abs(lu[lu_base + i * ${r}u + j]);
        if (val > max_val) {
          max_val = val;
          max_row = i;
        }
      }
      pivot_row = max_row;
      pivot_val = lu[lu_base + max_row * ${r}u + j];
      pivots[piv_base + j] = i32(max_row);
    }
    workgroupBarrier();

    // Step 2: Swap rows j and pivot_row (threads collaborate)
    let pr = pivot_row;
    if (pr != j) {
      for (var col = tid; col < ${r}u; col += ${c}u) {
        let tmp = lu[lu_base + j * ${r}u + col];
        lu[lu_base + j * ${r}u + col] = lu[lu_base + pr * ${r}u + col];
        lu[lu_base + pr * ${r}u + col] = tmp;
      }
      if (tid == 0u) {
        let tmp_p = perm[perm_base + j];
        perm[perm_base + j] = perm[perm_base + pr];
        perm[perm_base + pr] = tmp_p;
      }
    }
    storageBarrier();

    // Step 3: Compute L[i][j] and update submatrix
    // Each thread handles one row i > j
    for (var i = j + 1u + tid; i < ${o}u; i += ${c}u) {
      let factor = lu[lu_base + i * ${r}u + j] / pivot_val;
      lu[lu_base + i * ${r}u + j] = factor; // L[i][j]
      for (var k = j + 1u; k < ${r}u; k++) {
        lu[lu_base + i * ${r}u + k] -= factor * lu[lu_base + j * ${r}u + k];
      }
    }
    storageBarrier();
  }
}
`.trim(),numInputs:1,numOutputs:3,hasUniform:!1,passes:[{grid:E(a)}]}]}function ye(t,e,s){const i=e.inputDtypes[0],o=e.inputShapes[0],r=o[o.length-1],u=q(o.slice(0,-2)),a=i==="float16",n=w(i,!0),p=`${n}(${s.tolerance})`,c=C(Math.max(r,1),t.limits.maxComputeWorkgroupSizeX);return[{code:`
${a?"enable f16;":""}
${z}

@group(0) @binding(0) var<storage, read> input: array<${n}>;
@group(0) @binding(1) var<storage, read_write> diagonalized: array<${n}>;
@group(0) @binding(2) var<storage, read_write> vectors: array<${n}>;

var<workgroup> done: u32;
var<workgroup> rot_active: u32;
var<workgroup> rot_c: ${n};
var<workgroup> rot_s: ${n};
var<workgroup> rot_app: ${n};
var<workgroup> rot_aqq: ${n};
var<workgroup> rot_apq: ${n};

fn mat_idx(base: u32, row: u32, col: u32) -> u32 {
  return base + row * ${r}u + col;
}

fn sym_idx(base: u32, row: u32, col: u32) -> u32 {
  return mat_idx(base, max(row, col), min(row, col));
}

@compute @workgroup_size(${c})
fn main(
  @builtin(workgroup_id) wg_id: vec3<u32>,
  @builtin(local_invocation_id) local_id: vec3<u32>,
) {
  let batch = wg_id.x + wg_id.y * ${M}u;
  if (batch >= ${u}u) {
    return;
  }

  let base = batch * ${r*r}u;
  let tid = local_id.x;

  for (var idx = tid; idx < ${r*r}u; idx += ${c}u) {
    let row = idx / ${r}u;
    let col = idx % ${r}u;
    diagonalized[base + idx] = select(
      ${n}(0),
      input[base + idx],
      row >= col,
    );
    vectors[base + idx] = select(${n}(0), ${n}(1), row == col);
  }
  storageBarrier();

  for (var sweep = 0u; sweep < ${s.maxSweeps}u; sweep++) {
    if (tid == 0u) {
      var max_abs = ${n}(1);
      var max_offdiag = ${n}(0);
      for (var idx = 0u; idx < ${r*r}u; idx++) {
        let row = idx / ${r}u;
        let col = idx % ${r}u;
        let value = abs(diagonalized[base + idx]);
        max_abs = max(max_abs, value);
        if (row > col) {
          max_offdiag = max(max_offdiag, value);
        }
      }
      done = select(0u, 1u, max_offdiag <= ${p} * max_abs);
    }
    let done_uniform = workgroupUniformLoad(&done);
    if (done_uniform != 0u) {
      break;
    }

    for (var p = 0u; p + 1u < ${r}u; p++) {
      for (var q = p + 1u; q < ${r}u; q++) {
        if (tid == 0u) {
          rot_app = diagonalized[mat_idx(base, p, p)];
          rot_aqq = diagonalized[mat_idx(base, q, q)];
          rot_apq = diagonalized[sym_idx(base, p, q)];
          if (rot_apq == ${n}(0)) {
            rot_active = 0u;
            rot_c = ${n}(1);
            rot_s = ${n}(0);
          } else {
            let tau = (rot_aqq - rot_app) / (${n}(2) * rot_apq);
            let tau_sign = select(${n}(-1), ${n}(1), tau >= ${n}(0));
            let t = tau_sign / (abs(tau) + sqrt(tau * tau + ${n}(1)));
            rot_c = inverseSqrt(t * t + ${n}(1));
            rot_s = t * rot_c;
            rot_active = 1u;
          }
        }
        workgroupBarrier();

        if (rot_active != 0u) {
          for (var k = tid; k < ${r}u; k += ${c}u) {
            if (k != p && k != q) {
              let kp = sym_idx(base, k, p);
              let kq = sym_idx(base, k, q);
              let akp = diagonalized[kp];
              let akq = diagonalized[kq];
              let next_kp = rot_c * akp - rot_s * akq;
              let next_kq = rot_s * akp + rot_c * akq;
              diagonalized[kp] = next_kp;
              diagonalized[kq] = next_kq;
            } else if (k == p) {
              diagonalized[mat_idx(base, p, p)] =
                rot_c * rot_c * rot_app - ${n}(2) * rot_s * rot_c * rot_apq + rot_s * rot_s * rot_aqq;
              diagonalized[sym_idx(base, p, q)] = ${n}(0);
            } else {
              diagonalized[mat_idx(base, q, q)] =
                rot_s * rot_s * rot_app + ${n}(2) * rot_s * rot_c * rot_apq + rot_c * rot_c * rot_aqq;
            }

            let vp = mat_idx(base, k, p);
            let vq = mat_idx(base, k, q);
            let vkp = vectors[vp];
            let vkq = vectors[vq];
            vectors[vp] = rot_c * vkp - rot_s * vkq;
            vectors[vq] = rot_s * vkp + rot_c * vkq;
          }
        }
        storageBarrier();
      }
    }
  }
}
`.trim(),numInputs:1,numOutputs:2,hasUniform:!1,passes:[{grid:E(u)}]}]}function F(t,e,s,i){return new Uint8Array(new Uint32Array([t,e,s,i?1:0]).buffer)}function ke(t,e,s){const i=e.inputDtypes[0],o=e.inputShapes[0],r=o[o.length-1],u=q(o.slice(0,-1));if(q(s.factors)!==r)throw new Error(`fft: factorization ${s.factors} does not match size ${r}`);const a=i==="float16",n=w(i,!0),p=Math.min(256,C(0,t.limits.maxComputeWorkgroupSizeX)),c=Math.max(1,...s.factors),g=s.inverse?"6.283185307179586":"-6.283185307179586",v=s.factors.map(x=>`
  digit = remaining % ${x}u;
  remaining = remaining / ${x}u;
  stride = stride * ${x}u;
  reversed = reversed + digit * (${r}u / stride);`).join(""),y=`
${a?"enable f16;":""}
${z}

@group(0) @binding(0) var<storage, read> input_real: array<${n}>;
@group(0) @binding(1) var<storage, read> input_imag: array<${n}>;
@group(0) @binding(2) var<storage, read_write> output_real: array<${n}>;
@group(0) @binding(3) var<storage, read_write> output_imag: array<${n}>;

struct FftParams {
  phase: u32,
  radix: u32,
  prev: u32,
  normalize: u32,
}

@group(1) @binding(0) var<uniform> fft_params: FftParams;

fn digit_reversed_index(index: u32) -> u32 {
  var remaining = index;
  var stride = 1u;
  var reversed = 0u;
  var digit = 0u;
${v}
  return reversed;
}

@compute @workgroup_size(${p})
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let global = global_id.x + global_id.y * ${M*p}u;

  if (fft_params.phase == 0u) {
    if (global >= ${u*r}u) {
      return;
    }
    let batch = global / ${r}u;
    let out_idx = global % ${r}u;
    let source = batch * ${r}u + digit_reversed_index(out_idx);
    output_real[global] = input_real[source];
    output_imag[global] = input_imag[source];
    return;
  }

  let butterflies_per_batch = ${r}u / fft_params.radix;
  if (global >= ${u}u * butterflies_per_batch) {
    return;
  }

  let batch = global / butterflies_per_batch;
  let local = global % butterflies_per_batch;
  let j = local % fft_params.prev;
  let group = local / fft_params.prev;
  let span = fft_params.prev * fft_params.radix;
  let start = batch * ${r}u + group * span + j;
  let scale = select(1.0, 1.0 / f32(${r}u), fft_params.normalize != 0u);

  var scratch_real: array<f32, ${c}>;
  var scratch_imag: array<f32, ${c}>;

  for (var q = 0u; q < fft_params.radix; q++) {
    let idx = start + q * fft_params.prev;
    let angle = ${g} * f32(q * j) / f32(span);
    let c = cos(angle);
    let s = sin(angle);
    let xr = f32(output_real[idx]);
    let xi = f32(output_imag[idx]);
    scratch_real[q] = xr * c - xi * s;
    scratch_imag[q] = xr * s + xi * c;
  }

  for (var p = 0u; p < fft_params.radix; p++) {
    var sum_real = 0.0;
    var sum_imag = 0.0;
    for (var q = 0u; q < fft_params.radix; q++) {
      let angle = ${g} * f32(q * p) / f32(fft_params.radix);
      let c = cos(angle);
      let s = sin(angle);
      let xr = scratch_real[q];
      let xi = scratch_imag[q];
      sum_real += xr * c - xi * s;
      sum_imag += xr * s + xi * c;
    }
    let idx = start + p * fft_params.prev;
    output_real[idx] = ${n}(sum_real * scale);
    output_imag[idx] = ${n}(sum_imag * scale);
  }
}
`.trim(),_=[{grid:E(Math.ceil(u*r/p)),uniform:F(0,1,1,!1)}];let $=1;for(let x=0;x<s.factors.length;x++){const f=s.factors[x];_.push({grid:E(Math.ceil(u*r/f/p)),uniform:F(1,f,$,s.inverse&&x===s.factors.length-1)}),$*=f}return[{code:y,numInputs:2,numOutputs:2,hasUniform:!0,passes:_}]}function D(t,e){switch(e.name){case"Sort":return _e(t,e.type);case"Argsort":return $e(t,e.type);case"TriangularSolve":return be(t,e.type,e.params);case"Cholesky":return we(t,e.type);case"LU":return ve(t,e.type);case"JacobiEigh":return ye(t,e.type,e.params);case"Fft":return ke(t,e.type,e.params);default:throw new ie(e.name,"webgpu")}}const T=4096,N=new WeakMap;function Se(t){return{querySet:t.createQuerySet({type:"timestamp",count:T}),resolve:t.createBuffer({size:T*8,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),dst:t.createBuffer({size:T*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),nextIndex:0,entries:[]}}function je(t,e,s,i,o){const r=ae(s);r.properties.push(["passes",`${i}`]),r.properties.push(["source",o]),e.batch.entries.push({...r,beginIndex:e.beginIndex,endIndex:e.endIndex}),Ue(t)}function Ue(t){queueMicrotask(()=>{const e=N.get(t);e&&e.entries.length>0&&(Be(t,e),N.set(t,Se(t)))})}function Be(t,e){if(e.entries.length===0)return;const s=e.nextIndex,i=t.createCommandEncoder();i.resolveQuerySet(e.querySet,0,s,e.resolve,0),i.copyBufferToBuffer(e.resolve,0,e.dst,0,s*8),t.queue.submit([i.finish()]);const{entries:o}=e;e.dst.mapAsync(GPUMapMode.READ).then(()=>{try{const r=new BigInt64Array(e.dst.getMappedRange()),u=r[o[o.length-1].endIndex],a=performance.now();for(const n of o)oe("webgpu",n,a+Number(r[n.beginIndex]-u)/1e6,a+Number(r[n.endIndex]-u)/1e6)}finally{e.dst.unmap(),e.querySet.destroy(),e.resolve.destroy(),e.dst.destroy()}})}const X=64*1024*1024,qe=64;var ze=class{device;type="webgpu";maxArgs;pipelines;syncReader;buffers;nextSlot;#e=new Map;#r;#i=new Map;constructor(t){this.device=t,this.maxArgs=this.device.limits.maxStorageBuffersPerShaderStage-1,this.pipelines=new Ce(t),this.syncReader=new xe(t),this.buffers=new Map,this.nextSlot=1,this.#r=this.#o(4),t.addEventListener("uncapturederror",e=>{console.error("Uncaptured error in WebGPU backend:",e.error.message)})}malloc(t,e){if(e&&e.byteLength!==t)throw new Error("initialData size does not match buffer size");const s=Math.ceil(t/4)*4||4,i=t===0?this.#r:this.#a(s);if(e&&t>0)if(e.byteLength%4===0)this.device.queue.writeBuffer(i,0,e);else{const r=e.byteLength-e.byteLength%4;r>0&&this.device.queue.writeBuffer(i,0,e,0,r);const u=new Uint8Array(4);u.set(e.subarray(r)),this.device.queue.writeBuffer(i,r,u)}const o=this.nextSlot++;return this.buffers.set(o,{buffer:i,size:t,allocatedSize:s,ref:1}),o}incRef(t){const e=this.buffers.get(t);if(!e)throw new L(t);e.ref++}decRef(t){const e=this.buffers.get(t);if(!e)throw new L(t);e.ref--,e.ref===0&&(this.buffers.delete(t),e.buffer!==this.#r&&this.#n(e.buffer,e.allocatedSize))}async read(t,e,s){const{buffer:i,size:o}=this.#t(t);if(i===this.#r)return new Uint8Array;e===void 0&&(e=0),s===void 0&&(s=o-e);const r=Math.ceil(s/4)*4,u=this.#o(r,{read:!0});try{const a=this.device.createCommandEncoder();a.copyBufferToBuffer(i,e,u,0,r),this.device.queue.submit([a.finish()]),await u.mapAsync(GPUMapMode.READ);const n=u.getMappedRange();return new Uint8Array(n.slice(),0,s)}finally{u.destroy()}}readSync(t,e,s){const{buffer:i,size:o}=this.#t(t);return i===this.#r?new Uint8Array:(e===void 0&&(e=0),s===void 0&&(s=o-e),this.syncReader.read(i,e,s))}#s(t){const e=ee.hash(t);let s=this.#e.get(e);return s||(s=Ee(this.device,t),this.#e.set(e,s)),s}async prepareKernel(t){const e=this.#s(t),s=await this.pipelines.prepare(e);return new G(t,[{...e,pipeline:s}])}prepareKernelSync(t){const e=this.#s(t),s=this.pipelines.prepareSync(e);return new G(t,[{...e,pipeline:s}])}async prepareRoutine(t){const e=D(this.device,t);return new G(t,await Promise.all(e.map(async s=>{const i=await this.pipelines.prepare(s);return{...s,pipeline:i}})))}prepareRoutineSync(t){return new G(t,D(this.device,t).map(e=>{const s=this.pipelines.prepareSync(e);return{...e,pipeline:s}}))}dispatch(t,e,s){const i=e.map(r=>this.#t(r).buffer),o=s.map(r=>this.#t(r).buffer);Pe(this.device,t,i,o)}dispatchBatch(t){const e=t.map(({exe:i,inputs:o,outputs:r})=>({exe:i,inputs:o.map(u=>this.#t(u).buffer),outputs:r.map(u=>this.#t(u).buffer)})),s=1024;for(let i=0;i<e.length;i+=s){const o=this.device.createCommandEncoder();for(const r of e.slice(i,i+s))H(this.device,o,r.exe,r.inputs,r.outputs);this.device.queue.submit([o.finish()])}}#t(t){const e=this.buffers.get(t);if(!e)throw new L(t);return{buffer:e.buffer,size:e.size}}#a(t){if(t>X)return this.#o(t);const e=this.#i.get(t),s=e?.pop();return e&&e.length===0&&this.#i.delete(t),s??this.#o(t)}#n(t,e){if(e>X){t.destroy();return}const s=this.#i.get(e);if(!s){this.#i.set(e,[t]);return}if(s.length>=qe){t.destroy();return}s.push(t)}#o(t,{mapped:e=!1,read:s=!1}={}){if(s&&e)throw new Error("mapped and read cannot both be true");return this.device.createBuffer({size:t,usage:s?GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST,mappedAtCreation:e})}};function Ee(t,e){const s=me(t,e);if(s)return s;const i=re(e),{nargs:o,reduction:r}=e,u=Array.from({length:o},(f,m)=>`in${m}`),a=new V;a.emitPreamble(t,[i.exp,i.epilogue]);const n=Array.from({length:o},()=>null);i.exp.fold(f=>{f.op==="GlobalIndex"&&(n[f.arg[0]]=f.dtype)}),i.epilogue?.fold(f=>{f.op==="GlobalIndex"&&(n[f.arg[0]]=f.dtype)});for(let f=0;f<o;f++){const m=w(n[f]??"float32",!0);a.emit(`@group(0) @binding(${f}) var<storage, read> ${u[f]} : array<${m}>;`)}const p=w(e.dtype,!0);a.emit(`@group(0) @binding(${o}) var<storage, read_write> result : array<${p}>;`);const c=r?i.size.groups??1:1,g=r&&c>1;if(g&&i.threadCount%c!==0)throw new Error("WebGPU grouped reduction has invalid thread count");if(g&&c>t.limits.maxComputeWorkgroupSizeX)throw new Error("WebGPU grouped reduction exceeds workgroup size limit");const v=g?c:C(i.threadCount,256),y=g?i.threadCount/c:Math.ceil(i.threadCount/v),[_,$]=E(y);if(g){const f=w(r.dtype);for(let m=0;m<(i.size.upcast??1);m++)a.emit(`var<workgroup> partial${m}: array<${f}, ${c}>;`)}if(a.emit("",`@compute @workgroup_size(${v})`),g)a.emit("fn main(",a.pushIndent,"@builtin(local_invocation_id) lid : vec3<u32>,","@builtin(workgroup_id) wg_id : vec3<u32>,",a.popIndent,") {",a.pushIndent),$===1?a.emit(`if (wg_id.x >= ${y}u) { return; }`,"let gidx: i32 = i32(wg_id.x);"):a.emit(`if (${_}u * wg_id.y + wg_id.x >= ${y}u) { return; }`,`let gidx: i32 = i32(${_}u * wg_id.y + wg_id.x);`),a.emit("let group: i32 = i32(lid.x);");else if(a.emit("fn main(@builtin(global_invocation_id) id : vec3<u32>) {",a.pushIndent),$===1)a.emit(`if (id.x >= ${i.threadCount}) { return; }`,"let gidx: i32 = i32(id.x);");else{const f=_*v;a.emit(`if (${f} * id.y + id.x >= ${i.threadCount}) { return; }`,`let gidx: i32 = i32(${f} * id.y + id.x);`)}a.emitPhonyAssignments(u);const x=new Z(a,u);if(r){const f=i.size.unroll??1,m=i.size.upcast??1,b=[...Array(m)].map((l,d)=>`acc${d}`);for(let l=0;l<m;l++)a.emit(`var ${b[l]}: ${w(r.dtype)} = ${Q(r.dtype,r.identity)};`);a.emit(`for (var ridx: i32 = 0; ridx < ${i.size.reduce}; ridx++) {`,a.pushIndent);const A=[],I=new Map;for(let l=0;l<m;l++){A.push([]);for(let d=0;d<f;d++){const S=i.exp.substitute({upcast:U.i32(l),unroll:U.i32(d)});A[l].push(S.simplify(I)),x.countReferences(A[l][d])}}const B=A.map(l=>l.map(d=>x.run(d)).map(h));for(let l=0;l<m;l++){let d=B[l][0];for(let S=1;S<f;S++)if(r.op==="Add")d=`${d} + ${B[l][S]}`;else if(r.op==="Mul")d=`${d} * ${B[l][S]}`;else if(r.op==="Min")d=r.dtype==="bool"?`(${d} && ${B[l][S]})`:`min(${d}, ${B[l][S]})`;else if(r.op==="Max")d=r.dtype==="bool"?`(${d} || ${B[l][S]})`:`max(${d}, ${B[l][S]})`;else throw new Error(`Unsupported reduction op: ${r.op}`);if(r.op==="Add")a.emit(`${b[l]} += ${d};`);else if(r.op==="Mul")a.emit(`${b[l]} *= ${d};`);else if(r.op==="Min")r.dtype==="bool"?a.emit(`${b[l]} = ${b[l]} && ${d};`):a.emit(`${b[l]} = min(${b[l]}, ${d});`);else if(r.op==="Max")r.dtype==="bool"?a.emit(`${b[l]} = ${b[l]} || ${d};`):a.emit(`${b[l]} = max(${b[l]}, ${d});`);else throw new Error(`Unsupported reduction op: ${r.op}`)}if(a.emit(a.popIndent,"}"),g){for(let l=0;l<m;l++)a.emit(`partial${l}[lid.x] = ${b[l]};`);a.emit("workgroupBarrier();");for(let l=c/2;l>=1;l/=2){a.emit(`if (lid.x < ${l}u) {`,a.pushIndent);for(let d=0;d<m;d++)a.emit(`partial${d}[lid.x] = ${le(r.op,r.dtype,`partial${d}[lid.x]`,`partial${d}[lid.x + ${l}u]`)};`);a.emit(a.popIndent,"}","workgroupBarrier();")}}x.reset();const P=[],j=[];for(let l=0;l<m;l++){const d=i.outputIdxExp.substitute({upcast:U.i32(l)});P.push(d.simplify(I)),x.countReferences(P[l]),j.push(i.epilogue.substitute({acc:U.variable(r.dtype,b[l]),upcast:U.i32(l)}).simplify(I)),x.countReferences(j[l])}if(g){a.emit("if (lid.x == 0u) {",a.pushIndent);for(let l=0;l<m;l++)a.emit(`${b[l]} = partial${l}[0u];`)}for(let l=0;l<m;l++){const d=h(x.run(P[l]));let S=h(x.run(j[l]));p!==w(j[l].dtype)&&(S=`${p}(${S})`),a.emit(`result[${d}] = ${S};`)}g&&a.emit(a.popIndent,"}")}else{x.countReferences(i.exp);let f=h(x.run(i.exp));p!==w(i.exp.dtype)&&(f=`${p}(${f})`),a.emit(`result[gidx] = ${f};`)}return a.emit(a.popIndent,"}"),{code:a.toString(),numInputs:o,numOutputs:1,hasUniform:!1,passes:[{grid:[_,$]}]}}function Pe(t,e,s,i){const o=t.createCommandEncoder();H(t,o,e,s,i),t.queue.submit([o.finish()])}function H(t,e,s,i,o){const{data:r,source:u}=s;for(const{pipeline:a,...n}of r){if(i.length!==n.numInputs||o.length!==n.numOutputs)throw new Error(`webgpu: expected ${n.numInputs} inputs and ${n.numOutputs} outputs, got ${i.length} inputs and ${o.length} outputs`);const p=n.passes.filter(({grid:_})=>q(_)>0);if(p.length===0)continue;const c=void 0,g=t.createBindGroup({layout:a.getBindGroupLayout(0),entries:[...i.map((_,$)=>({binding:$,resource:{buffer:_}})),...o.map((_,$)=>({binding:i.length+$,resource:{buffer:_}}))]});let v=null,y=0;if(n.hasUniform){const[_,$]=Me(t,p.map(({uniform:x})=>x));y=$,v=t.createBindGroup({layout:a.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:_,size:$}}]})}for(let _=0;_<p.length;_++){const{grid:$}=p[_];let x;if(c){const m=_===0,b=_===p.length-1;(m||b)&&(x={querySet:c.batch.querySet,...m?{beginningOfPassWriteIndex:c.beginIndex}:{},...b?{endOfPassWriteIndex:c.endIndex}:{}})}const f=e.beginComputePass({timestampWrites:x});f.setPipeline(a),f.setBindGroup(0,g),v&&f.setBindGroup(1,v,[_*y]),f.dispatchWorkgroups($[0],$[1]),f.end()}c&&je(t,c,u,p.length,n.code)}}function Me(t,e){for(const u of e)if(!u||u.byteLength===0||u.byteLength!==e[0].byteLength)throw new Error("webgpu: Uniform mismatch between shader passes");const s=t.limits.minUniformBufferOffsetAlignment,i=Math.ceil(e[0].byteLength/s)*s,o=t.createBuffer({size:i*e.length,usage:GPUBufferUsage.UNIFORM,mappedAtCreation:!0}),r=new Uint8Array(o.getMappedRange());for(let u=0;u<e.length;u++)r.set(e[u],u*i);return o.unmap(),[o,i]}var Ce=class{device;cache;inProgress;constructor(t){this.device=t,this.cache=new Map,this.inProgress=new Map}#e(t){if(t.numInputs+t.numOutputs>this.device.limits.maxStorageBuffersPerShaderStage){const s=t.numInputs+t.numOutputs,i=this.device.limits.maxStorageBuffersPerShaderStage;throw new Error(`Too many buffers (${s}) for WebGPU pipeline (max: ${i})`)}const e=[this.device.createBindGroupLayout({entries:te(t.numInputs+t.numOutputs).map(s=>({binding:s,visibility:GPUShaderStage.COMPUTE,buffer:{type:s<t.numInputs?"read-only-storage":"storage"}}))})];return t.hasUniform&&e.push(this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform",hasDynamicOffset:!0}}]})),this.device.createPipelineLayout({bindGroupLayouts:e})}async prepare(t){const e=this.cache.get(t.code);if(e)return e;const s=this.inProgress.get(t.code);if(s)return await s;const i=this.device.createShaderModule({code:t.code}),o=(async()=>{this.device.pushErrorScope("validation");try{const u=await this.device.createComputePipelineAsync({layout:this.#e(t),compute:{module:i,entryPoint:"main"}});return await this.device.popErrorScope(),u}catch{const a=await Y(i,await this.device.popErrorScope(),t.code);throw new Error(a)}})();this.inProgress.set(t.code,o);const r=await o;return this.cache.set(t.code,r),r}prepareSync(t){const e=this.cache.get(t.code);if(e)return e;const s=this.device.createShaderModule({code:t.code});this.device.pushErrorScope("validation");const i=this.device.createComputePipeline({layout:this.#e(t),compute:{module:s,entryPoint:"main"}});return this.device.popErrorScope().then(async o=>{if(o!==null){const r=await Y(s,o,t.code);console.error(r)}}),this.cache.set(t.code,i),i}};async function Y(t,e,s){let i=`Failed to compile shader: ${e?e.message:"(no error scope)"}`;const o=await t.getCompilationInfo();for(const r of o.messages)i+=`
  [${r.type} at ${r.lineNum}:${r.linePos}] ${r.message}`;return s&&(i+=`

${s}`),i}export{ze as WebGPUBackend};
