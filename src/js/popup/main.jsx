import React from 'react';
import { toJson } from 'unsplash-js';
import secrets from './secrets.js';
import axios from 'axios';
// import ImageView from './views/imageView';
// import WordView from './views/wordView';
import { ImageView, WordView, NavBar } from './views/index';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';

// import injectTapEventPlugin from 'react-tap-event-plugin';

// // Needed for onTouchTap
// // http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();
const Wrapper = styled.div`
display: grid;
grid-template-columns: repeat(8, 1fr);
grid-gap: 10px;
grid-auto-rows: 100px;
grid-template-areas: 
  "b b b b b a a a"
  "b b b b b a a a"
  "b b b b b a a a"
  "c c c c c a a a";
align-items: start;
width: 400px;
height: 400px;
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
    // if (!audioData.length) return (<div />);
    return (
      <div>
        {/* <AppBar
          title="Dogs"
        /> */}
        <NavBar />
        <Wrapper>
          <ImageView word={this.state.word} />
          <WordView word={this.state.word} />
          {this.state.audioData[0] && (
            <audio style={{ gridArea: 'c' }} controls>
              <source src={this.state.audioData[0].fileUrl} />
            </audio>
          )}
        </Wrapper>
      </div>
    );
  }
}

