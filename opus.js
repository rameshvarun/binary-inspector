!function(e){function t(t){for(var n,o,i=t[0],l=t[1],c=t[2],d=0,h=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&h.push(a[o][0]),a[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(u&&u(t);h.length;)h.shift()();return s.push.apply(s,c||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,i=1;i<r.length;i++){var l=r[i];0!==a[l]&&(n=!1)}n&&(s.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},a={0:0},s=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var i=window.webpackJsonp=window.webpackJsonp||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=l;s.push([87,1]),r()}({87:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(20),s=r(10);class o{constructor(e,t,r){this.buffer=e,this.byteStart=t,this.byteLength=r}size(){return this.byteLength}toDataView(){return new DataView(this.buffer,this.byteStart,this.byteLength)}toUint8Array(){return new Uint8Array(this.buffer,this.byteStart,this.byteLength)}toHex(){return Array.from(this.toUint8Array()).map(e=>e.toString(16).padStart(2,"0")).join("")}contains(e){return e.byteStart>=this.byteStart&&e.byteStart+e.byteLength<=this.byteStart+this.byteLength}bytes(e,t){if(null==t&&(t=this.byteLength-e),e<0)throw new Error(`byteStart is ${e}, but should be non-negative.`);if(e+t>this.byteLength)throw new Error("New subrange does not fit within current subrange.");return new o(this.buffer,this.byteStart+e,t)}bits(e,t){return new i(this.buffer,8*this.byteStart+e,t)}readBits(){let e=[],t=this.toUint8Array();for(;e.length<8*this.byteLength;){let r=t[Math.floor(e.length/8)],n=e.length%8;e.push(128==(r<<n&128))}return e}readUIntBE(){return this.bits(0,8*this.byteLength).readUIntBE()}chunks(e){let t=[],r=0;for(;r<this.byteLength;)t.push(this.bytes(r,Math.min(e,this.byteLength-r))),r+=e;return t}}class i{constructor(e,t,r){this.buffer=e,this.bitStart=t,this.bits=r}enclosingByteRange(){let e=Math.floor(this.bitStart/8),t=Math.floor((this.bitStart+this.bits-1)/8)+1;return new o(this.buffer,e,t-e)}readBits(){let e=this.enclosingByteRange(),t=e.readBits(),r=this.bitStart-8*e.byteStart;return t.slice(r,r+this.bits)}readUIntBE(){let e=0,t=this.readBits();for(let r=0;r<t.length;++r)t[t.length-1-r]&&(e+=Math.pow(2,r));return e}readBool(){let e=this.readBits();return s.assert.equal(e.length,1),e[0]}}var l=r(90),c=r(49),u=r(94);function d(e){let t=window.atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return r.buffer}var h=r(93),f=r(89),p=r(92),m=r(95),b=r(51),y=function(e,t,r,n){return new(r||(r=Promise))((function(a,s){function o(e){try{l(n.next(e))}catch(e){s(e)}}function i(e){try{l(n.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}l((n=n.apply(e,t||[])).next())}))};class g extends n.Component{constructor(e){super(e)}render(){return n.createElement(h.a,{defaultActiveKey:this.props.defaultBase64?"base64":"hex",id:"binary-input-tabs"},n.createElement(f.a,{eventKey:"hex",title:"Hex"},n.createElement(p.a,null,n.createElement(p.a.Group,{controlId:"exampleForm.ControlTextarea1"},n.createElement(p.a.Control,{as:"textarea",rows:"3",onChange:e=>{let t=function(e){return new Uint8Array(e.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer}(e.target.value.trim());this.props.onBuffer(t)}})))),n.createElement(f.a,{eventKey:"base64",title:"Base64"},n.createElement(p.a,null,n.createElement(p.a.Group,{controlId:"exampleForm.ControlTextarea1"},n.createElement(p.a.Control,{as:"textarea",rows:"3",onChange:e=>{let t=d(e.target.value.trim());this.props.onBuffer(t)},defaultValue:this.props.defaultBase64})))),n.createElement(f.a,{eventKey:"file",title:"File"},n.createElement(p.a,null,n.createElement(b.a,{onDrop:e=>y(this,void 0,void 0,(function*(){let t=e[0],r=yield t.arrayBuffer();this.props.onBuffer(r)}))},({getRootProps:e,getInputProps:t})=>n.createElement("div",Object.assign({},e()),n.createElement(m.a,{className:"text-center"},n.createElement(m.a.Body,null,n.createElement(m.a.Text,null,"Drag and drop file here, or click to browse."),n.createElement("input",Object.assign({},t())))))))))}}class B extends n.Component{constructor(e){super(e)}render(){let e=this.props.data;return n.createElement("div",{style:{fontFamily:"monospace"}},e.chunks(16).map((e,t)=>n.createElement("div",{key:t},e.chunks(8).map((e,t)=>n.createElement("span",{style:{paddingRight:"10px"},key:t},e.chunks(1).map((e,t)=>{let r=!1;return this.props.selected&&(this.props.selected instanceof o?r=this.props.selected.contains(e):this.props.selected instanceof i&&(r=this.props.selected.enclosingByteRange().contains(e))),n.createElement("span",{style:{paddingRight:"5px",backgroundColor:r?"#dedede":""},key:t},e.toHex())}))))))}}class E extends n.Component{constructor(e){super(e),this.state={selected:null}}render(){let e=this.props.tree,t="";return e.error&&(t="#ff6e6e"),this.props.selected==e&&(t="#dedede"),e.children.length>0?n.createElement("details",{style:{wordWrap:"break-word",backgroundColor:t,paddingLeft:"5px"},open:!0},n.createElement("summary",{onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},e.label),e.children.map((e,t)=>n.createElement("div",{key:t,style:{paddingLeft:"15px"}},n.createElement(E,{tree:e,onSelect:this.props.onSelect,selected:this.props.selected})))):n.createElement("div",{style:{backgroundColor:t,paddingLeft:"5px"},onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},e.label)}}class w extends n.Component{constructor(e){super(e),this.state={}}render(){return n.createElement(n.Fragment,null,n.createElement(l.a,null,n.createElement(c.a,null,n.createElement(E,{tree:this.props.tree,selected:this.state.selected,onSelect:e=>this.setState({selected:e})})),n.createElement(c.a,null,n.createElement(B,{data:this.props.data,selected:this.state.selected?this.state.selected.range:void 0}))))}}const S=r(83),v=S.parse(window.location.hash);function L(e){return v[e]}class C extends n.Component{constructor(e){super(e),this.state={kind:"noData"}}componentDidMount(){if(v["data"]){let e=d(L("data"));this.loadBuffer(e)}}loadBuffer(e){var t,r;t="data",r=function(e){let t="",r=new Uint8Array(e);for(let e of r)t+=String.fromCharCode(e);return window.btoa(t)}(e),v[t]=r,window.location.hash=S.stringify(v);let n=new o(e,0,e.byteLength);try{let e=this.props.inspect(n);this.setState({kind:"decodeSuccess",data:n,tree:e})}catch(e){this.setState({kind:"decodeFailure",data:n,error:e})}}render(){return n.createElement(n.Fragment,null,n.createElement(g,{inputName:"input",defaultBase64:L("data"),onBuffer:e=>this.loadBuffer(e)}),"decodeSuccess"==this.state.kind&&n.createElement(w,{tree:this.state.tree,data:this.state.data}),"decodeFailure"==this.state.kind&&n.createElement(l.a,null,n.createElement(c.a,null,n.createElement(u.a,{variant:"danger"},n.createElement(u.a.Heading,null,this.state.error.toString()),n.createElement("code",null,n.createElement("pre",null,this.state.error.stack)))),n.createElement(c.a,null,n.createElement(B,{data:this.state.data}))),"noData"==this.state.kind&&n.createElement("div",null,"No data provided yet."))}}var k,x,F=r(91);class I{constructor(e,t,r=[],n){this.label=e,this.range=t,this.children=r,this.error=n}}function O(e){switch(e){case x.NB:return 8e3;case x.MB:return 12e3;case x.WB:return 16e3;case x.SWB:return 24e3;case x.FB:return 48e3}}function $(e){switch(e){case x.NB:return 4e3;case x.MB:return 6e3;case x.WB:return 8e3;case x.SWB:return 12e3;case x.FB:return 2e4}}!function(e){e.SILK_ONLY="SILK-only",e.HYBRID="Hybrid",e.CELT_ONLY="CELT-only"}(k||(k={})),function(e){e.NB="NB",e.MB="MB",e.WB="WB",e.SWB="SWB",e.FB="FB"}(x||(x={}));const M=[10,20,40,60],N=[10,20],U=[2.5,5,10,20];function P(e){let[t,r,n]=function(e){if(e<=3)return[k.SILK_ONLY,x.NB,M[e]];if(e<=7)return[k.SILK_ONLY,x.MB,M[e-4]];if(e<=11)return[k.SILK_ONLY,x.WB,M[e-8]];if(e<=13)return[k.HYBRID,x.SWB,N[e-12]];if(e<=15)return[k.HYBRID,x.FB,N[e-14]];if(e<=19)return[k.CELT_ONLY,x.NB,U[e-16]];if(e<=23)return[k.CELT_ONLY,x.WB,U[e-20]];if(e<=27)return[k.CELT_ONLY,x.SWB,U[e-24]];if(e<=31)return[k.CELT_ONLY,x.FB,U[e-28]];throw new Error(`Unknown config ${e}.`)}(e.readUIntBE());return new I(`Config: ${e.readUIntBE()} (${t}, ${r}, ${n}ms)`,e,[new I(`Mode: ${t}`,e),new I(`Bandwidth: ${r} (${$(r)}Hz), Sample Rate: ${O(r)}Hz`,e),new I(`Frame Size: ${n}ms`,e)])}function _(e){return new I(`Compressed Frame (${e.size()} bytes)`,e,[])}function R(e){let t=e.bytes(0,1).readUIntBE();if(t<=251)return[t,e.bytes(0,1)];return[4*e.bytes(1,1).readUIntBE()+t,e.bytes(0,2)]}function j(e,t){let r=[];try{if(0==e)r=[_(t)];else if(1==e)Object(s.assert)(t.size()%2==0,"In packing mode 2, the amount of bytes available for frames must be even."),r=[_(t.bytes(0,t.byteLength/2)),_(t.bytes(t.byteLength/2))];else if(2==e)s.assert.fail("Packing mode 2 unimplemented.");else if(3==e){let e=t.bytes(0,1),n=e.bits(0,1),a=e.bits(1,1),o=e.bits(2,6);if(r.push(new I(`Mode: ${n.readBool()?"VBR":"CBR"}`,n)),r.push(new I(`Padding: ${a.readBool()}`,n)),r.push(new I(`Frame Count: ${o.readUIntBE()}`,n)),a.readBool()&&s.assert.fail("Frame padding not implemented."),n.readBool()){let n=[],a=t.bytes(1);for(let e=0;e<o.readUIntBE()-1;++e){let[e,t]=R(a);n.push([e,t]),a=a.bytes(t.size())}r.push(new I(`Frame Lengths: ${n.length}`,t.bytes(1,a.byteStart-e.byteStart),n.map(e=>new I(`${e[1].size()}-byte Frame Length: ${e[0]}`,e[1]))));for(let[e,t]of n){let t=a.bytes(0,e);r.push(_(t)),a=a.bytes(e)}let s=a;r.push(_(s))}else s.assert.fail("CBR mode not implemented.")}return new I("Compressed Frames",t,r)}catch(e){return new I(`Malformed Frames: ${e.message}`,t,r,e)}}a.render(n.createElement(F.a,null,n.createElement("div",{className:"page-header"},n.createElement("h1",null,"Opus Packet Inspector"),"Based off ",n.createElement("a",{href:"https://tools.ietf.org/html/rfc6716"},"RFC 6716"),".",n.createElement("hr",null)),n.createElement(C,{inspect:function(e){s.assert.isAtLeast(e.size(),1,"Opus packet must be at least one byte.");let t=e.bytes(0,1),r=t.bits(0,5),n=t.bits(5,1),a=t.bits(6,2);return new I("Opus Packet",e,[P(r),new I(`Channels: ${n.readBool()?"Stereo":"Mono"}`,n),new I(`Frame Packing Mode: ${a.readUIntBE()} (${["1 Frame","2 Frame, Equal Size","2 Frames, Different Size","Arbitrary Frames"][a.readUIntBE()]})`,a),j(a.readUIntBE(),e.bytes(1))])}})),document.getElementById("root"))}});