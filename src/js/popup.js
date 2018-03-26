import '../css/popup.css';
import Greeting from './popup/main.jsx';
import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let bgpage = chrome.extension.getBackgroundPage();
let word = bgpage.word.trim();

console.log("WORD", word);

const App = () => (
  <MuiThemeProvider>
    <Greeting />
  </MuiThemeProvider>
);

render(
  <App />,
  window.document.getElementById('app-container')
);
