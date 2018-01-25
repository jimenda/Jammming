import React from "react";
import "./playlist.css";
import TrackList from "../tracklist/tracklist";

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.props.playlistName} onChange={this.handleNameChange} />
        <TrackList
          tracks={this.props.playlist}
          onAdd={this.props.onAdd}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
};

export default Playlist;
