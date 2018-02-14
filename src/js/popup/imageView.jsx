import React from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import secrets from './secrets.js';

const unsplash = new Unsplash({
  applicationId: secrets.UNSPLASH_APP_ID,
  secret: secrets.UNSPLASH_SECRET,
  callbackUrl: secrets.UNSPLASH_CALLBACK
});

export default class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    // Request for Photographs
    unsplash.search.photos('dogs', 1, 4)
      .then(toJson)
      .then(json => {
        this.setState({ images: json.results });
      });
  }

  render() {
    return (
      <div>
        {this.state.images.map(image => <img key={image.id} src={image.urls.small} alt="Smiley face" height="125" width="125" />)}
      </div>
    );
  }
}
