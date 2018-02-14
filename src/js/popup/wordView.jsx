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
        <h2>{this.state.word}</h2>
        <p>{wordData[0].text}</p>
      </div>
    )
  }
}