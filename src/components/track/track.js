import React from 'react';
import './track.css';

class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
          <a className="Track-action">
  //          + or - will go here
          </a>
        </div>
      </div>
    )
  }

//  renderAction = function() {
//    if(isRemoval) {
//      console.log("<p className = 'Track-action'>-</p>");
//    } console.log("<p className = 'Track-action'>+</p>");
//  }
}

export default Track;
