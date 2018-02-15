import React from "react";
import { toJson } from 'unsplash-js';
import secrets from './secrets.js';
import axios from 'axios';

export default class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      definition: [],
    };
  }

  componentDidMount() {
    // Request for Definition
    let wordnikStart = 'http://api.wordnik.com:80/v4/word.json';
    let definitionEnd = `definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${secrets.WORDNIK_API_KEY}`;
    let word = 'dog';

    axios.get(`${wordnikStart}/${word}/${definitionEnd}`)
      .then(toJson)
      .then(item => {
        this.setState({ definition: item.data });
      });
  }

  render() {
    console.log("Def", this.state.definition);
    if (!this.state.definition.length) return (<div />)
    return (
      <div>
        <h2>Hello</h2>
        <p>{this.state.definition[0].text}</p>
      </div>
    )
  }
}