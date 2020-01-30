import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimpleInspector } from "../ui/simpleinspector";
import { Container } from "react-bootstrap";
import { inspect } from "../decoders/opus";

ReactDOM.render(
  <Container>
    <div className="page-header">
      <h1>Opus Packet Inspector</h1>
      Based off <a href="https://tools.ietf.org/html/rfc6716">RFC 6716</a>.
      <hr />
    </div>
    <SimpleInspector inspect={inspect} />
  </Container>,
  document.getElementById("root")
);
