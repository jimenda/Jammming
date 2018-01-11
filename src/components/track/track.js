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
    <div className="track-information">
      <h3>{track.name}</h3>
      <p>{track.artist} | {track.album}</p>
    </div>
    }
  }
};

export default track;
