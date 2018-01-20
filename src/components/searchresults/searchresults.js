import React from "react";
import "./searchresults.css";
import TrackList from "../tracklist/tracklist";

const track = {
  name: 'Pour Some Sugar On Me',
  artist: 'Def Leppard',
  album: 'Hysteria'
};

const tracks = [
  track,
  track,
  track
];

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
      </div>
    );
  }
}

export default SearchResults;
