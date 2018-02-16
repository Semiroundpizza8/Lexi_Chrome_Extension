import React from 'react';
import { toJson } from 'unsplash-js';
import secrets from '../secrets.js';
import axios from 'axios';
import styled from 'styled-components';


const WordStyle = styled.div`
  padding-left: 4px;
  grid-area: b;
`;

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
    let definitionEnd = `definitions?limit=200&includeRelated=false&sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=${secrets.WORDNIK_API_KEY}`;
    let word = this.props.word;

    axios.get(`${wordnikStart}/${word}/${definitionEnd}`)
      .then(toJson)
      .then(item => {
        console.log('makingRequest for def', item.data);
        this.setState({ definition: item.data });
      });
  }

  render() {
    if (!this.state.definition.length) return (<p>Loading Words</p>);
    return (
      <WordStyle>
        {this.state.definition.map(def => <p key={def.text}>{def.text}</p>)}
        <p>{this.state.definition[0].text}</p>
      </WordStyle>
    );
  }
}

// IDEA INSERT: Add in Fuzzy Search - able to look up words with the letters in any order.
