import * as React from "react";
import * as ReactDOM from "react-dom";
import { inspect } from "../decoders/ogg";
import { SimpleInspector } from "../ui/simpleinspector";

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
