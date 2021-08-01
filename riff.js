(()=>{"use strict";var e,t={3488:(e,t,r)=>{function n(e){return new Uint8Array(e.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer}function a(e){let t="",r=new Uint8Array(e);for(let e of r)t+=String.fromCharCode(e);return window.btoa(t)}function o(e){let t=window.atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return r.buffer}function s(e){return e.split(/\r?\n/g)}function i(e,t=10){return e.byteLength>t?(e=e.bytes(0,t)).toHex()+"...":e.toHex()}r.d(t,{aS:()=>n,sM:()=>a,RG:()=>o,uq:()=>s,QV:()=>i})},7079:(e,t,r)=>{var n=r(7294),a=r(3935),o=r(1977),s=r(4051),i=r(1555),l=r(5114),u=r(3488),c=r(806),d=r(3855),f=r(5327),h=r(7343);class p extends n.Component{constructor(e){super(e),this.state={kind:"noData"}}componentDidMount(){if(h.e$("data")){let e=h.U2("data"),t=u.RG(e);this.loadBuffer(t)}}loadBuffer(e){h.t8("data",u.sM(e));let t=new o.a(e,0,e.byteLength);try{let e=this.props.inspect(t);this.setState({kind:"decodeSuccess",data:t,tree:e})}catch(e){this.setState({kind:"decodeFailure",data:t,error:e})}}render(){return n.createElement(n.Fragment,null,n.createElement(c.Y,{inputName:"input",defaultBase64:h.U2("data"),onBuffer:e=>this.loadBuffer(e)}),"decodeSuccess"==this.state.kind&&n.createElement(d.W,{tree:this.state.tree,data:this.state.data}),"decodeFailure"==this.state.kind&&n.createElement(s.Z,null,n.createElement(i.Z,null,n.createElement(l.Z,{variant:"danger"},n.createElement(l.Z.Heading,null,this.state.error.toString()),n.createElement("code",null,n.createElement("pre",null,this.state.error.stack)))),n.createElement(i.Z,null,n.createElement(f.V,{data:this.state.data}))),"noData"==this.state.kind&&n.createElement("div",null,"No data provided yet."))}}var m=r(2711);const b=new Map;function y(e){let t=[],r=e;for(;r.byteLength>0;){let[e,n]=w(r);t.push(n),r=r.bytes(e.size())}return t}function w(e){let t=e.bytes(0,4),r=e.bytes(4,4),n=r.readUIntLE(),a=e.bytes(8,n),o=b.get(t.readUTF8()),s=o?o.name:"Unknown Chunk",i=o?o.parser(a):[new m.m(`Data: ${(0,u.QV)(a)}`,a)],l=n%2==0?0:1,c=e.bytes(0,8+n+l);return[c,new m.m(s,c,[new m.m(`Chunk Type: ${t.readUTF8()}`,t),new m.m(`Chunk Size: ${r.readUIntLE()}`,r)].concat(i))]}b.set("RIFF",{name:"RIFF Chunk",parser:e=>{let t=e.bytes(0,4),r=y(e.bytes(4));return[new m.m(`Form Type: ${t.readUTF8()}`,t)].concat(r)}}),b.set("LIST",{name:"LIST Chunk",parser:e=>{let t=e.bytes(0,4),r=y(e.bytes(4));return[new m.m(`Form Type: ${t.readUTF8()}`,t)].concat(r)}}),a.render(n.createElement(p,{inspect:function(e){return w(e)[1]}}),document.getElementById("root"))}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var o=r[e]={exports:{}};return t[e].call(o.exports,o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,r,a,o)=>{if(!r){var s=1/0;for(c=0;c<e.length;c++){for(var[r,a,o]=e[c],i=!0,l=0;l<r.length;l++)(!1&o||s>=o)&&Object.keys(n.O).every((e=>n.O[e](r[l])))?r.splice(l--,1):(i=!1,o<s&&(s=o));if(i){e.splice(c--,1);var u=a();void 0!==u&&(t=u)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[r,a,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={800:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,o,[s,i,l]=r,u=0;for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(l)var c=l(n);for(t&&t(r);u<s.length;u++)o=s[u],n.o(e,o)&&e[o]&&e[o][0](),e[s[u]]=0;return n.O(c)},r=self.webpackChunkbinary_inspectors=self.webpackChunkbinary_inspectors||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[763,850],(()=>n(7079)));a=n.O(a)})();