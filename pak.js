(()=>{"use strict";var e,t={3488:(e,t,n)=>{function r(e){return new Uint8Array(e.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer}function a(e){let t="",n=new Uint8Array(e);for(let e of n)t+=String.fromCharCode(e);return window.btoa(t)}function i(e){let t=window.atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return n.buffer}function o(e){return e.split(/\r?\n/g)}n.d(t,{aS:()=>r,sM:()=>a,RG:()=>i,uq:()=>o})},6459:(e,t,n)=>{var r=n(7294),a=n(3935),i=n(1977),o=n(4051),l=n(1555),s=n(5114),d=n(3488),c=n(806),u=n(3855),f=n(5327),m=n(7343);class h extends r.Component{constructor(e){super(e),this.state={kind:"noData"}}componentDidMount(){if(m.e$("data")){let e=m.U2("data"),t=d.RG(e);this.loadBuffer(t)}}loadBuffer(e){m.t8("data",d.sM(e));let t=new i.a(e,0,e.byteLength);try{let e=this.props.inspect(t);this.setState({kind:"decodeSuccess",data:t,tree:e})}catch(e){this.setState({kind:"decodeFailure",data:t,error:e})}}render(){return r.createElement(r.Fragment,null,r.createElement(c.Y,{inputName:"input",defaultBase64:m.U2("data"),onBuffer:e=>this.loadBuffer(e)}),"decodeSuccess"==this.state.kind&&r.createElement(u.W,{tree:this.state.tree,data:this.state.data}),"decodeFailure"==this.state.kind&&r.createElement(o.Z,null,r.createElement(l.Z,null,r.createElement(s.Z,{variant:"danger"},r.createElement(s.Z.Heading,null,this.state.error.toString()),r.createElement("code",null,r.createElement("pre",null,this.state.error.stack)))),r.createElement(l.Z,null,r.createElement(f.V,{data:this.state.data}))),"noData"==this.state.kind&&r.createElement("div",null,"No data provided yet."))}}var p=n(2711);a.render(r.createElement(h,{inspect:function(e){let t=e.bytes(0,4),n=e.bytes(4,4),r=e.bytes(8,4),a=function(e,t){let n=e.chunks(64).map((e=>function(e,t){let n=e.bytes(0,56).nullTerminated(),r=e.bytes(56,4),a=e.bytes(60,4),i=t.bytes(r.readUIntLE(),a.readUIntLE());return{entry:new p.m(`File Table Entry: ${n.readUTF8()}`,e,[new p.m(`Name: ${n.readUTF8()}`,n),new p.m(`File Offset: ${r.readUIntLE()}`,r),new p.m(`File Size: ${a.readUIntLE()}`,a)]),contents:new p.m(`File Contents: ${n.readUTF8()}`,i)}}(e,t)));return{table:new p.m("File Table",e,n.map((e=>e.entry))),contents:new p.m("File Contents",e,n.map((e=>e.contents)))}}(e.bytes(n.readUIntLE(),r.readUIntLE()),e);return new p.m("Quake PAK",e,[new p.m(`Magic: ${t.readUTF8()}`,t),new p.m(`File Table Offset: ${n.readUIntLE()}`,n),new p.m(`File Table Size: ${r.readUIntLE()}`,r),a.table,a.contents])}}),document.getElementById("root"))}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var i=n[e]={exports:{}};return t[e].call(i.exports,i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,n,a,i)=>{if(!n){var o=1/0;for(c=0;c<e.length;c++){for(var[n,a,i]=e[c],l=!0,s=0;s<n.length;s++)(!1&i||o>=i)&&Object.keys(r.O).every((e=>r.O[e](n[s])))?n.splice(s--,1):(l=!1,i<o&&(o=i));if(l){e.splice(c--,1);var d=a();void 0!==d&&(t=d)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[n,a,i]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={389:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var a,i,[o,l,s]=n,d=0;for(a in l)r.o(l,a)&&(r.m[a]=l[a]);if(s)var c=s(r);for(t&&t(n);d<o.length;d++)i=o[d],r.o(e,i)&&e[i]&&e[i][0](),e[o[d]]=0;return r.O(c)},n=self.webpackChunkbinary_inspectors=self.webpackChunkbinary_inspectors||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=r.O(void 0,[763,850],(()=>r(6459)));a=r.O(a)})();