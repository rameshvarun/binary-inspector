import * as React from "react";
import * as ReactDOM from "react-dom";

import { SimpleInspector } from "../ui/simpleinspector";
import { inspect } from "../decoders/red";

ReactDOM.render(
  <SimpleInspector inspect={inspect} />,
  document.getElementById("root")
);
