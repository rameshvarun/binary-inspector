import { ByteRange, BitRange } from "../core/range";
import { Tree } from "../core/tree";
import { assert } from "chai";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { BinaryInput } from "../ui/binaryinput";
import { BinaryView } from "../ui/binaryview";
import { TreeView } from "../ui/treeview";
import { TreeBinaryView } from "../ui/treebinaryview";

import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  FormControl
} from "react-bootstrap";

import * as persist from "../core/persist";
import * as utils from "../core/utils";

type DataState =
  | { kind: "noData" }
  | { kind: "hasData"; data: ByteRange }
  | {
      kind: "decodeSuccess";
      data: ByteRange;
      tree: Tree;
    }
  | {
      kind: "decodeFailure";
      data: ByteRange;
      error: Error;
    };

type CodeState =
  | { kind: "noCode" }
  | { kind: "evalFailure"; error: Error }
  | { kind: "evalSuccess"; inspect: (range: ByteRange) => Tree };

type CustomInspectorState = { data: DataState; code: CodeState };

function inspect(range: ByteRange): Tree {
  return new Tree(`Test Tree`, range, []);
}

function LoadScript(href, integrity) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "application/javascript";
    script.src = href;
    script.crossOrigin = "anonymous";
    script.integrity = integrity;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

const aceEditor = LoadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.min.js",
  "sha512-GoORoNnxst42zE3rYPj4bNBm0Q6ZRXKNH2D9nEmNvVF/z24ywVnijAWVi/09iBiVDQVf3UlZHpzhAJIdd9BXqw=="
).then(() =>
  LoadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-javascript.min.js",
    "sha512-ZxMbXDxB0Whct+zt+DeW/RZaBv33N5D7myNFtBGiqpDSFRLxn2CNp6An0A1zUAJU/+bl8CMVrwxwnFcpFi3yTQ=="
  )
);

// @ts-ignore
window.Tree = Tree;

const DEFAULT_CODE = `((range) => {
  return new Tree("Example Tree", range, []);
})`;

class CustomInspector extends React.Component<{}, CustomInspectorState> {
  constructor(props) {
    super(props);

    this.state = {
      data: { kind: "noData" },
      code: { kind: "noCode" }
    };
  }

  componentDidMount() {
    aceEditor.then(() => {
      // @ts-ignore
      document.getElementById("code-editor-textarea")?.style.display = "none";
      // @ts-ignore
      document.getElementById("code-editor")?.style.display = "block";
      // @ts-ignore
      let editor = ace.edit("code-editor");
      // @ts-ignore
      editor
        .getSession()
        .setValue(document.getElementById("code-editor-textarea")?.value);
      editor.session.setMode("ace/mode/javascript");
    });

    if (persist.has("data")) {
      let base64 = persist.get("data")!;
      let buffer = utils.base64ToArrayBuffer(base64);
      this.loadBuffer(buffer);
    }

    if (persist.has("code")) {
      this.loadCode(persist.get("code"));
    } else {
      this.loadCode(DEFAULT_CODE);
    }
  }

  loadCode(code) {
    persist.set("code", code);
    try {
      let inspectFunc = eval(code);
      this.setState(
        { code: { kind: "evalSuccess", inspect: inspectFunc } },
        () => this.tryDecode()
      );
    } catch (e) {
      this.setState({ code: { kind: "evalFailure", error: e } });
    }
  }

  loadBuffer(buffer) {
    persist.set("data", utils.arrayBufferToBase64(buffer));
    let data = new ByteRange(buffer, 0, buffer.byteLength);

    this.setState(
      {
        data: { kind: "hasData", data: data }
      },
      () => this.tryDecode()
    );
  }

  tryDecode() {
    if (
      this.state.code.kind === "evalSuccess" &&
      this.state.data.kind !== "noData"
    ) {
      let inspect = this.state.code.inspect;
      let data = this.state.data.data;
      try {
        let tree = inspect(data);
        this.setState({
          data: { kind: "decodeSuccess", data: data, tree: tree }
        });
      } catch (e) {
        this.setState({
          data: { kind: "decodeFailure", data: data, error: e }
        });
      }
    }
  }

  render() {
    return (
      <>
        <Row>
          <Col md={6}>
            <Form.Control
              id="code-editor-textarea"
              as="textarea"
              rows="3"
              onChange={e => {
                // @ts-ignore
                let code = e.target.value;
                this.loadCode(code);
              }}
              defaultValue={
                persist.has("code") ? persist.get("code") : DEFAULT_CODE
              }
            />
            <div
              style={{ width: "100%", height: "500px", display: "none" }}
              id="code-editor"
            ></div>
          </Col>
          <Col md={6}>
            {" "}
            <BinaryInput
              inputName="input"
              defaultBase64={persist.get("data")}
              onBuffer={buffer => this.loadBuffer(buffer)}
            />
          </Col>
        </Row>

        <hr />
        {this.state.data.kind == "decodeSuccess" && (
          <TreeBinaryView
            tree={this.state.data.tree}
            data={this.state.data.data}
          />
        )}
        {this.state.data.kind == "decodeFailure" && (
          <Row>
            <Col md={6}>
              <Alert variant="danger">
                <Alert.Heading>
                  {this.state.data.error.toString()}
                </Alert.Heading>
                <code>
                  <pre>{this.state.data.error.stack}</pre>
                </code>
              </Alert>
            </Col>
            <Col md={6}>
              <BinaryView data={this.state.data.data} />
            </Col>
          </Row>
        )}
        {this.state.code.kind == "evalFailure" && (
          <Row>
            <Alert variant="danger">
              <Alert.Heading>{this.state.code.error.toString()}</Alert.Heading>
              <code>
                <pre>{this.state.code.error.stack}</pre>
              </code>
            </Alert>
          </Row>
        )}
        {this.state.data.kind == "noData" && <div>No data provided yet.</div>}
      </>
    );
  }
}

ReactDOM.render(<CustomInspector />, document.getElementById("root"));
