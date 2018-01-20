import React from "react";
import "./playlist.css";
import TrackList from "../tracklist/tracklist";

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.onNameChange=this.onNameChange.bind(this);
  }

  handleNameChange(defaultValue) {
    onNameChange(defaultValue);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.props.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
};

export default Playlist;
