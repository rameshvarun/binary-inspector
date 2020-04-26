!function(e){function t(t){for(var n,i,o=t[0],l=t[1],u=t[2],d=0,h=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&h.push(a[i][0]),a[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(c&&c(t);h.length;)h.shift()();return s.push.apply(s,u||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,o=1;o<r.length;o++){var l=r[o];0!==a[l]&&(n=!1)}n&&(s.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={2:0},s=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var c=l;s.push([72,0]),r()}({1:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));class n{constructor(e,t,r=[],n){this.label=e,this.range=t,this.children=r,this.error=n;for(let e of this.children)e.parent=this}isChildOf(e){let t=this;for(;void 0!==t;){if(t===e)return!0;t=t.parent}return!1}isParentOf(e){return e.isChildOf(this)}}},10:function(e,t,r){"use strict";r.d(t,"c",(function(){return s})),r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return o}));const n=r(33),a=n.parse(window.location.hash);function s(e,t){a[e]=t;let r=n.stringify(a);r.length<=2e3?window.location.hash=r:window.location.hash=""}function i(e){return a[e]}function o(e){return!!a[e]}},12:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(0),a=r(9);class s extends n.Component{constructor(e){super(e)}render(){let e=this.props.data;return e.byteLength>16e3?n.createElement("div",null,"File is too large for binary view."):n.createElement("div",{style:{fontFamily:"monospace"}},e.chunks(16).map((e,t)=>n.createElement("div",{key:t},e.chunks(8).map((e,t)=>n.createElement("span",{style:{paddingRight:"10px"},key:t},e.chunks(1).map((e,t)=>{let r=!1;return this.props.selected&&(this.props.selected instanceof a.b?r=this.props.selected.contains(e):this.props.selected instanceof a.a&&(r=this.props.selected.enclosingByteRange().contains(e))),n.createElement("span",{style:{paddingRight:"5px",backgroundColor:r?"#dedede":""},key:t},e.toHex())}))))))}}},17:function(e,t,r){"use strict";r.d(t,"a",(function(){return d}));var n=r(0),a=r(36),s=r(14),i=r(7),o=r(15),l=r(6),u=r(24),c=function(e,t,r,n){return new(r||(r=Promise))((function(a,s){function i(e){try{l(n.next(e))}catch(e){s(e)}}function o(e){try{l(n.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,o)}l((n=n.apply(e,t||[])).next())}))};class d extends n.Component{constructor(e){super(e),this.hexIgnoreFirstColumn=n.createRef()}render(){return n.createElement(a.a,{defaultActiveKey:this.props.defaultBase64?"base64":"hex",id:"binary-input-tabs"},n.createElement(s.a,{eventKey:"hex",title:"Hex"},n.createElement(i.a,null,n.createElement(i.a.Group,{controlId:"exampleForm.ControlTextarea1"},n.createElement(i.a.Control,{as:"textarea",rows:"3",onChange:e=>{let t=e.target.value.trim();if(this.hexIgnoreFirstColumn.current.checked){let e=l.e(t);e=e.map(e=>e.split(/\s+/g).slice(1).join(" ")),t=e.join("\n")}let r=l.d(t);this.props.onBuffer(r)}}),n.createElement(i.a.Check,{ref:this.hexIgnoreFirstColumn,type:"checkbox",label:"Ignore First Column"})))),n.createElement(s.a,{eventKey:"base64",title:"Base64"},n.createElement(i.a,null,n.createElement(i.a.Group,{controlId:"exampleForm.ControlTextarea1"},n.createElement(i.a.Control,{as:"textarea",rows:"3",onChange:e=>{let t=e.target.value.trim(),r=l.b(t);this.props.onBuffer(r)},defaultValue:this.props.defaultBase64})))),n.createElement(s.a,{eventKey:"file",title:"File"},n.createElement(i.a,null,n.createElement(u.a,{onDrop:e=>c(this,void 0,void 0,(function*(){let t=e[0],r=yield t.arrayBuffer();this.props.onBuffer(r)}))},({getRootProps:e,getInputProps:t})=>n.createElement("div",Object.assign({},e()),n.createElement(o.a,{className:"text-center"},n.createElement(o.a.Body,null,n.createElement(o.a.Text,null,"Drag and drop file here, or click to browse."),n.createElement("input",Object.assign({},t())))))))))}}},18:function(e,t,r){"use strict";var n=r(0),a=r(39),s=r(25),i=r(12),o=r(23),l=r(13);class u extends n.Component{constructor(e){super(e),this.state={open:this.props.depth<=1}}shouldComponentUpdate(e,t){if(this.props.tree!=e.tree)return!0;if(this.props.selected!=e.selected){let t=!!this.props.selected&&this.props.tree.isParentOf(this.props.selected),r=!!e.selected&&this.props.tree.isParentOf(e.selected);if(t||r)return!0}return this.state.open!==t.open}render(){let e=this.props.tree,t=this.props.depth||0,r="";return e.error&&(r="#ff6e6e"),this.props.selected==e&&(r="#dedede"),e.children.length>0?n.createElement("div",{style:{wordWrap:"break-word",backgroundColor:r,paddingLeft:"5px"}},n.createElement("div",{onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},n.createElement("span",{onClick:e=>{this.setState(e=>Object.assign(Object.assign({},e),{open:!e.open})),e.stopPropagation()},style:{paddingRight:"5px"}},n.createElement(o.a,{icon:this.state.open?l.a:l.b})),n.createElement("span",null,e.label)),this.state.open&&e.children.map((e,r)=>n.createElement("div",{key:r,style:{paddingLeft:"15px"}},n.createElement(u,{tree:e,depth:t+1,onSelect:this.props.onSelect,selected:this.props.selected})))):n.createElement("div",{style:{backgroundColor:r,paddingLeft:"5px"},onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},e.label)}}u.defaultProps={depth:0},r.d(t,"a",(function(){return c}));class c extends n.Component{constructor(e){super(e),this.state={}}render(){return n.createElement(n.Fragment,null,n.createElement(a.a,null,n.createElement(s.a,{md:6},n.createElement(u,{tree:this.props.tree,selected:this.state.selected,onSelect:e=>this.setState({selected:e})})),n.createElement(s.a,{md:6},n.createElement(i.a,{data:this.props.data,selected:this.state.selected?this.state.selected.range:void 0}))))}}},19:function(e,t,r){"use strict";r.d(t,"a",(function(){return f}));var n=r(0),a=r(9),s=r(39),i=r(25),o=r(27),l=r(6),u=r(17),c=r(18),d=r(12),h=r(10);class f extends n.Component{constructor(e){super(e),this.state={kind:"noData"}}componentDidMount(){if(h.b("data")){let e=h.a("data"),t=l.b(e);this.loadBuffer(t)}}loadBuffer(e){h.c("data",l.a(e));let t=new a.b(e,0,e.byteLength);try{let e=this.props.inspect(t);this.setState({kind:"decodeSuccess",data:t,tree:e})}catch(e){this.setState({kind:"decodeFailure",data:t,error:e})}}render(){return n.createElement(n.Fragment,null,n.createElement(u.a,{inputName:"input",defaultBase64:h.a("data"),onBuffer:e=>this.loadBuffer(e)}),"decodeSuccess"==this.state.kind&&n.createElement(c.a,{tree:this.state.tree,data:this.state.data}),"decodeFailure"==this.state.kind&&n.createElement(s.a,null,n.createElement(i.a,null,n.createElement(o.a,{variant:"danger"},n.createElement(o.a.Heading,null,this.state.error.toString()),n.createElement("code",null,n.createElement("pre",null,this.state.error.stack)))),n.createElement(i.a,null,n.createElement(d.a,{data:this.state.data}))),"noData"==this.state.kind&&n.createElement("div",null,"No data provided yet."))}}},37:function(e,t,r){"use strict";r.d(t,"a",(function(){return y}));var n,a,s=r(1),i=r(11);function o(e){switch(e){case a.NB:return 8e3;case a.MB:return 12e3;case a.WB:return 16e3;case a.SWB:return 24e3;case a.FB:return 48e3}}function l(e){switch(e){case a.NB:return 4e3;case a.MB:return 6e3;case a.WB:return 8e3;case a.SWB:return 12e3;case a.FB:return 2e4}}!function(e){e.SILK_ONLY="SILK-only",e.HYBRID="Hybrid",e.CELT_ONLY="CELT-only"}(n||(n={})),function(e){e.NB="NB",e.MB="MB",e.WB="WB",e.SWB="SWB",e.FB="FB"}(a||(a={}));const u=[10,20,40,60],c=[10,20],d=[2.5,5,10,20];function h(e){let[t,r,i]=function(e){if(e<=3)return[n.SILK_ONLY,a.NB,u[e]];if(e<=7)return[n.SILK_ONLY,a.MB,u[e-4]];if(e<=11)return[n.SILK_ONLY,a.WB,u[e-8]];if(e<=13)return[n.HYBRID,a.SWB,c[e-12]];if(e<=15)return[n.HYBRID,a.FB,c[e-14]];if(e<=19)return[n.CELT_ONLY,a.NB,d[e-16]];if(e<=23)return[n.CELT_ONLY,a.WB,d[e-20]];if(e<=27)return[n.CELT_ONLY,a.SWB,d[e-24]];if(e<=31)return[n.CELT_ONLY,a.FB,d[e-28]];throw new Error(`Unknown config ${e}.`)}(e.readUIntBE());return[new s.a(`Config: ${e.readUIntBE()} (${t}, ${r}, ${i}ms)`,e,[new s.a(`Mode: ${t}`,e),new s.a(`Bandwidth: ${r} (${l(r)}Hz), Sample Rate: ${o(r)}Hz`,e),new s.a(`Frame Size: ${i}ms`,e)]),[t,r,i]]}function f(e,t,r){let n=t/function(e){switch(e){case 10:return 10;case 20:case 40:case 60:return 20;default:throw new Error(`Unexpected Opus frame size ${e}.`)}}(t),a=r?2:1,i=r?["Mid","Side"]:["Mono"],o=[],l=e.bits(0);for(let e=0;e<a;++e){for(let t=0;t<n;++t){let t=l.bits(0,1);l=l.bits(1),o.push(new s.a(`${i[e]}, Frame ${e+1}, VAD Flag: ${t.readBool()}`,t))}let t=l.bits(0,1);l=l.bits(1),o.push(new s.a(`${i[e]}, LBRR Flag: ${t.readBool()}`,t))}return new s.a(`SILK Frame (${n} SILK Frames)`,e,o)}function p(e,t,r,a){return t==n.SILK_ONLY?f(e,r,a):new s.a(`Compressed Frame (${e.size()} bytes)`,e,[])}function b(e){let t=e.bytes(0,1).readUIntBE();if(t<=251)return[t,e.bytes(0,1)];return[4*e.bytes(1,1).readUIntBE()+t,e.bytes(0,2)]}function m(e,t,r,n,a){let o=[];try{if(0==e)o=[p(t,r,n,a)];else if(1==e)Object(i.assert)(t.size()%2==0,"In packing mode 2, the amount of bytes available for frames must be even."),o=[p(t.bytes(0,t.byteLength/2),r,n,a),p(t.bytes(t.byteLength/2),r,n,a)];else if(2==e)i.assert.fail("Packing mode 2 unimplemented.");else if(3==e){let e=t.bytes(0,1),l=e.bits(0,1),u=e.bits(1,1),c=e.bits(2,6);if(o.push(new s.a(`Mode: ${l.readBool()?"VBR":"CBR"}`,l)),o.push(new s.a(`Padding: ${u.readBool()}`,l)),o.push(new s.a(`Frame Count: ${c.readUIntBE()}`,l)),u.readBool()&&i.assert.fail("Frame padding not implemented."),l.readBool()){let i=[],l=t.bytes(1);for(let e=0;e<c.readUIntBE()-1;++e){let[e,t]=b(l);i.push([e,t]),l=l.bytes(t.size())}o.push(new s.a(`Frame Lengths: ${i.length}`,t.bytes(1,l.byteStart-e.byteStart),i.map(e=>new s.a(`${e[1].size()}-byte Frame Length: ${e[0]}`,e[1]))));for(let[e,t]of i){let t=l.bytes(0,e);o.push(p(t,r,n,a)),l=l.bytes(e)}let u=l;o.push(p(u,r,n,a))}else i.assert.fail("CBR mode not implemented.")}return new s.a("Compressed Frames",t,o)}catch(e){return new s.a(`Malformed Frames: ${e.message}`,t,o,e)}}function y(e){i.assert.isAtLeast(e.size(),1,"Opus packet must be at least one byte.");let t=e.bytes(0,1),r=t.bits(0,5),n=t.bits(5,1),a=t.bits(6,2),[o,[l,u,c]]=h(r);return new s.a("Opus Packet",e,[o,new s.a(`Channels: ${n.readBool()?"Stereo":"Mono"}`,n),new s.a(`Frame Packing Mode: ${a.readUIntBE()} (${["1 Frame","2 Frame, Equal Size","2 Frames, Different Size","Arbitrary Frames"][a.readUIntBE()]})`,a),m(a.readUIntBE(),e.bytes(1),l,c,n.readBool())])}},6:function(e,t,r){"use strict";function n(e){return new Uint8Array(e.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer}function a(e){let t="",r=new Uint8Array(e);for(let e of r)t+=String.fromCharCode(e);return window.btoa(t)}function s(e){let t=window.atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return r.buffer}function i(e){return e.split(/\r?\n/g)}function o(e,t=10){return e.byteLength>t?(e=e.bytes(0,t)).toHex()+"...":e.toHex()}r.d(t,"d",(function(){return n})),r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return s})),r.d(t,"e",(function(){return i})),r.d(t,"c",(function(){return o}))},72:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(20),s=r(19),i=r(37);a.render(n.createElement(s.a,{inspect:i.a}),document.getElementById("root"))},9:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"a",(function(){return s}));var n=r(11);class a{constructor(e,t,r){this.buffer=e,this.byteStart=t,this.byteLength=r}size(){return this.byteLength}toDataView(){return new DataView(this.buffer,this.byteStart,this.byteLength)}toUint8Array(){return new Uint8Array(this.buffer,this.byteStart,this.byteLength)}readUTF8(){return(new TextDecoder).decode(this.toUint8Array())}toHex(){return Array.from(this.toUint8Array()).map(e=>e.toString(16).padStart(2,"0")).join("")}contains(e){return e.byteStart>=this.byteStart&&e.byteStart+e.byteLength<=this.byteStart+this.byteLength}bytes(e,t){if(null==t&&(t=this.byteLength-e),e<0)throw new Error(`byteStart is ${e}, but should be non-negative.`);if(e+t>this.byteLength)throw new Error("New subrange does not fit within current subrange.");return new a(this.buffer,this.byteStart+e,t)}bits(e,t){let r=8*this.byteStart+e;return null==t&&(t=8*this.byteLength-r),new s(this.buffer,r,t)}readBits(){let e=[],t=this.toUint8Array();for(;e.length<8*this.byteLength;){let r=t[Math.floor(e.length/8)],n=e.length%8;e.push(128==(r<<n&128))}return e}readUIntBE(){return this.bits(0,8*this.byteLength).readUIntBE()}readUIntLE(){let e=0,t=this.toUint8Array();for(let r=0;r<t.length;++r)e+=t[r]*Math.pow(2,8*r);return e}chunks(e){let t=[],r=0;for(;r<this.byteLength;)t.push(this.bytes(r,Math.min(e,this.byteLength-r))),r+=e;return t}}class s{constructor(e,t,r){this.buffer=e,this.bitStart=t,this.bitLength=r}enclosingByteRange(){let e=Math.floor(this.bitStart/8),t=Math.floor((this.bitStart+this.bitLength-1)/8)+1;return new a(this.buffer,e,t-e)}readBits(){let e=this.enclosingByteRange(),t=e.readBits(),r=this.bitStart-8*e.byteStart;return t.slice(r,r+this.bitLength)}readUIntBE(){let e=0,t=this.readBits();for(let r=0;r<t.length;++r)t[t.length-1-r]&&(e+=Math.pow(2,r));return e}readBool(){let e=this.readBits();return n.assert.equal(e.length,1),e[0]}bits(e,t){return null==t&&(t=this.bitLength-e),new s(this.buffer,this.bitStart+e,t)}}}});