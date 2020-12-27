!function(e){function t(t){for(var r,i,o=t[0],l=t[1],u=t[2],d=0,h=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&h.push(a[i][0]),a[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(c&&c(t);h.length;)h.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,o=1;o<n.length;o++){var l=n[o];0!==a[l]&&(r=!1)}r&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={3:0},s=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var c=l;s.push([113,0]),n()}({1:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));class r{constructor(e,t,n=[],r){this.label=e,this.range=t,this.children=n,this.error=r;for(let e of this.children)e.parent=this}isChildOf(e){let t=this;for(;void 0!==t;){if(t===e)return!0;t=t.parent}return!1}isParentOf(e){return e.isChildOf(this)}}},10:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(0),a=n(7);class s extends r.Component{constructor(e){super(e)}render(){let e=this.props.data;return e.byteLength>16e3?r.createElement("div",null,"File is too large for binary view."):r.createElement("div",{style:{fontFamily:"monospace"}},e.chunks(16).map((e,t)=>r.createElement("div",{key:t},e.chunks(8).map((e,t)=>r.createElement("span",{style:{paddingRight:"10px"},key:t},e.chunks(1).map((e,t)=>{let n=!1;return this.props.selected&&(this.props.selected instanceof a.b?n=this.props.selected.contains(e):this.props.selected instanceof a.a&&(n=this.props.selected.enclosingByteRange().contains(e))),r.createElement("span",{style:{paddingRight:"5px",backgroundColor:n?"#dedede":""},key:t},e.toHex())}))))))}}},113:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(20),s=n(19),i=n(1),o=n(31);class l{constructor(){this.state="pre-header"}inspectPage(e){if("pre-header"==this.state){this.state="pre-comments";let t=e.bytes(0,8),n=e.bytes(8,1),r=e.bytes(9,1),a=e.bytes(10,2),s=e.bytes(12,4),o=e.bytes(16,2),l=e.bytes(18,1);return new i.a("Opus Header",e,[new i.a(`Magic Signature: ${t.readUTF8()}`,t),new i.a(`Version: ${n.readUIntLE()}`,n),new i.a(`Channel Count: ${r.readUIntLE()}`,r),new i.a(`Pre-skip: ${a.readUIntLE()}`,a),new i.a(`Input Sample Rate: ${s.readUIntLE()}`,s),new i.a(`Output Gain: ${o.readUIntLE()}`,o),new i.a(`Mapping Family: ${l.readUIntLE()}`,l)])}if("pre-comments"===this.state){this.state="packets";let t=e.bytes(0,8);return new i.a("Comment Header",e,[new i.a(`Magic Signature: ${t.readUTF8()}`,t)])}return"packets"===this.state?o.a(e):new i.a("Unimplemented",e,[],new Error)}}class u{constructor(){this.state="pre-header"}inspectPage(e){if("pre-header"==this.state){this.state="pre-comments";let t=e.bytes(0,1),n=e.bytes(1,6),r=e.bytes(7,3),a=e.bytes(7,1),s=e.bytes(8,1),o=e.bytes(9,1),l=e.bytes(10,2),u=e.bytes(12,2),c=e.bytes(14,3),d=e.bytes(17,3),h=e.bytes(20,1),p=e.bytes(21,1),f=e.bytes(22,8),b=e.bytes(22,4),y=e.bytes(26,4),m=e.bytes(30,6),g=e.bytes(30,3),w=e.bytes(33,3),E=e.bytes(36,1),B=e.bytes(37,3),I=e.bytes(40,2),U=I.bits(0,6),L=I.bits(6,5),S=I.bits(11,2);I.bits(13,3);return new i.a("Theora Identification Header",e,[new i.a(`Header Type: ${t.toHex()}`,t),new i.a(`Header Magic: ${n.readUTF8()}`,n),new i.a(`Version: ${a.readUIntBE()}.${a.readUIntBE()}.${a.readUIntBE()}`,r,[new i.a(`Major Version: ${a.readUIntBE()}`,a),new i.a(`Minor Version: ${a.readUIntBE()}`,s),new i.a(`Revision Version: ${a.readUIntBE()}`,o)]),new i.a(`Frame Width (Macro Blocks): ${l.readUIntBE()}`,l),new i.a(`Frame Height (Macro Blocks): ${u.readUIntBE()}`,u),new i.a(`Picture Width (pixels): ${c.readUIntBE()}`,c),new i.a(`Picture Height (pixels): ${d.readUIntBE()}`,d),new i.a(`Picture Offset X (pixels): ${h.readUIntBE()}`,h),new i.a(`Picture Offset Y (pixels): ${p.readUIntBE()}`,p),new i.a(`Framerate: ${b.readUIntBE()/y.readUIntBE()}`,f,[new i.a(`Framerate Numerator: ${b.readUIntBE()}`,b),new i.a(`Framerate Denominator: ${y.readUIntBE()}`,y)]),new i.a(`Pixel Aspect Ratio: ${g.readUIntBE()/w.readUIntBE()}`,m,[new i.a(`Pixel Aspect Ratio Numerator: ${g.readUIntBE()}`,g),new i.a(`Pixel Aspect Ratio Denominator: ${w.readUIntBE()}`,w)]),new i.a(`Color Space: ${E.readUIntBE()}`,E),new i.a(`Nominal Bitrate: ${B.readUIntBE()}`,B),new i.a(`Quality Hint: ${U.readUIntBE()}`,U),new i.a(`Keyframe Granule Shift: ${L.readUIntBE()}`,L),new i.a(`Pixel Format: ${S.readUIntBE()}`,S)])}return new i.a("Unimplemented",e,[],new Error)}}function c(e,t){let n=t.bytes(0,4);if("OggS"!==n.readUTF8())throw new Error("Could not find magic page start header.");let r=t.bytes(4,1),a=t.bytes(5,1),s=t.bytes(6,8),o=t.bytes(14,4),c=t.bytes(18,4),d=t.bytes(22,4),h=t.bytes(26,1),p=[];for(let e=0;e<h.readUIntBE();++e)p.push(t.bytes(27+e,1));let f=t.bytes(0,27+h.readUIntBE()),b=p.reduce((e,t)=>e+t.readUIntBE(),0),y=t.bytes(0,f.size()+b),m=t.bytes(f.size(),b),g=[],w=t.bytes(f.size());for(let e=0;e<h.readUIntBE();++e){let t=p[e].readUIntBE(),n=w.bytes(0,t);g.push(new i.a("Segment",n)),w=w.bytes(t)}m.size()>=8&&"OpusHead"===m.bytes(0,8).readUTF8()?e.set(o.readUIntLE(),new l):m.size()>=7&&128===m.bytes(0,1).readUIntBE()&&"theora"===m.bytes(1,6).readUTF8()&&e.set(o.readUIntLE(),new u);let E=new i.a("Page Data",m);return e.has(o.readUIntLE())&&(E=e.get(o.readUIntLE()).inspectPage(m)),[y,new i.a("Ogg Page",y,[new i.a(`Magic Capture: ${n.readUTF8()}`,n),new i.a(`Version: ${r.readUIntBE()}`,r),new i.a(`Header Type: ${a.readUIntBE()}`,a),new i.a(`Granual Position: ${s.readUIntLE()}`,s),new i.a(`Serial Number: ${o.readUIntLE()}`,o),new i.a(`Sequence Number: ${c.readUIntLE()}`,c),new i.a(`Checksum: ${d.readUIntLE()}`,d),new i.a(`Number of Page Segments: ${h.readUIntBE()}`,h),new i.a("Lacing Values",t.bytes(27,h.readUIntBE()),p.map(e=>new i.a(`Lacing Value: ${e.readUIntBE()}`,e))),new i.a("Segments",t.bytes(f.size(),b),g),E])]}a.render(r.createElement(s.a,{inspect:function(e){let t=new Map,n=[],r=e;for(;r.byteLength>0;){let[e,a]=c(t,r);n.push(a),r=r.bytes(e.size())}return new i.a("Ogg Container",e,n)}}),document.getElementById("root"))},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var r=n(0),a=n(30),s=n(14),i=n(3),o=n(15),l=n(2),u=n(23),c=function(e,t,n,r){return new(n||(n=Promise))((function(a,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function o(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,o)}l((r=r.apply(e,t||[])).next())}))};class d extends r.Component{constructor(e){super(e),this.hexIgnoreFirstColumn=r.createRef(),this.hexInput=r.createRef()}onHexChange(){let e=this.hexInput.current.value.trim();if(this.hexIgnoreFirstColumn.current.checked){let t=l.e(e);t=t.map(e=>e.split(/\s+/g).slice(1).join(" ")),e=t.join("\n")}let t=l.d(e);this.props.onBuffer(t)}render(){return r.createElement(a.a,{defaultActiveKey:this.props.defaultBase64?"base64":"hex",id:"binary-input-tabs"},r.createElement(s.a,{eventKey:"hex",title:"Hex"},r.createElement(i.a,null,r.createElement(i.a.Group,{controlId:"exampleForm.ControlTextarea1"},r.createElement(i.a.Control,{as:"textarea",rows:"3",ref:this.hexInput,onChange:()=>this.onHexChange()}),r.createElement(i.a.Check,{ref:this.hexIgnoreFirstColumn,type:"checkbox",label:"Ignore First Column",onChange:()=>this.onHexChange()})))),r.createElement(s.a,{eventKey:"base64",title:"Base64"},r.createElement(i.a,null,r.createElement(i.a.Group,{controlId:"exampleForm.ControlTextarea1"},r.createElement(i.a.Control,{as:"textarea",rows:"3",onChange:e=>{let t=e.target.value.trim(),n=l.b(t);this.props.onBuffer(n)},defaultValue:this.props.defaultBase64})))),r.createElement(s.a,{eventKey:"file",title:"File"},r.createElement(i.a,null,r.createElement(u.a,{onDrop:e=>c(this,void 0,void 0,(function*(){let t=e[0],n=yield t.arrayBuffer();this.props.onBuffer(n)}))},({getRootProps:e,getInputProps:t})=>r.createElement("div",Object.assign({},e()),r.createElement(o.a,{className:"text-center"},r.createElement(o.a.Body,null,r.createElement(o.a.Text,null,"Drag and drop file here, or click to browse."),r.createElement("input",Object.assign({},t())))))))))}}},18:function(e,t,n){"use strict";var r=n(0),a=n(27),s=n(21),i=n(10),o=n(22),l=n(13);class u extends r.Component{constructor(e){super(e),this.state={open:this.props.depth<=1}}shouldComponentUpdate(e,t){if(this.props.tree!=e.tree)return!0;if(this.props.selected!=e.selected){let t=!!this.props.selected&&this.props.tree.isParentOf(this.props.selected),n=!!e.selected&&this.props.tree.isParentOf(e.selected);if(t||n)return!0}return this.state.open!==t.open}render(){let e=this.props.tree,t=this.props.depth||0,n="";return e.error&&(n="#ff6e6e"),this.props.selected==e&&(n="#dedede"),e.children.length>0?r.createElement("div",{style:{wordWrap:"break-word",backgroundColor:n,paddingLeft:"5px"}},r.createElement("div",{onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},r.createElement("span",{onClick:e=>{this.setState(e=>Object.assign(Object.assign({},e),{open:!e.open})),e.stopPropagation()},style:{paddingRight:"5px"}},r.createElement(o.a,{icon:this.state.open?l.a:l.b})),r.createElement("span",null,e.label)),this.state.open&&e.children.map((e,n)=>r.createElement("div",{key:n,style:{paddingLeft:"15px"}},r.createElement(u,{tree:e,depth:t+1,onSelect:this.props.onSelect,selected:this.props.selected})))):r.createElement("div",{style:{backgroundColor:n,paddingLeft:"5px"},onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},e.label)}}u.defaultProps={depth:0},n.d(t,"a",(function(){return c}));class c extends r.Component{constructor(e){super(e),this.state={}}render(){return r.createElement(r.Fragment,null,r.createElement(a.a,null,r.createElement(s.a,{md:6},r.createElement(u,{tree:this.props.tree,selected:this.state.selected,onSelect:e=>this.setState({selected:e})})),r.createElement(s.a,{md:6},r.createElement(i.a,{data:this.props.data,selected:this.state.selected?this.state.selected.range:void 0}))))}}},19:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var r=n(0),a=n(7),s=n(27),i=n(21),o=n(24),l=n(2),u=n(17),c=n(18),d=n(10),h=n(5);class p extends r.Component{constructor(e){super(e),this.state={kind:"noData"}}componentDidMount(){if(h.b("data")){let e=h.a("data"),t=l.b(e);this.loadBuffer(t)}}loadBuffer(e){h.c("data",l.a(e));let t=new a.b(e,0,e.byteLength);try{let e=this.props.inspect(t);this.setState({kind:"decodeSuccess",data:t,tree:e})}catch(e){this.setState({kind:"decodeFailure",data:t,error:e})}}render(){return r.createElement(r.Fragment,null,r.createElement(u.a,{inputName:"input",defaultBase64:h.a("data"),onBuffer:e=>this.loadBuffer(e)}),"decodeSuccess"==this.state.kind&&r.createElement(c.a,{tree:this.state.tree,data:this.state.data}),"decodeFailure"==this.state.kind&&r.createElement(s.a,null,r.createElement(i.a,null,r.createElement(o.a,{variant:"danger"},r.createElement(o.a.Heading,null,this.state.error.toString()),r.createElement("code",null,r.createElement("pre",null,this.state.error.stack)))),r.createElement(i.a,null,r.createElement(d.a,{data:this.state.data}))),"noData"==this.state.kind&&r.createElement("div",null,"No data provided yet."))}}},2:function(e,t,n){"use strict";function r(e){return new Uint8Array(e.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer}function a(e){let t="",n=new Uint8Array(e);for(let e of n)t+=String.fromCharCode(e);return window.btoa(t)}function s(e){let t=window.atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return n.buffer}function i(e){return e.split(/\r?\n/g)}function o(e,t=10){return e.byteLength>t?(e=e.bytes(0,t)).toHex()+"...":e.toHex()}n.d(t,"d",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return s})),n.d(t,"e",(function(){return i})),n.d(t,"c",(function(){return o}))},31:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var r,a,s=n(1),i=n(11);function o(e){switch(e){case a.NB:return 8e3;case a.MB:return 12e3;case a.WB:return 16e3;case a.SWB:return 24e3;case a.FB:return 48e3}}function l(e){switch(e){case a.NB:return 4e3;case a.MB:return 6e3;case a.WB:return 8e3;case a.SWB:return 12e3;case a.FB:return 2e4}}!function(e){e.SILK_ONLY="SILK-only",e.HYBRID="Hybrid",e.CELT_ONLY="CELT-only"}(r||(r={})),function(e){e.NB="NB",e.MB="MB",e.WB="WB",e.SWB="SWB",e.FB="FB"}(a||(a={}));const u=[10,20,40,60],c=[10,20],d=[2.5,5,10,20];function h(e){let[t,n,i]=function(e){if(e<=3)return[r.SILK_ONLY,a.NB,u[e]];if(e<=7)return[r.SILK_ONLY,a.MB,u[e-4]];if(e<=11)return[r.SILK_ONLY,a.WB,u[e-8]];if(e<=13)return[r.HYBRID,a.SWB,c[e-12]];if(e<=15)return[r.HYBRID,a.FB,c[e-14]];if(e<=19)return[r.CELT_ONLY,a.NB,d[e-16]];if(e<=23)return[r.CELT_ONLY,a.WB,d[e-20]];if(e<=27)return[r.CELT_ONLY,a.SWB,d[e-24]];if(e<=31)return[r.CELT_ONLY,a.FB,d[e-28]];throw new Error(`Unknown config ${e}.`)}(e.readUIntBE());return[new s.a(`Config: ${e.readUIntBE()} (${t}, ${n}, ${i}ms)`,e,[new s.a(`Mode: ${t}`,e),new s.a(`Bandwidth: ${n} (${l(n)}Hz), Sample Rate: ${o(n)}Hz`,e),new s.a(`Frame Size: ${i}ms`,e)]),[t,n,i]]}function p(e,t,n){let r=t/function(e){switch(e){case 10:return 10;case 20:case 40:case 60:return 20;default:throw new Error(`Unexpected Opus frame size ${e}.`)}}(t),a=n?2:1,i=n?["Mid","Side"]:["Mono"],o=[],l=e.bits(0);for(let e=0;e<a;++e){for(let t=0;t<r;++t){let t=l.bits(0,1);l=l.bits(1),o.push(new s.a(`${i[e]}, Frame ${e+1}, VAD Flag: ${t.readBool()}`,t))}let t=l.bits(0,1);l=l.bits(1),o.push(new s.a(`${i[e]}, LBRR Flag: ${t.readBool()}`,t))}return new s.a(`SILK Frame (${r} SILK Frames)`,e,o)}function f(e,t,n,a){return t==r.SILK_ONLY?p(e,n,a):t==r.HYBRID?new s.a("Hybrid Frame",e,[p(e,n,a)]):new s.a(`Compressed Frame (${e.size()} bytes)`,e,[])}function b(e){let t=e.bytes(0,1).readUIntBE();if(t<=251)return[t,e.bytes(0,1)];return[4*e.bytes(1,1).readUIntBE()+t,e.bytes(0,2)]}function y(e,t,n,r,a){let o=[];try{if(0==e)o=[f(t,n,r,a)];else if(1==e)Object(i.assert)(t.size()%2==0,"In packing mode 2, the amount of bytes available for frames must be even."),o=[f(t.bytes(0,t.byteLength/2),n,r,a),f(t.bytes(t.byteLength/2),n,r,a)];else if(2==e)i.assert.fail("Packing mode 2 unimplemented.");else if(3==e){let e=t.bytes(0,1),l=e.bits(0,1),u=e.bits(1,1),c=e.bits(2,6);if(o.push(new s.a(`Mode: ${l.readBool()?"VBR":"CBR"}`,l)),o.push(new s.a(`Padding: ${u.readBool()}`,l)),o.push(new s.a(`Frame Count: ${c.readUIntBE()}`,l)),u.readBool()&&i.assert.fail("Frame padding not implemented."),l.readBool()){let i=[],l=t.bytes(1);for(let e=0;e<c.readUIntBE()-1;++e){let[e,t]=b(l);i.push([e,t]),l=l.bytes(t.size())}o.push(new s.a(`Frame Lengths: ${i.length}`,t.bytes(1,l.byteStart-e.byteStart),i.map(e=>new s.a(`${e[1].size()}-byte Frame Length: ${e[0]}`,e[1]))));for(let[e,t]of i){let t=l.bytes(0,e);o.push(f(t,n,r,a)),l=l.bytes(e)}let u=l;o.push(f(u,n,r,a))}else i.assert.fail("CBR mode not implemented.")}return new s.a("Compressed Frames",t,o)}catch(e){return new s.a(`Malformed Frames: ${e.message}`,t,o,e)}}function m(e){i.assert.isAtLeast(e.size(),1,"Opus packet must be at least one byte.");let t=e.bytes(0,1),n=t.bits(0,5),r=t.bits(5,1),a=t.bits(6,2),[o,[l,u,c]]=h(n);return new s.a("Opus Packet",e,[o,new s.a(`Channels: ${r.readBool()?"Stereo":"Mono"}`,r),new s.a(`Frame Packing Mode: ${a.readUIntBE()} (${["1 Frame","2 Frame, Equal Size","2 Frames, Different Size","Arbitrary Frames"][a.readUIntBE()]})`,a),y(a.readUIntBE(),e.bytes(1),l,c,r.readBool())])}},5:function(e,t,n){"use strict";n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o}));const r=n(29),a=r.parse(window.location.hash);function s(e,t){a[e]=t;let n=r.stringify(a);n.length<=2e3?window.location.hash=n:window.location.hash=""}function i(e){return a[e]}function o(e){return!!a[e]}},7:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return s}));var r=n(11);class a{constructor(e,t,n){this.buffer=e,this.byteStart=t,this.byteLength=n}size(){return this.byteLength}toDataView(){return new DataView(this.buffer,this.byteStart,this.byteLength)}toUint8Array(){return new Uint8Array(this.buffer,this.byteStart,this.byteLength)}readUTF8(){return(new TextDecoder).decode(this.toUint8Array())}toHex(){return Array.from(this.toUint8Array()).map(e=>e.toString(16).padStart(2,"0")).join("")}contains(e){return e.byteStart>=this.byteStart&&e.byteStart+e.byteLength<=this.byteStart+this.byteLength}bytes(e,t){if(null==t&&(t=this.byteLength-e),e<0)throw new Error(`byteStart is ${e}, but should be non-negative.`);if(e+t>this.byteLength)throw new Error("New subrange does not fit within current subrange.");return new a(this.buffer,this.byteStart+e,t)}bits(e,t){let n=8*this.byteStart+e;return null==t&&(t=8*this.byteLength-n),new s(this.buffer,n,t)}readBits(){let e=[],t=this.toUint8Array();for(;e.length<8*this.byteLength;){let n=t[Math.floor(e.length/8)],r=e.length%8;e.push(128==(n<<r&128))}return e}readUIntBE(){return this.bits(0,8*this.byteLength).readUIntBE()}readUIntLE(){let e=0,t=this.toUint8Array();for(let n=0;n<t.length;++n)e+=t[n]*Math.pow(2,8*n);return e}chunks(e){let t=[],n=0;for(;n<this.byteLength;)t.push(this.bytes(n,Math.min(e,this.byteLength-n))),n+=e;return t}}class s{constructor(e,t,n){this.buffer=e,this.bitStart=t,this.bitLength=n}enclosingByteRange(){let e=Math.floor(this.bitStart/8),t=Math.floor((this.bitStart+this.bitLength-1)/8)+1;return new a(this.buffer,e,t-e)}readBits(){let e=this.enclosingByteRange(),t=e.readBits(),n=this.bitStart-8*e.byteStart;return t.slice(n,n+this.bitLength)}readUIntBE(){let e=0,t=this.readBits();for(let n=0;n<t.length;++n)t[t.length-1-n]&&(e+=Math.pow(2,n));return e}readBool(){let e=this.readBits();return r.assert.equal(e.length,1),e[0]}bits(e,t){return null==t&&(t=this.bitLength-e),new s(this.buffer,this.bitStart+e,t)}}}});