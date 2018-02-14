import React from "react";

let renderCount = 0;
export default class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>Hello</h2>
        <p>Word Text Here</p>
      </div>
    )
  }
}