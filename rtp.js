(()=>{"use strict";var e,t={3488:(e,t,r)=>{function n(e){return new Uint8Array(e.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer}function a(e){let t="",r=new Uint8Array(e);for(let e of r)t+=String.fromCharCode(e);return window.btoa(t)}function s(e){let t=window.atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return r.buffer}function o(e){return e.split(/\r?\n/g)}function i(e,t=10){return e.byteLength>t?(e=e.bytes(0,t)).toHex()+"...":e.toHex()}r.d(t,{aS:()=>n,sM:()=>a,RG:()=>s,uq:()=>o,QV:()=>i})},9601:(e,t,r)=>{var n=r(1977),a=r(2711),s=r(4960),o=r(7294),i=r.n(o),l=r(3935),d=r(806),m=r(5327),u=r(3855),c=r(2122),f=r(9756),b=r(4184),B=r.n(b),p=r(6792),y=r(4873),w=i().forwardRef((function(e,t){var r=e.bsPrefix,n=e.variant,a=e.size,s=e.active,o=e.className,l=e.block,d=e.type,m=e.as,u=(0,f.Z)(e,["bsPrefix","variant","size","active","className","block","type","as"]),b=(0,p.vE)(r,"btn"),w=B()(o,b,s&&"active",b+"-"+n,l&&b+"-block",a&&b+"-"+a);if(u.href)return i().createElement(y.Z,(0,c.Z)({},u,{as:m,ref:t,className:B()(w,u.disabled&&"disabled")}));t&&(u.ref=t),m||(u.type=d);var E=m||"button";return i().createElement(E,(0,c.Z)({},u,{className:w}))}));w.displayName="Button",w.defaultProps={variant:"primary",active:!1,disabled:!1,type:"button"};const E=w;var h,I,$=r(4536),P=r(4051),U=r(1555),L=r(5114);function g(e){switch(e){case I.NB:return 8e3;case I.MB:return 12e3;case I.WB:return 16e3;case I.SWB:return 24e3;case I.FB:return 48e3}}function v(e){switch(e){case I.NB:return 4e3;case I.MB:return 6e3;case I.WB:return 8e3;case I.SWB:return 12e3;case I.FB:return 2e4}}!function(e){e.SILK_ONLY="SILK-only",e.HYBRID="Hybrid",e.CELT_ONLY="CELT-only"}(h||(h={})),function(e){e.NB="NB",e.MB="MB",e.WB="WB",e.SWB="SWB",e.FB="FB"}(I||(I={}));const N=[10,20,40,60],R=[10,20],C=[2.5,5,10,20];function F(e,t,r){let n=t/function(e){switch(e){case 10:return 10;case 20:case 40:case 60:return 20;default:throw new Error(`Unexpected Opus frame size ${e}.`)}}(t),s=r?2:1,o=r?["Mid","Side"]:["Mono"],i=[],l=e.bits(0);for(let e=0;e<s;++e){for(let t=0;t<n;++t){let r=l.bits(0,1);l=l.bits(1),i.push(new a.m(`${o[e]}, Frame ${t+1}, VAD Flag: ${r.readBool()}`,r))}let t=l.bits(0,1);l=l.bits(1),i.push(new a.m(`${o[e]}, LBRR Flag: ${t.readBool()}`,t))}return new a.m(`SILK Frame (${n} SILK Frames)`,e,i)}function S(e,t,r,n){return t==h.SILK_ONLY?F(e,r,n):t==h.HYBRID?new a.m("Hybrid Frame",e,[F(e,r,n)]):new a.m(`Compressed Frame (${e.size()} bytes)`,e,[])}function O(e){let t=e.bytes(0,1).readUIntBE();return t<=251?[t,e.bytes(0,1)]:[4*e.bytes(1,1).readUIntBE()+t,e.bytes(0,2)]}function T(e,t,r,n,o){let i=[];try{if(0==e)i=[S(t,r,n,o)];else if(1==e)(0,s.assert)(t.size()%2==0,"In packing mode 2, the amount of bytes available for frames must be even."),i=[S(t.bytes(0,t.byteLength/2),r,n,o),S(t.bytes(t.byteLength/2),r,n,o)];else if(2==e)s.assert.fail("Packing mode 2 unimplemented.");else if(3==e){let e=t.bytes(0,1),l=e.bits(0,1),d=e.bits(1,1),m=e.bits(2,6);if(i.push(new a.m("Mode: "+(l.readBool()?"VBR":"CBR"),l)),i.push(new a.m(`Padding: ${d.readBool()}`,d)),i.push(new a.m(`Frame Count: ${m.readUIntBE()}`,m)),d.readBool()&&s.assert.fail("Frame padding not implemented."),l.readBool()){let e=[],s=t.bytes(1);for(let t=0;t<m.readUIntBE()-1;++t){let[t,r]=O(s);e.push([t,r]),s=s.bytes(r.size())}i.push(new a.m(`Frame Lengths: ${e.length}`,t.bytes(1,s.byteStart-e[0][1].byteStart),e.map((e=>new a.m(`${e[1].size()}-byte Frame Length: ${e[0]}`,e[1])))));for(let[t,a]of e){let e=s.bytes(0,t);i.push(S(e,r,n,o)),s=s.bytes(t)}let l=s;i.push(S(l,r,n,o))}else s.assert.fail("CBR mode not implemented.")}return new a.m("Compressed Frames",t,i)}catch(e){return new a.m(`Malformed Frames: ${e.message}`,t,i,e)}}var k,H;!function(e){e.BICUBIC="Bicubic",e.BILINEAR="Bilinear",e.NONE="None",e.OTHER="Other"}(k||(k={})),function(e){e.NORMAL="Normal",e.SIMPLE="Simple",e.NONE="None",e.OTHER="Other"}(H||(H={}));var M=r(3488),D=r(7343);new Map;const x=[{name:"Opus (RFC 7587)",id:"opus",inspect:function(e){s.assert.isAtLeast(e.size(),1,"Opus packet must be at least one byte.");let t=e.bytes(0,1),r=t.bits(0,5),n=t.bits(5,1),o=t.bits(6,2),[i,[l,d,m]]=function(e){let[t,r,n]=function(e){if(e<=3)return[h.SILK_ONLY,I.NB,N[e]];if(e<=7)return[h.SILK_ONLY,I.MB,N[e-4]];if(e<=11)return[h.SILK_ONLY,I.WB,N[e-8]];if(e<=13)return[h.HYBRID,I.SWB,R[e-12]];if(e<=15)return[h.HYBRID,I.FB,R[e-14]];if(e<=19)return[h.CELT_ONLY,I.NB,C[e-16]];if(e<=23)return[h.CELT_ONLY,I.WB,C[e-20]];if(e<=27)return[h.CELT_ONLY,I.SWB,C[e-24]];if(e<=31)return[h.CELT_ONLY,I.FB,C[e-28]];throw new Error(`Unknown config ${e}.`)}(e.readUIntBE());return[new a.m(`Config: ${e.readUIntBE()} (${t}, ${r}, ${n}ms)`,e,[new a.m(`Mode: ${t}`,e),new a.m(`Bandwidth: ${r} (${v(r)}Hz), Sample Rate: ${g(r)}Hz`,e),new a.m(`Frame Size: ${n}ms`,e)]),[t,r,n]]}(r);return new a.m("Opus Packet",e,[i,new a.m("Channels: "+(n.readBool()?"Stereo":"Mono"),n),new a.m(`Frame Packing Mode: ${o.readUIntBE()} (${["1 Frame","2 Frame, Equal Size","2 Frames, Different Size","Arbitrary Frames"][o.readUIntBE()]})`,o),T(o.readUIntBE(),e.bytes(1),l,m,n.readBool())])},defaultPT:111},{name:"RED (RFC 2198)",id:"red",inspect:function(e,t){let r=[],n=[],s=[],o=e;for(;;){let e=o.bits(0,1),t=o.bits(1,7);if(!e.readBool()){let e=o.bits(0,1),t=o.bits(1,7);r.push(new a.m("Block Header (Primary Encoding)",o.bytes(0,1),[new a.m(`F: ${e.readBool()}`,e),new a.m(`Payload Type: ${t.readUIntBE()}`,t)])),n.push(t.readUIntBE()),o=o.bytes(1);break}{let i=o.bits(8,14),l=o.bits(22,10);r.push(new a.m("Block Header",o,[new a.m(`F: ${e.readBool()}`,e),new a.m(`Payload Type: ${t.readUIntBE()}`,t),new a.m(`Timestamp Offset: ${i.readUIntBE()}`,i),new a.m(`Block Length: ${l.readUIntBE()} bytes`,l)])),n.push(t.readUIntBE()),s.push(l.readUIntBE()),o=o.bytes(4)}}for(let e of n){if(s.length>0)throw new Error("Unimplemented.");if(t.has(e)){let n=t.get(e),s=n.inspect(o,t);r.push(new a.m(`Payload: ${n.name}`,o,[s]))}else r.push(new a.m(`Payload: ${M.QV(o)}`,o))}return new a.m("Red Packet",e,r)},defaultPT:108},{name:"VP8 (RFC 7741)",id:"vp8",inspect:function(e){let t=e,r=t.bits(0,1),n=(t.bits(1,1),t.bits(2,1)),s=t.bits(3,1),o=(t.bits(4,1),t.bits(5,3));t=t.bytes(1);let i=[new a.m(`X (Extended Control Bits): ${r.readBool()}`,r),new a.m(`N (Non-reference Frame): ${n.readBool()}`,n),new a.m(`S (Start of Partition): ${s.readBool()}`,s),new a.m(`PID (Partition Index): ${o.readUIntBE()}`,o)];if(r.readBool()){let e=t.bits(0,1),r=t.bits(1,1),n=t.bits(2,1),s=t.bits(3,1);if(t.bits(4,4),t=t.bytes(1),i.push(new a.m(`I (PictureID present): ${e.readBool()}`,e),new a.m(`L (TL0PICIDX present): ${r.readBool()}`,r),new a.m(`T (TID present): ${n.readBool()}`,n),new a.m(`K (KEYIDX present): ${s.readBool()}`,s)),e.readBool()){let e=t.bits(0,1),r=null;e.readBool()?(r=t.bits(1,15),t=t.bytes(2)):(r=t.bits(1,7),t=t.bytes(1)),i.push(new a.m(`M: ${e.readBool()}`,e),new a.m(`PictureID: ${r.readUIntBE()}`,r))}if(r.readBool()){let e=t.bytes(0,1);t=t.bytes(1),i.push(new a.m(`TL0PICIDX: ${e.readUIntBE()}`,e))}if(n.readBool()||s.readBool()){let e=t.bits(0,2),r=t.bits(2,1),n=t.bits(3,5);t=t.bytes(1),i.push(new a.m(`TID: ${e.readUIntBE()}`,e),new a.m(`Y: ${r.readBool()}`,r),new a.m(`KEYIDX: ${n.readUIntBE()}`,n))}}if(s.readBool()&&0===o.readUIntBE()){let e=t.bits(7,1),r=t.bits(4,3),n=t.bits(3,1);i.push(new a.m(`P: ${e.readBool()} (${e.readBool()?"Interframe":"Key frame"})`,e),new a.m(`VER: ${r.readUIntBE()} (${function(e){switch(e){case 0:return[k.BICUBIC,H.NORMAL];case 1:return[k.BILINEAR,H.SIMPLE];case 2:return[k.BILINEAR,H.NONE];case 3:return[k.NONE,H.NONE];default:return[k.OTHER,H.OTHER]}}(r.readUIntBE())})`,r),new a.m(`H: ${n.readBool()} (${n.readBool()?"Shown Frame":"Hidden Frame"})`,n))}return new a.m("VP8 RTP Payload",e,i)},defaultPT:96},{name:"ULPFEC (RFC 5109)",id:"ulpfec",inspect:function(e){let t=e.bits(0,1),r=e.bits(1,1),n=e.bits(2,1),s=e.bits(3,1),o=e.bits(4,4),i=e.bits(8,1),l=e.bits(9,7),d=e.bytes(2,2),m=e.bytes(4,4),u=e.bytes(8,2);if(r.readBool())throw new Error("Long mask unimplemented.");let c=function(e){let t=[],r=e,n=0;for(;r.size()>0;){let e=r.bytes(0,2),s=r.bytes(2,2);t.push(new a.m(`FEC Level ${n} Header`,r.bytes(0,4),[new a.m(`Protection Length: ${e.readUIntBE()}`,e),new a.m(`Mask: ${s.toHex()}`,s)])),r=r.bytes(4);let o=e.readUIntBE();t.push(new a.m(`FEC Level ${n} Payload`,r.bytes(0,o))),r=r.bytes(o),n++}return new a.m("FEC Levels",e,t)}(e.bytes(10));return new a.m("ULPFEC Packet",e,[new a.m(`E: ${t.readBool()}`,t),new a.m(`L: ${r.readBool()}`,r),new a.m(`P: ${n.readBool()}`,n),new a.m(`X: ${s.readBool()}`,s),new a.m(`CC: ${o.readUIntBE()}`,o),new a.m(`M: ${i.readBool()}`,i),new a.m(`PT: ${l.readUIntBE()}`,l),new a.m(`SN Base: ${d.readUIntBE()}`,d),new a.m(`TS Recovery: ${m.readUIntBE()}`,m),new a.m(`Length Recovery: ${u.readUIntBE()}`,u),c])},defaultPT:124}];function Y(e,t){let r=e,n=e.bits(0,2),o=e.bits(2,1),i=e.bits(3,1),l=e.bits(4,4),d=e.bits(8,1),m=e.bits(9,7),u=e.bytes(2,2),c=e.bytes(4,4),f=e.bytes(8,4),b=[new a.m(`Version: ${n.readUIntBE()}`,n),new a.m(`Padding: ${o.readBool()}`,o),new a.m(`Extension: ${i.readBool()}`,i),new a.m(`CSRC count: ${l.readUIntBE()}`,l),new a.m(`Marker: ${d.readBool()}`,d),new a.m(`Payload Type: ${m.readUIntBE()}`,m),new a.m(`Sequence Number: ${u.readUIntBE()}`,u),new a.m(`Timestamp: ${c.readUIntBE()}`,c),new a.m(`SSRC: ${f.readUIntBE()}`,f)];if((o.readBool()||l.readUIntBE()>0)&&s.assert.fail("Unimplemented."),e=e.bytes(12),i.readBool()){let t=e.bytes(0,2),r=e.bytes(2,2),n=4*r.readUIntBE(),s=e.bytes(4,n);b.push(new a.m(`Defined By Profile: 0x${t.toHex()}`,t)),b.push(new a.m(`Header Length: ${r.readUIntBE()} (${n} bytes)`,r)),48862==t.readUIntBE()?b.push(function(e){let t=[],r=e;for(;r.size()>0;){let e=r.bytes(0,1);if(0==e.readUIntBE()){r=r.bytes(1);continue}let n=e.bits(0,4),s=e.bits(4,4);console.log(n.readUIntBE()),console.log(s.readUIntBE());let o=s.readUIntBE()+1,i=r.bytes(1,o);t.push(new a.m("Header",r.bytes(0,1+o),[new a.m(`ID: ${n.readUIntBE()}`,n),new a.m(`Length: ${s.readUIntBE()} (${o} bytes)`,s),new a.m(`Data: ${i.toHex()}`,i)])),r=r.bytes(1+o)}return new a.m("Headers",e,t)}(s)):b.push(new a.m(`Header Data: ${s.toHex()}`,s)),e=e.bytes(4+n)}let B=m.readUIntBE(),p=e;if(t.has(B)){let e=t.get(B),r=e.inspect(p,t);b.push(new a.m(`Payload: ${e.name}`,p,[r]))}else b.push(new a.m(`Payload: ${M.QV(p)}`,p));return new a.m("RTP Packet",r,b)}class z extends o.Component{constructor(e){super(e),this.payloadTypeRef=o.createRef(),this.payloadParserRef=o.createRef();let t=new Map;for(let e of x)t.set(e.defaultPT,e);this.state={kind:"noData",payloadParsers:t}}componentDidMount(){if(D.e$("data")){let e=D.U2("data"),t=M.RG(e);this.loadBuffer(t)}}loadBuffer(e){D.t8("data",M.sM(e));let t=new n.a(e,0,e.byteLength);try{let e=Y(t,this.state.payloadParsers);this.setState({kind:"decodeSuccess",data:t,tree:e,payloadParsers:this.state.payloadParsers})}catch(e){this.setState({kind:"decodeFailure",data:t,error:e,payloadParsers:this.state.payloadParsers})}}render(){return o.createElement(o.Fragment,null,o.createElement("h2",null,"RTP Packet"),o.createElement(d.Y,{inputName:"input",defaultBase64:D.U2("data"),onBuffer:e=>this.loadBuffer(e)}),o.createElement("h2",null,"Payload Type Mappings"),Array.from(this.state.payloadParsers.entries()).map((([e,t])=>o.createElement("div",null,e," -> ",t.name))),o.createElement($.Z,null,o.createElement($.Z.Group,{controlId:"masterKey"},o.createElement($.Z.Control,{type:"number",placeholder:"Enter the payload type number.",ref:this.payloadTypeRef}),o.createElement($.Z.Control,{as:"select",ref:this.payloadParserRef},x.map(((e,t)=>o.createElement("option",{value:t},e.name)))),o.createElement(E,{variant:"primary",onClick:()=>{this.setState((e=>{if(this.payloadTypeRef.current.value){let t=parseInt(this.payloadTypeRef.current.value,10),r=x[parseInt(this.payloadParserRef.current.value)];e.payloadParsers.set(t,r)}return e}))}},"Set Mapping"))),"decodeSuccess"==this.state.kind&&o.createElement(u.W,{tree:this.state.tree,data:this.state.data}),"decodeFailure"==this.state.kind&&o.createElement(P.Z,null,o.createElement(U.Z,{md:6},o.createElement(L.Z,{variant:"danger"},o.createElement(L.Z.Heading,null,this.state.error.toString()),o.createElement("code",null,o.createElement("pre",null,this.state.error.stack)))),o.createElement(U.Z,{md:6},o.createElement(m.V,{data:this.state.data}))),"noData"==this.state.kind&&o.createElement("div",null,"No data provided yet."))}}l.render(o.createElement(z,null),document.getElementById("root"))}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var s=r[e]={exports:{}};return t[e].call(s.exports,s,s.exports,n),s.exports}n.m=t,e=[],n.O=(t,r,a,s)=>{if(!r){var o=1/0;for(m=0;m<e.length;m++){for(var[r,a,s]=e[m],i=!0,l=0;l<r.length;l++)(!1&s||o>=s)&&Object.keys(n.O).every((e=>n.O[e](r[l])))?r.splice(l--,1):(i=!1,s<o&&(o=s));if(i){e.splice(m--,1);var d=a();void 0!==d&&(t=d)}}return t}s=s||0;for(var m=e.length;m>0&&e[m-1][2]>s;m--)e[m]=e[m-1];e[m]=[r,a,s]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={571:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,s,[o,i,l]=r,d=0;for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(l)var m=l(n);for(t&&t(r);d<o.length;d++)s=o[d],n.o(e,s)&&e[s]&&e[s][0](),e[o[d]]=0;return n.O(m)},r=self.webpackChunkbinary_inspectors=self.webpackChunkbinary_inspectors||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[763,850],(()=>n(9601)));a=n.O(a)})();