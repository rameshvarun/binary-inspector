export class TreeBinaryView extends React.Component<
  { data: ByteRange; tree: Tree },
  {}
> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            <TreeView
              tree={this.state.tree}
              onSelect={selected => {
                if (this.state.kind == "hasData") {
                  this.setState({ kind: "hasData", selected: selected });
                }
              }}
            />
          </Col>
          <Col>
            <BinaryView
              data={this.state.data}
              selected={
                this.state.selected ? this.state.selected.range : undefined
              }
            />
          </Col>
        </Row>
      </>
    );
  }
}
