import React from 'react';
import { toJson } from 'unsplash-js';
import secrets from './secrets.js';
import axios from 'axios';
import { Paper } from 'material-ui';
import ImageView from './imageView.jsx';
import WordView from './wordView.jsx';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// // Needed for onTouchTap
// // http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      word: 'dog',
      definition: [],
      audioData: []
    }
  }
  componentDidMount() {
    let wordnikStart = 'http://api.wordnik.com:80/v4/word.json';
    let definitionEnd = `definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${secrets.WORDNIK_API_KEY}`;
    let audioEnd = `audio?useCanonical=false&limit=50&api_key=${secrets.WORDNIK_API_KEY}`;
    let word = this.state.word;

    // Request for Definition
    axios.get(`${wordnikStart}/${word}/${definitionEnd}`)
      .then(toJson)
      .then(item => {
        console.log('wordData', item.data);
        this.setState({ definition: item.data });
      });

    // Request for audio
    axios.get(`${wordnikStart}/${word}/${audioEnd}`)
      .then(toJson)
      .then(item => {
        console.log('audio', item.data);
        this.setState({ audioData: item.data });
      });
  }
  render() {
    let wordData = this.state.definition;
    let audioData = this.state.audioData;
    if (!wordData.length || !audioData.length) return (<div />);
    return (
      <div>
        <ImageView />
        <wordView />
        <audio controls>
          <source src={this.state.audioData[0].fileUrl} />
        </audio>
      </div>
    );
  }
}

