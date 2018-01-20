import React from 'react';
import './track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
  }

  render() {
    return (
      <div className="Track">
        <div className="track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
  //        <a className="Track-action">
  //          + or - will go here
  //        </a>
        </div>
      </div>
    )
  }

  addTrack(this.props.track) {
    this.props.onAdd({this.props.track});
  }

  removeTrack(this.props.track) {
    this.props.onRemove({this.props.track});
  }

  renderAction() {
    if(this.props.isRemoval) {
      return <a className = 'Track-action' onClick={this.removeTrack}>-</a>;
    } else {
      return <a className = 'Track-action' onClick={this.addTrack}>+</a>;
  }
}

export default Track;
