import React from 'react';
import "./track.css";

let track = {
  name: '',
  artist: '',
  album: '',
};

class Track extends React.Component {
  render() {
    return() {
      <div className="Track">
        <div className="track-information">
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        <a className="Track-action"><!-- + or - will go here --></a>
      </div>
    }
  }

  renderAction() {
    if(isRemoval) {
      console.log("<p className="Track-action">-</p>");
    } console.log("<p className="Track-action">+</p>");
  }
};

export default track;
