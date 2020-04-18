!function(e){function t(t){for(var n,o,i=t[0],l=t[1],c=t[2],d=0,h=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&h.push(a[o][0]),a[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(u&&u(t);h.length;)h.shift()();return s.push.apply(s,c||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,i=1;i<r.length;i++){var l=r[i];0!==a[l]&&(n=!1)}n&&(s.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},a={5:0},s=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var i=window.webpackJsonp=window.webpackJsonp||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=l;s.push([107,0]),r()}({1:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));class n{constructor(e,t,r=[],n){this.label=e,this.range=t,this.children=r,this.error=n}}},107:function(e,t,r){"use strict";r.r(t);var n=r(8),a=r(1),s=r(10),o=r(0),i=r.n(o),l=r(19),c=r(16),u=r(12),d=r(17),h=r(6),f=r(2),p=r(3),b=r(4),y=r.n(b),m=r(5),B=r(33),w=i.a.forwardRef((function(e,t){var r=e.bsPrefix,n=e.variant,a=e.size,s=e.active,o=e.className,l=e.block,c=e.type,u=e.as,d=Object(p.a)(e,["bsPrefix","variant","size","active","className","block","type","as"]),h=Object(m.a)(r,"btn"),b=y()(o,h,s&&"active",h+"-"+n,l&&h+"-block",a&&h+"-"+a);if(d.href)return i.a.createElement(B.a,Object(f.a)({},d,{as:u,ref:t,className:y()(b,d.disabled&&"disabled")}));t&&(d.ref=t),u||(d.type=c);var w=u||"button";return i.a.createElement(w,Object(f.a)({},d,{className:b}))}));w.displayName="Button",w.defaultProps={variant:"primary",active:!1,disabled:!1,type:"button"};var E=w,g=r(37),S=r(23),v=r(25),I=r(35);var L=r(9),$=r(7);new Map;const U=[{name:"Opus (RFC 7587)",id:"opus",inspect:I.a,defaultPT:111},{name:"RED (RFC 2198)",id:"red",inspect:function(e){let t=[],r=e;for(;;){let e=r.bits(0,1),n=r.bits(1,7);if(!e.readBool()){let e=r.bits(0,1),n=r.bits(1,7);t.push(new a.a("Block (Primary Encoding)",r,[new a.a(`F: ${e.readBool()}`,e),new a.a(`Payload Type: ${n.readUIntBE()}`,n)]));break}{let s=r.bits(8,14),o=r.bits(22,10);t.push(new a.a("Block",r,[new a.a(`F: ${e.readBool()}`,e),new a.a(`Payload Type: ${n.readUIntBE()}`,n),new a.a(`Timestamp Offset: ${s.readUIntBE()}`,s),new a.a(`Block Length: ${o.readUIntBE()} bytes`,o)])),r=r.bytes(4)}}return new a.a("Red Packet",e,t)},defaultPT:108}];function P(e,t){let r=e,n=e.bits(0,2),o=e.bits(2,1),i=e.bits(3,1),l=e.bits(4,4),c=e.bits(8,1),u=e.bits(9,7),d=e.bytes(2,2),h=e.bytes(4,4),f=e.bytes(8,4),p=[new a.a(`Version: ${n.readUIntBE()}`,n),new a.a(`Padding: ${o.readBool()}`,o),new a.a(`Extension: ${i.readBool()}`,i),new a.a(`CSRC count: ${l.readUIntBE()}`,l),new a.a(`Marker: ${c.readBool()}`,c),new a.a(`Payload Type: ${u.readUIntBE()}`,u),new a.a(`Sequence Number: ${d.readUIntBE()}`,d),new a.a(`Timestamp: ${h.readUIntBE()}`,h),new a.a(`SSRC: ${f.readUIntBE()}`,f)];if((o.readBool()||l.readUIntBE()>0)&&s.assert.fail("Unimplemented."),e=e.bytes(12),i.readBool()){let t=e.bytes(0,2),r=e.bytes(2,2),n=4*r.readUIntBE(),s=e.bytes(4,n);p.push(new a.a(`Defined By Profile: 0x${t.toHex()}`,t)),p.push(new a.a(`Header Length: ${r.readUIntBE()} (${n} bytes)`,r)),48862==t.readUIntBE()?p.push(function(e){let t=[],r=e;for(;r.size()>0;){let e=r.bytes(0,1);if(0==e.readUIntBE()){r=r.bytes(1);continue}let n=e.bits(0,4),s=e.bits(4,4);console.log(n.readUIntBE()),console.log(s.readUIntBE());let o=s.readUIntBE()+1,i=r.bytes(1,o);t.push(new a.a("Header",r.bytes(0,1+o),[new a.a(`ID: ${n.readUIntBE()}`,n),new a.a(`Length: ${s.readUIntBE()} (${o} bytes)`,s),new a.a(`Data: ${i.toHex()}`,i)])),r=r.bytes(1+o)}return new a.a("Headers",e,t)}(s)):p.push(new a.a(`Header Data: ${s.toHex()}`,s)),e=e.bytes(4+n)}let b=u.readUIntBE(),y=e;if(t.has(b)){let e=t.get(b),r=e.inspect(y,t);p.push(new a.a(`Payload: ${e.name}`,y,[r]))}else p.push(new a.a(`Payload: ${y.toHex()}`,y));return new a.a("RTP Packet",r,p)}class k extends o.Component{constructor(e){super(e),this.payloadTypeRef=o.createRef(),this.payloadParserRef=o.createRef();let t=new Map;for(let e of U)t.set(e.defaultPT,e);this.state={kind:"noData",payloadParsers:t}}componentDidMount(){if(L.b("data")){let e=L.a("data"),t=$.b(e);this.loadBuffer(t)}}loadBuffer(e){L.c("data",$.a(e));let t=new n.b(e,0,e.byteLength);try{let e=P(t,this.state.payloadParsers);this.setState({kind:"decodeSuccess",data:t,tree:e,payloadParsers:this.state.payloadParsers})}catch(e){this.setState({kind:"decodeFailure",data:t,error:e,payloadParsers:this.state.payloadParsers})}}render(){return o.createElement(o.Fragment,null,o.createElement("h2",null,"RTP Packet"),o.createElement(c.a,{inputName:"input",defaultBase64:L.a("data"),onBuffer:e=>this.loadBuffer(e)}),o.createElement("h2",null,"Payload Type Mappings"),Array.from(this.state.payloadParsers.entries()).map(([e,t])=>o.createElement("div",null,e," -> ",t.name)),o.createElement(h.a,null,o.createElement(h.a.Group,{controlId:"masterKey"},o.createElement(h.a.Control,{type:"number",placeholder:"Enter the payload type number.",ref:this.payloadTypeRef}),o.createElement(h.a.Control,{as:"select",ref:this.payloadParserRef},U.map((e,t)=>o.createElement("option",{value:t},e.name))),o.createElement(E,{variant:"primary",onClick:()=>{this.setState(e=>{if(this.payloadTypeRef.current.value){let t=parseInt(this.payloadTypeRef.current.value,10),r=U[parseInt(this.payloadParserRef.current.value)];e.payloadParsers.set(t,r)}return e})}},"Set Mapping"))),"decodeSuccess"==this.state.kind&&o.createElement(d.a,{tree:this.state.tree,data:this.state.data}),"decodeFailure"==this.state.kind&&o.createElement(g.a,null,o.createElement(S.a,{md:6},o.createElement(v.a,{variant:"danger"},o.createElement(v.a.Heading,null,this.state.error.toString()),o.createElement("code",null,o.createElement("pre",null,this.state.error.stack)))),o.createElement(S.a,{md:6},o.createElement(u.a,{data:this.state.data}))),"noData"==this.state.kind&&o.createElement("div",null,"No data provided yet."))}}l.render(o.createElement(k,null),document.getElementById("root"))},12:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(0),a=r(8);class s extends n.Component{constructor(e){super(e)}render(){let e=this.props.data;return n.createElement("div",{style:{fontFamily:"monospace"}},e.chunks(16).map((e,t)=>n.createElement("div",{key:t},e.chunks(8).map((e,t)=>n.createElement("span",{style:{paddingRight:"10px"},key:t},e.chunks(1).map((e,t)=>{let r=!1;return this.props.selected&&(this.props.selected instanceof a.b?r=this.props.selected.contains(e):this.props.selected instanceof a.a&&(r=this.props.selected.enclosingByteRange().contains(e))),n.createElement("span",{style:{paddingRight:"5px",backgroundColor:r?"#dedede":""},key:t},e.toHex())}))))))}}},16:function(e,t,r){"use strict";r.d(t,"a",(function(){return d}));var n=r(0),a=r(34),s=r(13),o=r(6),i=r(14),l=r(7),c=r(22),u=function(e,t,r,n){return new(r||(r=Promise))((function(a,s){function o(e){try{l(n.next(e))}catch(e){s(e)}}function i(e){try{l(n.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}l((n=n.apply(e,t||[])).next())}))};class d extends n.Component{constructor(e){super(e)}render(){return n.createElement(a.a,{defaultActiveKey:this.props.defaultBase64?"base64":"hex",id:"binary-input-tabs"},n.createElement(s.a,{eventKey:"hex",title:"Hex"},n.createElement(o.a,null,n.createElement(o.a.Group,{controlId:"exampleForm.ControlTextarea1"},n.createElement(o.a.Control,{as:"textarea",rows:"3",onChange:e=>{let t=e.target.value.trim(),r=l.c(t);this.props.onBuffer(r)}})))),n.createElement(s.a,{eventKey:"base64",title:"Base64"},n.createElement(o.a,null,n.createElement(o.a.Group,{controlId:"exampleForm.ControlTextarea1"},n.createElement(o.a.Control,{as:"textarea",rows:"3",onChange:e=>{let t=e.target.value.trim(),r=l.b(t);this.props.onBuffer(r)},defaultValue:this.props.defaultBase64})))),n.createElement(s.a,{eventKey:"file",title:"File"},n.createElement(o.a,null,n.createElement(c.a,{onDrop:e=>u(this,void 0,void 0,(function*(){let t=e[0],r=yield t.arrayBuffer();this.props.onBuffer(r)}))},({getRootProps:e,getInputProps:t})=>n.createElement("div",Object.assign({},e()),n.createElement(i.a,{className:"text-center"},n.createElement(i.a.Body,null,n.createElement(i.a.Text,null,"Drag and drop file here, or click to browse."),n.createElement("input",Object.assign({},t())))))))))}}},17:function(e,t,r){"use strict";var n=r(0),a=r(37),s=r(23),o=r(12);class i extends n.Component{constructor(e){super(e),this.state={selected:null}}render(){let e=this.props.tree,t=this.props.depth||0,r="";return e.error&&(r="#ff6e6e"),this.props.selected==e&&(r="#dedede"),e.children.length>0?n.createElement("details",{style:{wordWrap:"break-word",backgroundColor:r,paddingLeft:"5px"},open:t<=1},n.createElement("summary",{onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},e.label),e.children.map((e,r)=>n.createElement("div",{key:r,style:{paddingLeft:"15px"}},n.createElement(i,{tree:e,depth:t+1,onSelect:this.props.onSelect,selected:this.props.selected})))):n.createElement("div",{style:{backgroundColor:r,paddingLeft:"5px"},onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},e.label)}}r.d(t,"a",(function(){return l}));class l extends n.Component{constructor(e){super(e),this.state={}}render(){return n.createElement(n.Fragment,null,n.createElement(a.a,null,n.createElement(s.a,{md:6},n.createElement(i,{tree:this.props.tree,selected:this.state.selected,onSelect:e=>this.setState({selected:e})})),n.createElement(s.a,{md:6},n.createElement(o.a,{data:this.props.data,selected:this.state.selected?this.state.selected.range:void 0}))))}}},35:function(e,t,r){"use strict";r.d(t,"a",(function(){return m}));var n,a,s=r(1),o=r(10);function i(e){switch(e){case a.NB:return 8e3;case a.MB:return 12e3;case a.WB:return 16e3;case a.SWB:return 24e3;case a.FB:return 48e3}}function l(e){switch(e){case a.NB:return 4e3;case a.MB:return 6e3;case a.WB:return 8e3;case a.SWB:return 12e3;case a.FB:return 2e4}}!function(e){e.SILK_ONLY="SILK-only",e.HYBRID="Hybrid",e.CELT_ONLY="CELT-only"}(n||(n={})),function(e){e.NB="NB",e.MB="MB",e.WB="WB",e.SWB="SWB",e.FB="FB"}(a||(a={}));const c=[10,20,40,60],u=[10,20],d=[2.5,5,10,20];function h(e){let[t,r,o]=function(e){if(e<=3)return[n.SILK_ONLY,a.NB,c[e]];if(e<=7)return[n.SILK_ONLY,a.MB,c[e-4]];if(e<=11)return[n.SILK_ONLY,a.WB,c[e-8]];if(e<=13)return[n.HYBRID,a.SWB,u[e-12]];if(e<=15)return[n.HYBRID,a.FB,u[e-14]];if(e<=19)return[n.CELT_ONLY,a.NB,d[e-16]];if(e<=23)return[n.CELT_ONLY,a.WB,d[e-20]];if(e<=27)return[n.CELT_ONLY,a.SWB,d[e-24]];if(e<=31)return[n.CELT_ONLY,a.FB,d[e-28]];throw new Error(`Unknown config ${e}.`)}(e.readUIntBE());return[new s.a(`Config: ${e.readUIntBE()} (${t}, ${r}, ${o}ms)`,e,[new s.a(`Mode: ${t}`,e),new s.a(`Bandwidth: ${r} (${l(r)}Hz), Sample Rate: ${i(r)}Hz`,e),new s.a(`Frame Size: ${o}ms`,e)]),[t,r,o]]}function f(e,t,r){let n=t/function(e){switch(e){case 10:return 10;case 20:case 40:case 60:return 20;default:throw new Error(`Unexpected Opus frame size ${e}.`)}}(t),a=r?2:1,o=r?["Mid","Side"]:["Mono"],i=[],l=e.bits(0);for(let e=0;e<a;++e){for(let t=0;t<n;++t){let t=l.bits(0,1);l=l.bits(1),i.push(new s.a(`${o[e]}, Frame ${e+1}, VAD Flag: ${t.readBool()}`,t))}let t=l.bits(0,1);l=l.bits(1),i.push(new s.a(`${o[e]}, LBRR Flag: ${t.readBool()}`,t))}return new s.a(`SILK Frame (${n} SILK Frames)`,e,i)}function p(e,t,r,a){return t==n.SILK_ONLY?f(e,r,a):new s.a(`Compressed Frame (${e.size()} bytes)`,e,[])}function b(e){let t=e.bytes(0,1).readUIntBE();if(t<=251)return[t,e.bytes(0,1)];return[4*e.bytes(1,1).readUIntBE()+t,e.bytes(0,2)]}function y(e,t,r,n,a){let i=[];try{if(0==e)i=[p(t,r,n,a)];else if(1==e)Object(o.assert)(t.size()%2==0,"In packing mode 2, the amount of bytes available for frames must be even."),i=[p(t.bytes(0,t.byteLength/2),r,n,a),p(t.bytes(t.byteLength/2),r,n,a)];else if(2==e)o.assert.fail("Packing mode 2 unimplemented.");else if(3==e){let e=t.bytes(0,1),l=e.bits(0,1),c=e.bits(1,1),u=e.bits(2,6);if(i.push(new s.a(`Mode: ${l.readBool()?"VBR":"CBR"}`,l)),i.push(new s.a(`Padding: ${c.readBool()}`,l)),i.push(new s.a(`Frame Count: ${u.readUIntBE()}`,l)),c.readBool()&&o.assert.fail("Frame padding not implemented."),l.readBool()){let o=[],l=t.bytes(1);for(let e=0;e<u.readUIntBE()-1;++e){let[e,t]=b(l);o.push([e,t]),l=l.bytes(t.size())}i.push(new s.a(`Frame Lengths: ${o.length}`,t.bytes(1,l.byteStart-e.byteStart),o.map(e=>new s.a(`${e[1].size()}-byte Frame Length: ${e[0]}`,e[1]))));for(let[e,t]of o){let t=l.bytes(0,e);i.push(p(t,r,n,a)),l=l.bytes(e)}let c=l;i.push(p(c,r,n,a))}else o.assert.fail("CBR mode not implemented.")}return new s.a("Compressed Frames",t,i)}catch(e){return new s.a(`Malformed Frames: ${e.message}`,t,i,e)}}function m(e){o.assert.isAtLeast(e.size(),1,"Opus packet must be at least one byte.");let t=e.bytes(0,1),r=t.bits(0,5),n=t.bits(5,1),a=t.bits(6,2),[i,[l,c,u]]=h(r);return new s.a("Opus Packet",e,[i,new s.a(`Channels: ${n.readBool()?"Stereo":"Mono"}`,n),new s.a(`Frame Packing Mode: ${a.readUIntBE()} (${["1 Frame","2 Frame, Equal Size","2 Frames, Different Size","Arbitrary Frames"][a.readUIntBE()]})`,a),y(a.readUIntBE(),e.bytes(1),l,u,n.readBool())])}},7:function(e,t,r){"use strict";function n(e){return new Uint8Array(e.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer}function a(e){let t="",r=new Uint8Array(e);for(let e of r)t+=String.fromCharCode(e);return window.btoa(t)}function s(e){let t=window.atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return r.buffer}r.d(t,"c",(function(){return n})),r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return s}))},8:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"a",(function(){return s}));var n=r(10);class a{constructor(e,t,r){this.buffer=e,this.byteStart=t,this.byteLength=r}size(){return this.byteLength}toDataView(){return new DataView(this.buffer,this.byteStart,this.byteLength)}toUint8Array(){return new Uint8Array(this.buffer,this.byteStart,this.byteLength)}readUTF8(){return(new TextDecoder).decode(this.toUint8Array())}toHex(){return Array.from(this.toUint8Array()).map(e=>e.toString(16).padStart(2,"0")).join("")}contains(e){return e.byteStart>=this.byteStart&&e.byteStart+e.byteLength<=this.byteStart+this.byteLength}bytes(e,t){if(null==t&&(t=this.byteLength-e),e<0)throw new Error(`byteStart is ${e}, but should be non-negative.`);if(e+t>this.byteLength)throw new Error("New subrange does not fit within current subrange.");return new a(this.buffer,this.byteStart+e,t)}bits(e,t){let r=8*this.byteStart+e;return null==t&&(t=8*this.byteLength-r),new s(this.buffer,r,t)}readBits(){let e=[],t=this.toUint8Array();for(;e.length<8*this.byteLength;){let r=t[Math.floor(e.length/8)],n=e.length%8;e.push(128==(r<<n&128))}return e}readUIntBE(){return this.bits(0,8*this.byteLength).readUIntBE()}readUIntLE(){let e=0,t=this.toUint8Array();for(let r=0;r<t.length;++r)e+=t[r]*Math.pow(2,8*r);return e}chunks(e){let t=[],r=0;for(;r<this.byteLength;)t.push(this.bytes(r,Math.min(e,this.byteLength-r))),r+=e;return t}}class s{constructor(e,t,r){this.buffer=e,this.bitStart=t,this.bitLength=r}enclosingByteRange(){let e=Math.floor(this.bitStart/8),t=Math.floor((this.bitStart+this.bitLength-1)/8)+1;return new a(this.buffer,e,t-e)}readBits(){let e=this.enclosingByteRange(),t=e.readBits(),r=this.bitStart-8*e.byteStart;return t.slice(r,r+this.bitLength)}readUIntBE(){let e=0,t=this.readBits();for(let r=0;r<t.length;++r)t[t.length-1-r]&&(e+=Math.pow(2,r));return e}readBool(){let e=this.readBits();return n.assert.equal(e.length,1),e[0]}bits(e,t){return null==t&&(t=this.bitLength-e),new s(this.buffer,this.bitStart+e,t)}}},9:function(e,t,r){"use strict";r.d(t,"c",(function(){return s})),r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return i}));const n=r(31),a=n.parse(window.location.hash);function s(e,t){a[e]=t;let r=n.stringify(a);r.length<=2e3?window.location.hash=r:window.location.hash=""}function o(e){return a[e]}function i(e){return!!a[e]}}});