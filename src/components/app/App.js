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
      searchResults: [
        {name:"Pour Some Sugar On Me", artist:"Def Leppard", album:"Hysteria"}
      ]
    };
  }
//    const playlistName = "Brenda's List";
//    const playlistTracks = {this.state.name, this.state.artist, this.state.album};

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.playlistName} playlistTracks={this.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
