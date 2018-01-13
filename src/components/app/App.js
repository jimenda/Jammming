import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from "./searchbar";
import SearchResults from "./searchresults";
import Playlist from "./playlist";

className App extends Component {
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults component />
            <Playlist component />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
