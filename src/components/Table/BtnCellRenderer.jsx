import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
  }
  render() {
    return <button onClick={this.btnClickedHandler}>Click Me!</button>;
  }
}

export default BtnCellRenderer;
