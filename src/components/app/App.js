import React, { Component } from 'react';
//import logo from './logo.svg';
import './app.css';
import SearchBar from '../searchbar/searchbar';
import SearchResults from '../searchresults/searchresults';
import Playlist from '../playlist/playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: ["Pour Some Sugar On Me", "Def Leppard", "Hysteria"]
    };

    this.addTrack() = this.addTrack.bind(this);
    this.removeTrack() = this.removeTrack.bind(this);
    this.savePlaylist()=this.avePlaylist.bind(this);
  }
//    const playlistName = "Brenda's List";
//    const playlistTracks = {this.state.name, this.state.artist, this.state.album};

  addTrack(track) {
    if(this.props.playlistTracks.indexOf(this.props.track.id) = 0) {
      playlistTracks.setState(playlistTracks.push(this.props.track.id));
    }
  }

  removeTrack(track) {
    if(this.props.playlistTracks.indexOf(this.props.track.id) !== 0) {
      playlistTracks.setState(playlistTracks.filter(item => item !== this.props.track.id));
    } else {

    }
  }

  savePlaylist() {
    let trackURIs = {this.state.playlistTracks.map(playlistURIs => this.state.playlistTracks)};
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName="My Playlist" playlistTracks=[[Pour Some Sugar On Me, Def Leppard, Hysteria], [Pour Some Sugar On Me, Def Leppard, Hysteria], [Pour Some Sugar On Me, Def Leppard, Hysteria]] onAdd={this.props.addTrack} onRemove={this.props.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
