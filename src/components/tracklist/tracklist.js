import React from 'react';
import './tracklist.css';

import Track from '../track/track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return <Track track={track}
              key={track.id}
              isRemoval={this.props.isRemoval}
              onAdd={this.props.addTrack}
              onRemove={this.props.removeTrack} />
        })}
      </div>
    );
  }
}

export default TrackList;
