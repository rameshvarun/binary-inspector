!function(e){function t(t){for(var r,i,o=t[0],l=t[1],c=t[2],h=0,d=[];h<o.length;h++)i=o[h],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&d.push(a[i][0]),a[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(u&&u(t);d.length;)d.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,o=1;o<n.length;o++){var l=n[o];0!==a[l]&&(r=!1)}r&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={5:0},s=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;s.push([112,0]),n()}({1:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));class r{constructor(e,t,n=[],r){this.label=e,this.range=t,this.children=n,this.error=r;for(let e of this.children)e.parent=this}isChildOf(e){let t=this;for(;void 0!==t;){if(t===e)return!0;t=t.parent}return!1}isParentOf(e){return e.isChildOf(this)}}},10:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(0),a=n(7);class s extends r.Component{constructor(e){super(e)}render(){let e=this.props.data;return e.byteLength>16e3?r.createElement("div",null,"File is too large for binary view."):r.createElement("div",{style:{fontFamily:"monospace"}},e.chunks(16).map((e,t)=>r.createElement("div",{key:t},e.chunks(8).map((e,t)=>r.createElement("span",{style:{paddingRight:"10px"},key:t},e.chunks(1).map((e,t)=>{let n=!1;return this.props.selected&&(this.props.selected instanceof a.b?n=this.props.selected.contains(e):this.props.selected instanceof a.a&&(n=this.props.selected.enclosingByteRange().contains(e))),r.createElement("span",{style:{paddingRight:"5px",backgroundColor:n?"#dedede":""},key:t},e.toHex())}))))))}}},112:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(20),s=n(19),i=n(1),o=n(2);a.render(r.createElement(s.a,{inspect:function(e){let t=e.bytes(0,8),n=[],r=e.bytes(8);for(;r.byteLength>0;){let e=r.bytes(0,4),t=r.bytes(4,4),a=e.readUIntBE(),s=r.bytes(8,a),l=r.bytes(8+a,4),c=8+a+4;n.push(new i.a(`Chunk (${t.readUTF8()})`,r.bytes(0,c),[new i.a(`Length: ${a}`,e),new i.a(`Type: ${t.readUTF8()}`,t),new i.a(`Data: ${Object(o.c)(s)}`,s),new i.a(`CRC: ${l.readUIntBE()}`,l)])),r=r.bytes(c)}return new i.a("PNG Image",e,[new i.a(`Signature: ${t.toHex()}`,t),new i.a(`Chunks (${n.length})`,e.bytes(8),n)])}}),document.getElementById("root"))},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n(0),a=n(30),s=n(14),i=n(3),o=n(15),l=n(2),c=n(23),u=function(e,t,n,r){return new(n||(n=Promise))((function(a,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function o(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,o)}l((r=r.apply(e,t||[])).next())}))};class h extends r.Component{constructor(e){super(e),this.hexIgnoreFirstColumn=r.createRef(),this.hexInput=r.createRef()}onHexChange(){let e=this.hexInput.current.value.trim();if(this.hexIgnoreFirstColumn.current.checked){let t=l.e(e);t=t.map(e=>e.split(/\s+/g).slice(1).join(" ")),e=t.join("\n")}let t=l.d(e);this.props.onBuffer(t)}render(){return r.createElement(a.a,{defaultActiveKey:this.props.defaultBase64?"base64":"hex",id:"binary-input-tabs"},r.createElement(s.a,{eventKey:"hex",title:"Hex"},r.createElement(i.a,null,r.createElement(i.a.Group,{controlId:"exampleForm.ControlTextarea1"},r.createElement(i.a.Control,{as:"textarea",rows:"3",ref:this.hexInput,onChange:()=>this.onHexChange()}),r.createElement(i.a.Check,{ref:this.hexIgnoreFirstColumn,type:"checkbox",label:"Ignore First Column",onChange:()=>this.onHexChange()})))),r.createElement(s.a,{eventKey:"base64",title:"Base64"},r.createElement(i.a,null,r.createElement(i.a.Group,{controlId:"exampleForm.ControlTextarea1"},r.createElement(i.a.Control,{as:"textarea",rows:"3",onChange:e=>{let t=e.target.value.trim(),n=l.b(t);this.props.onBuffer(n)},defaultValue:this.props.defaultBase64})))),r.createElement(s.a,{eventKey:"file",title:"File"},r.createElement(i.a,null,r.createElement(c.a,{onDrop:e=>u(this,void 0,void 0,(function*(){let t=e[0],n=yield t.arrayBuffer();this.props.onBuffer(n)}))},({getRootProps:e,getInputProps:t})=>r.createElement("div",Object.assign({},e()),r.createElement(o.a,{className:"text-center"},r.createElement(o.a.Body,null,r.createElement(o.a.Text,null,"Drag and drop file here, or click to browse."),r.createElement("input",Object.assign({},t())))))))))}}},18:function(e,t,n){"use strict";var r=n(0),a=n(27),s=n(21),i=n(10),o=n(22),l=n(13);class c extends r.Component{constructor(e){super(e),this.state={open:this.props.depth<=1}}shouldComponentUpdate(e,t){if(this.props.tree!=e.tree)return!0;if(this.props.selected!=e.selected){let t=!!this.props.selected&&this.props.tree.isParentOf(this.props.selected),n=!!e.selected&&this.props.tree.isParentOf(e.selected);if(t||n)return!0}return this.state.open!==t.open}render(){let e=this.props.tree,t=this.props.depth||0,n="";return e.error&&(n="#ff6e6e"),this.props.selected==e&&(n="#dedede"),e.children.length>0?r.createElement("div",{style:{wordWrap:"break-word",backgroundColor:n,paddingLeft:"5px"}},r.createElement("div",{onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},r.createElement("span",{onClick:e=>{this.setState(e=>Object.assign(Object.assign({},e),{open:!e.open})),e.stopPropagation()},style:{paddingRight:"5px"}},r.createElement(o.a,{icon:this.state.open?l.a:l.b})),r.createElement("span",null,e.label)),this.state.open&&e.children.map((e,n)=>r.createElement("div",{key:n,style:{paddingLeft:"15px"}},r.createElement(c,{tree:e,depth:t+1,onSelect:this.props.onSelect,selected:this.props.selected})))):r.createElement("div",{style:{backgroundColor:n,paddingLeft:"5px"},onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},e.label)}}c.defaultProps={depth:0},n.d(t,"a",(function(){return u}));class u extends r.Component{constructor(e){super(e),this.state={}}render(){return r.createElement(r.Fragment,null,r.createElement(a.a,null,r.createElement(s.a,{md:6},r.createElement(c,{tree:this.props.tree,selected:this.state.selected,onSelect:e=>this.setState({selected:e})})),r.createElement(s.a,{md:6},r.createElement(i.a,{data:this.props.data,selected:this.state.selected?this.state.selected.range:void 0}))))}}},19:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var r=n(0),a=n(7),s=n(27),i=n(21),o=n(24),l=n(2),c=n(17),u=n(18),h=n(10),d=n(5);class p extends r.Component{constructor(e){super(e),this.state={kind:"noData"}}componentDidMount(){if(d.b("data")){let e=d.a("data"),t=l.b(e);this.loadBuffer(t)}}loadBuffer(e){d.c("data",l.a(e));let t=new a.b(e,0,e.byteLength);try{let e=this.props.inspect(t);this.setState({kind:"decodeSuccess",data:t,tree:e})}catch(e){this.setState({kind:"decodeFailure",data:t,error:e})}}render(){return r.createElement(r.Fragment,null,r.createElement(c.a,{inputName:"input",defaultBase64:d.a("data"),onBuffer:e=>this.loadBuffer(e)}),"decodeSuccess"==this.state.kind&&r.createElement(u.a,{tree:this.state.tree,data:this.state.data}),"decodeFailure"==this.state.kind&&r.createElement(s.a,null,r.createElement(i.a,null,r.createElement(o.a,{variant:"danger"},r.createElement(o.a.Heading,null,this.state.error.toString()),r.createElement("code",null,r.createElement("pre",null,this.state.error.stack)))),r.createElement(i.a,null,r.createElement(h.a,{data:this.state.data}))),"noData"==this.state.kind&&r.createElement("div",null,"No data provided yet."))}}},2:function(e,t,n){"use strict";function r(e){return new Uint8Array(e.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer}function a(e){let t="",n=new Uint8Array(e);for(let e of n)t+=String.fromCharCode(e);return window.btoa(t)}function s(e){let t=window.atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return n.buffer}function i(e){return e.split(/\r?\n/g)}function o(e,t=10){return e.byteLength>t?(e=e.bytes(0,t)).toHex()+"...":e.toHex()}n.d(t,"d",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return s})),n.d(t,"e",(function(){return i})),n.d(t,"c",(function(){return o}))},5:function(e,t,n){"use strict";n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o}));const r=n(29),a=r.parse(window.location.hash);function s(e,t){a[e]=t;let n=r.stringify(a);n.length<=2e3?window.location.hash=n:window.location.hash=""}function i(e){return a[e]}function o(e){return!!a[e]}},7:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return s}));var r=n(11);class a{constructor(e,t,n){this.buffer=e,this.byteStart=t,this.byteLength=n}size(){return this.byteLength}toDataView(){return new DataView(this.buffer,this.byteStart,this.byteLength)}toUint8Array(){return new Uint8Array(this.buffer,this.byteStart,this.byteLength)}readUTF8(){return(new TextDecoder).decode(this.toUint8Array())}toHex(){return Array.from(this.toUint8Array()).map(e=>e.toString(16).padStart(2,"0")).join("")}contains(e){return e.byteStart>=this.byteStart&&e.byteStart+e.byteLength<=this.byteStart+this.byteLength}bytes(e,t){if(null==t&&(t=this.byteLength-e),e<0)throw new Error(`byteStart is ${e}, but should be non-negative.`);if(e+t>this.byteLength)throw new Error("New subrange does not fit within current subrange.");return new a(this.buffer,this.byteStart+e,t)}bits(e,t){let n=8*this.byteStart+e;return null==t&&(t=8*this.byteLength-n),new s(this.buffer,n,t)}readBits(){let e=[],t=this.toUint8Array();for(;e.length<8*this.byteLength;){let n=t[Math.floor(e.length/8)],r=e.length%8;e.push(128==(n<<r&128))}return e}readUIntBE(){return this.bits(0,8*this.byteLength).readUIntBE()}readUIntLE(){let e=0,t=this.toUint8Array();for(let n=0;n<t.length;++n)e+=t[n]*Math.pow(2,8*n);return e}chunks(e){let t=[],n=0;for(;n<this.byteLength;)t.push(this.bytes(n,Math.min(e,this.byteLength-n))),n+=e;return t}}class s{constructor(e,t,n){this.buffer=e,this.bitStart=t,this.bitLength=n}enclosingByteRange(){let e=Math.floor(this.bitStart/8),t=Math.floor((this.bitStart+this.bitLength-1)/8)+1;return new a(this.buffer,e,t-e)}readBits(){let e=this.enclosingByteRange(),t=e.readBits(),n=this.bitStart-8*e.byteStart;return t.slice(n,n+this.bitLength)}readUIntBE(){let e=0,t=this.readBits();for(let n=0;n<t.length;++n)t[t.length-1-n]&&(e+=Math.pow(2,n));return e}readBool(){let e=this.readBits();return r.assert.equal(e.length,1),e[0]}bits(e,t){return null==t&&(t=this.bitLength-e),new s(this.buffer,this.bitStart+e,t)}}}});