import React from 'react';
import { toJson } from 'unsplash-js';
import secrets from './secrets.js';
import axios from 'axios';
import ImageView from './views/imageView';
import WordView from './views/wordView';
import styled from 'styled-components';

// import injectTapEventPlugin from 'react-tap-event-plugin';

// // Needed for onTouchTap
// // http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`;


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: 'dog',
      audioData: []
    };
  }
  componentDidMount() {
    let wordnikStart = 'http://api.wordnik.com:80/v4/word.json';
    let audioEnd = `audio?useCanonical=false&limit=50&api_key=${secrets.WORDNIK_API_KEY}`;
    let word = this.state.word;

    // Request for audio
    axios.get(`${wordnikStart}/${word}/${audioEnd}`)
      .then(toJson)
      .then(item => {
        this.setState({ audioData: item.data });
      });
  }

  render() {
    let audioData = this.state.audioData;
    console.log(this.state.word);
    // if (!audioData.length) return (<div />);
    return (
      <div>
        <input onChange={(event) => this.setState({ word: event.target.value })} />
        <Wrapper>
          <ImageView word={this.state.word} />
          <WordView word={this.state.word} />
          {/* <audio controls>
            <source src={this.state.audioData[0].fileUrl} />
          </audio> */}
        </Wrapper>
      </div>
    );
  }
}

