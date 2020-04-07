import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimpleInspector } from "../ui/simpleinspector";
import { Container } from "react-bootstrap";
import { inspect } from "../decoders/opus";

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
