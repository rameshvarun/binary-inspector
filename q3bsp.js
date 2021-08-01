(()=>{"use strict";var e,t={3488:(e,t,r)=>{function n(e){return new Uint8Array(e.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer}function a(e){let t="",r=new Uint8Array(e);for(let e of r)t+=String.fromCharCode(e);return window.btoa(t)}function s(e){let t=window.atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return r.buffer}function i(e){return e.split(/\r?\n/g)}r.d(t,{aS:()=>n,sM:()=>a,RG:()=>s,uq:()=>i})},5894:(e,t,r)=>{var n=r(7294),a=r(3935),s=r(1977),i=r(4051),o=r(1555),u=r(5114),l=r(3488),d=r(806),c=r(3855),f=r(5327),h=r(7343);class m extends n.Component{constructor(e){super(e),this.state={kind:"noData"}}componentDidMount(){if(h.e$("data")){let e=h.U2("data"),t=l.RG(e);this.loadBuffer(t)}}loadBuffer(e){h.t8("data",l.sM(e));let t=new s.a(e,0,e.byteLength);try{let e=this.props.inspect(t);this.setState({kind:"decodeSuccess",data:t,tree:e})}catch(e){this.setState({kind:"decodeFailure",data:t,error:e})}}render(){return n.createElement(n.Fragment,null,n.createElement(d.Y,{inputName:"input",defaultBase64:h.U2("data"),onBuffer:e=>this.loadBuffer(e)}),"decodeSuccess"==this.state.kind&&n.createElement(c.W,{tree:this.state.tree,data:this.state.data}),"decodeFailure"==this.state.kind&&n.createElement(i.Z,null,n.createElement(o.Z,null,n.createElement(u.Z,{variant:"danger"},n.createElement(u.Z.Heading,null,this.state.error.toString()),n.createElement("code",null,n.createElement("pre",null,this.state.error.stack)))),n.createElement(o.Z,null,n.createElement(f.V,{data:this.state.data}))),"noData"==this.state.kind&&n.createElement("div",null,"No data provided yet."))}}var w,p=r(2711);function E(e){return console.log(e.readUTF8()),new p.m(`Entities: ${e.readUTF8()}`,e)}function b(e){let t=e.bytes(0,64),r=e.bytes(64,4),n=e.bytes(68,4);return new p.m(`Texture: ${t.readUTF8()}`,e,[new p.m(`Name: ${t.readUTF8()}`,t),new p.m(`Flags: ${r.readUIntLE()}`,r),new p.m(`Contents: ${n.readUIntLE()}`,n)])}function y(e){if(e.size()%72!=0)throw new Error("Unexpected size.");return new p.m("Textures",e,e.chunks(72).map(b))}function g(e,t){let r=t.bytes(0,4),n=t.bytes(4,4),a=t.bytes(8,4);return new p.m(`${e}: [${r.readFloat32LE()}, ${n.readFloat32LE()}, ${a.readFloat32LE()}]`,t,[new p.m(`x: ${r.readFloat32LE()}`,r),new p.m(`y: ${n.readFloat32LE()}`,n),new p.m(`z: ${a.readFloat32LE()}`,a)])}function L(e){let t=e.bytes(0,12),r=e.bytes(12,4);return new p.m("Plane",e,[g("Normal",t),new p.m(`Dist: ${r.readFloat32LE()}`,r)])}function v(e){if(e.size()%16!=0)throw new Error("Unexpected size.");return new p.m("Planes",e,e.chunks(16).map(L))}function U(e){return new p.m("Lightmap",e,[])}function F(e){if(e.size()%49152!=0)throw new Error("Unexpected size.");return new p.m("Lightmaps",e,e.chunks(49152).map(U))}function $(e){let t=e.bytes(0,12),r=e.bytes(12,12);return new p.m("Bounding Box",e,[g("Min",t),g("Max",r)])}function x(e){let t=e.bytes(0,24),r=e.bytes(24,4),n=e.bytes(28,4),a=e.bytes(32,4),s=e.bytes(36,4);return new p.m("Model",e,[$(t),new p.m(`First Face: ${r.readUIntLE()}`,r),new p.m(`Number of Faces: ${n.readUIntLE()}`,n),new p.m(`First Brush: ${a.readUIntLE()}`,a),new p.m(`Number of Brushes: ${s.readUIntLE()}`,s)])}function k(e){if(e.size()%40!=0)throw new Error("Unexpected size.");return new p.m("Models",e,e.chunks(40).map(x))}!function(e){e[e.Entities=0]="Entities",e[e.Textures=1]="Textures",e[e.Planes=2]="Planes",e[e.Nodes=3]="Nodes",e[e.Leafs=4]="Leafs",e[e.Leaffaces=5]="Leaffaces",e[e.Leafbrushes=6]="Leafbrushes",e[e.Models=7]="Models",e[e.Brushes=8]="Brushes",e[e.Brushsides=9]="Brushsides",e[e.Vertexes=10]="Vertexes",e[e.Meshverts=11]="Meshverts",e[e.Effects=12]="Effects",e[e.Faces=13]="Faces",e[e.Lightmaps=14]="Lightmaps",e[e.Lightvols=15]="Lightvols",e[e.Visdata=16]="Visdata"}(w||(w={})),a.render(n.createElement(m,{inspect:function(e){let t=e.bytes(0,4),r=e.bytes(4,4);if("IBSP"!==t.readUTF8())throw new Error("Invalid magic signature.");if(46!==r.readUIntLE())throw new Error(`Only supports version 46. File is ${r.readUIntLE()}.`);let[n,a]=function(e){let t=[],r=[];for(let n=0;n<17;++n){let a=e.bytes(8*n,8),s=a.bytes(0,4),i=a.bytes(4,4);t.push(new p.m(`Directory Entry: ${w[n]}`,a,[new p.m(`Offset: ${s.readUIntLE()}`,s),new p.m(`Length: ${i.readUIntLE()}`,i)])),r.push({offset:s.readUIntLE(),length:i.readUIntLE()})}return[r,new p.m("Directory Entries",e,t)]}(e.bytes(8,136)),s=t=>e.bytes(t.offset,t.length);return new p.m("Quake 3 BSP File",e,[new p.m(`Magic: ${t.readUTF8()}`,t),new p.m(`Version (${r.readUIntLE()})`,r),a,E(s(n[w.Entities])),y(s(n[w.Textures])),v(s(n[w.Planes])),F(s(n[w.Lightmaps])),k(s(n[w.Models]))])}}),document.getElementById("root"))}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var s=r[e]={exports:{}};return t[e].call(s.exports,s,s.exports,n),s.exports}n.m=t,e=[],n.O=(t,r,a,s)=>{if(!r){var i=1/0;for(d=0;d<e.length;d++){for(var[r,a,s]=e[d],o=!0,u=0;u<r.length;u++)(!1&s||i>=s)&&Object.keys(n.O).every((e=>n.O[e](r[u])))?r.splice(u--,1):(o=!1,s<i&&(i=s));if(o){e.splice(d--,1);var l=a();void 0!==l&&(t=l)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[r,a,s]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={589:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,s,[i,o,u]=r,l=0;for(a in o)n.o(o,a)&&(n.m[a]=o[a]);if(u)var d=u(n);for(t&&t(r);l<i.length;l++)s=i[l],n.o(e,s)&&e[s]&&e[s][0](),e[i[l]]=0;return n.O(d)},r=self.webpackChunkbinary_inspectors=self.webpackChunkbinary_inspectors||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[763,850],(()=>n(5894)));a=n.O(a)})();