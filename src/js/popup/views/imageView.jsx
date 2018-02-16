import React from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import secrets from '../secrets.js';
import styled from 'styled-components';

const unsplash = new Unsplash({
  applicationId: secrets.UNSPLASH_APP_ID,
  secret: secrets.UNSPLASH_SECRET,
  callbackUrl: secrets.UNSPLASH_CALLBACK
});

const ImageStyled = styled.div`
  grid-area: a;
`;

export default class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    // Request for Photographs
    unsplash.search.photos(this.props.word, 1, 3)
      .then(toJson)
      .then(json => {
        this.setState({ images: json.results });
      });
  }

  render() {
    if (!this.state.images.length) return (<p>Loading Images</p>);
    return (
      <ImageStyled>
        {this.state.images.map(image => <img key={image.id} src={image.urls.small} height="125" width="143.75" />)}
      </ImageStyled>
    );
  }
}
