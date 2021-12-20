"use strict";(self.webpackChunkbinary_inspectors=self.webpackChunkbinary_inspectors||[]).push([[850],{7343:(e,t,r)=>{r.d(t,{t8:()=>a,U2:()=>i,e$:()=>o});const s=r(7563),n=s.parse(window.location.hash);function a(e,t){n[e]=t;let r=s.stringify(n);r.length<=2e3?window.location.hash=r:window.location.hash=""}function i(e){return n[e]}function o(e){return!!n[e]}},1977:(e,t,r)=>{r.d(t,{a:()=>n,r:()=>a});var s=r(4960);class n{constructor(e,t,r){this.buffer=e,this.byteStart=t,this.byteLength=r}size(){return this.byteLength}toDataView(){return new DataView(this.buffer,this.byteStart,this.byteLength)}toUint8Array(){return new Uint8Array(this.buffer,this.byteStart,this.byteLength)}readUTF8(){return(new TextDecoder).decode(this.toUint8Array())}nullTerminated(){let e=this.toUint8Array().findIndex((e=>0===e));return s.assert.isAtLeast(e,0),this.bytes(0,e)}toHex(){return Array.from(this.toUint8Array()).map((e=>e.toString(16).padStart(2,"0"))).join("")}contains(e){return e.byteStart>=this.byteStart&&e.byteStart+e.byteLength<=this.byteStart+this.byteLength}bytes(e,t){if(null==t&&(t=this.byteLength-e),e<0)throw new Error(`byteStart is ${e}, but should be non-negative.`);if(e+t>this.byteLength)throw new Error("New subrange does not fit within current subrange.");return new n(this.buffer,this.byteStart+e,t)}bits(e,t){let r=8*this.byteStart+e;return void 0===t&&(t=8*(this.byteStart+this.byteLength)-r),new a(this.buffer,r,t)}readBits(){let e=[],t=this.toUint8Array();for(;e.length<8*this.byteLength;){let r=t[Math.floor(e.length/8)],s=e.length%8;e.push(128==(r<<s&128))}return e}readUIntBE(){return this.bits(0,8*this.byteLength).readUIntBE()}readUIntLE(){let e=0,t=this.toUint8Array();for(let r=0;r<t.length;++r)e+=t[r]*Math.pow(2,8*r);return e}readFloat32LE(){return this.toDataView().getFloat32(0,!0)}readFloat32BE(){return this.toDataView().getFloat32(0,!1)}readFloat64BE(){return this.toDataView().getFloat64(0,!1)}chunks(e){let t=[],r=0;for(;r<this.byteLength;)t.push(this.bytes(r,Math.min(e,this.byteLength-r))),r+=e;return t}merge(e){s.assert.equal(this.buffer,e.buffer,"Can only merge ranges over the same buffer.");let t=Math.min(this.byteStart,e.byteStart),r=Math.max(this.byteStart+this.byteLength,e.byteStart+e.byteLength);return new n(this.buffer,t,r-t)}}class a{constructor(e,t,r){this.buffer=e,this.bitStart=t,this.bitLength=r}enclosingByteRange(){let e=Math.floor(this.bitStart/8),t=Math.floor((this.bitStart+this.bitLength-1)/8)+1;return new n(this.buffer,e,t-e)}readBits(){let e=this.enclosingByteRange(),t=e.readBits(),r=this.bitStart-8*e.byteStart;return t.slice(r,r+this.bitLength)}readUIntBE(){let e=0,t=this.readBits();for(let r=0;r<t.length;++r)t[t.length-1-r]&&(e+=Math.pow(2,r));return e}readBool(){let e=this.readBits();return s.assert.equal(e.length,1),e[0]}bits(e,t){return null==t&&(t=this.bitLength-e),new a(this.buffer,this.bitStart+e,t)}chunks(e){let t=[],r=0;for(;r<this.bitLength;)t.push(this.bits(r,Math.min(e,this.bitLength-r))),r+=e;return t}contains(e){return e.bitStart>=this.bitStart&&e.bitStart+e.bitLength<=this.bitStart+this.bitLength}}},2711:(e,t,r)=>{r.d(t,{m:()=>s});class s{constructor(e,t,r=[],s){this.label=e,this.range=t,this.children=r,this.error=s;for(let e of this.children)e.parent=this}isChildOf(e){let t=this;for(;void 0!==t;){if(t===e)return!0;t=t.parent}return!1}isParentOf(e){return e.isChildOf(this)}}},806:(e,t,r)=>{r.d(t,{Y:()=>c});var s=r(7294),n=r(1385),a=r(6841),i=r(4536),o=r(5881),l=r(3488),h=r(463);class c extends s.Component{constructor(e){super(e),this.hexIgnoreFirstColumn=s.createRef(),this.hexInput=s.createRef()}onHexChange(){let e=this.hexInput.current.value.trim();if(this.hexIgnoreFirstColumn.current.checked){let t=l.uq(e);t=t.map((e=>e.split(/\s+/g).slice(1).join(" "))),e=t.join("\n")}let t=l.aS(e);this.props.onBuffer(t)}render(){return s.createElement(n.Z,{defaultActiveKey:this.props.defaultBase64?"base64":"hex",id:"binary-input-tabs"},s.createElement(a.Z,{eventKey:"hex",title:"Hex"},s.createElement(i.Z,null,s.createElement(i.Z.Group,{controlId:"exampleForm.ControlTextarea1"},s.createElement(i.Z.Control,{as:"textarea",rows:"3",ref:this.hexInput,onChange:()=>this.onHexChange()}),s.createElement(i.Z.Check,{ref:this.hexIgnoreFirstColumn,type:"checkbox",label:"Ignore First Column",onChange:()=>this.onHexChange()})))),s.createElement(a.Z,{eventKey:"base64",title:"Base64"},s.createElement(i.Z,null,s.createElement(i.Z.Group,{controlId:"exampleForm.ControlTextarea1"},s.createElement(i.Z.Control,{as:"textarea",rows:"3",onChange:e=>{let t=e.target.value.trim(),r=l.RG(t);this.props.onBuffer(r)},defaultValue:this.props.defaultBase64})))),s.createElement(a.Z,{eventKey:"file",title:"File"},s.createElement(i.Z,null,s.createElement(h.Z,{onDrop:e=>{return t=this,r=void 0,n=function*(){let t=e[0],r=yield t.arrayBuffer();this.props.onBuffer(r)},new((s=void 0)||(s=Promise))((function(e,a){function i(e){try{l(n.next(e))}catch(e){a(e)}}function o(e){try{l(n.throw(e))}catch(e){a(e)}}function l(t){var r;t.done?e(t.value):(r=t.value,r instanceof s?r:new s((function(e){e(r)}))).then(i,o)}l((n=n.apply(t,r||[])).next())}));var t,r,s,n}},(({getRootProps:e,getInputProps:t})=>s.createElement("div",Object.assign({},e()),s.createElement(o.Z,{className:"text-center"},s.createElement(o.Z.Body,null,s.createElement(o.Z.Text,null,"Drag and drop file here, or click to browse."),s.createElement("input",Object.assign({},t()))))))))))}}},5327:(e,t,r)=>{r.d(t,{V:()=>c});var s=r(7294),n=r(4536),a=r(4051),i=r(1555),o=r(1977);const l=16,h="#dedede";class c extends s.Component{constructor(e){super(e),this.scrollView=s.createRef(),this.state={format:"hex"}}setFormat(e){this.setState({format:e})}render(){return s.createElement(s.Fragment,null,s.createElement(n.Z,null,s.createElement(n.Z.Group,{as:a.Z},s.createElement(n.Z.Label,{column:!0,sm:2},"Format"),s.createElement(i.Z,{sm:10},s.createElement(n.Z.Control,{as:"select",value:this.state.format,onChange:e=>{this.setFormat(e.target.value)}},s.createElement("option",{value:"hex"},"Hex"),s.createElement("option",{value:"binary"},"Binary"))))),"hex"===this.state.format&&this.renderHex(),"binary"===this.state.format&&this.renderBinary())}componentDidUpdate(e){if(this.props.selected!==e.selected&&this.props.selected){const e=this.props.selected instanceof o.a?this.props.selected.byteStart:this.props.selected.enclosingByteRange().byteStart,t=Math.floor(e/l)*l;if(this.scrollView.current){const e=this.scrollView.current.querySelector(`[data-byte-start="${t}"]`);e&&e.scrollIntoView()}}}renderHex(){let e=this.props.data,t=Math.ceil(e.byteLength/l),r=0,n=Math.ceil(e.byteLength/l);if(t>this.props.maxRows)if(this.props.selected){const e=this.props.selected instanceof o.a?this.props.selected.byteStart:this.props.selected.enclosingByteRange().byteStart,t=Math.floor(e/l);r=Math.max(0,t-Math.floor((this.props.maxRows-1)/2)),n=r+this.props.maxRows}else r=0,n=r+this.props.maxRows;const a=e.byteLength-r*l;return e=e.bytes(r*l,Math.min(a,(n-r)*l)),s.createElement("div",{className:"border rounded",style:{maxHeight:"550px",overflowY:"scroll"},ref:this.scrollView},r>0?s.createElement("div",null,r," rows above..."):null,s.createElement("div",{style:{fontFamily:"monospace",overflowX:"scroll",display:"flex",flexDirection:"row"}},s.createElement("span",{style:{borderColor:"black",borderRight:"1px solid",paddingRight:"5px",paddingLeft:"5px",marginRight:"10px"}},e.chunks(l).map(((e,t)=>s.createElement("div",{key:t,"data-byte-start":e.byteStart.toString()},s.createElement("span",{style:{}},e.byteStart.toString(16).padStart(8,"0")))))),s.createElement("span",null,e.chunks(l).map(((e,t)=>s.createElement("div",{key:t},e.chunks(8).map(((e,t)=>s.createElement("span",{style:{paddingRight:"10px"},key:t},e.chunks(1).map(((e,t)=>{let r=!1;return this.props.selected&&(this.props.selected instanceof o.a?r=this.props.selected.contains(e):this.props.selected instanceof o.r&&(r=this.props.selected.enclosingByteRange().contains(e))),s.createElement("span",{style:{paddingRight:"5px",backgroundColor:r?h:""},key:t},e.toHex())})))))))))),n<t?s.createElement("div",null,t-n," rows below..."):null)}renderBinary(){let e=this.props.data;return e.byteLength>8*this.props.maxRows?s.createElement("div",null,"File is too large for binary view."):s.createElement("div",{style:{fontFamily:"monospace"}},e.chunks(8).map(((e,t)=>s.createElement("div",{key:t},e.chunks(4).map(((e,t)=>s.createElement("span",{style:{paddingRight:"10px"},key:t},e.chunks(1).map(((e,t)=>s.createElement("span",{style:{paddingRight:"5px"},key:t},e.bits(0).chunks(1).map(((e,t)=>{let r=!1;return this.props.selected&&(this.props.selected instanceof o.a?r=this.props.selected.contains(e.enclosingByteRange()):this.props.selected instanceof o.r&&(r=this.props.selected.contains(e))),s.createElement("span",{style:{backgroundColor:r?h:""},key:t},e.readBool()?"1":"0")}))))))))))))}}c.defaultProps={maxRows:1e3}},3855:(e,t,r)=>{r.d(t,{W:()=>c});var s=r(7294),n=r(4051),a=r(1555),i=r(5327),o=r(7625),l=r(1436);class h extends s.Component{constructor(e){super(e),this.state={open:this.props.depth<=1}}shouldComponentUpdate(e,t){if(this.props.tree!=e.tree)return!0;if(this.props.selected!=e.selected){let t=!!this.props.selected&&this.props.tree.isParentOf(this.props.selected),r=!!e.selected&&this.props.tree.isParentOf(e.selected);if(t||r)return!0}return this.state.open!==t.open}render(){let e=this.props.tree,t=this.props.depth||0,r="";return e.error&&(r="#ff6e6e"),this.props.selected==e&&(r="#dedede"),e.children.length>0?s.createElement("div",{style:{wordWrap:"break-word",backgroundColor:r,paddingLeft:"5px"}},s.createElement("div",{onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},s.createElement("span",{onClick:e=>{this.setState((e=>Object.assign(Object.assign({},e),{open:!e.open}))),e.stopPropagation()},style:{paddingRight:"5px"}},s.createElement(o.G,{icon:this.state.open?l.eW2:l.I4f})),s.createElement("span",null,e.label)),this.state.open&&e.children.map(((e,r)=>s.createElement("div",{key:r,style:{paddingLeft:"15px"}},s.createElement(h,{tree:e,depth:t+1,onSelect:this.props.onSelect,selected:this.props.selected}))))):s.createElement("div",{style:{backgroundColor:r,paddingLeft:"5px"},onClick:()=>{this.props.onSelect&&this.props.onSelect(e)}},e.label)}}h.defaultProps={depth:0};class c extends s.Component{constructor(e){super(e),this.state={}}render(){return s.createElement(s.Fragment,null,s.createElement(n.Z,{style:{maxHeight:"600px",marginTop:"10px"}},s.createElement(a.Z,{md:6},s.createElement("div",{className:"border rounded",style:{maxHeight:"600px",overflowY:"scroll"}},s.createElement(h,{tree:this.props.tree,selected:this.state.selected,onSelect:e=>this.setState({selected:e})}))),s.createElement(a.Z,{md:6},s.createElement(i.V,{data:this.props.data,selected:this.state.selected?this.state.selected.range:void 0}))))}}}}]);