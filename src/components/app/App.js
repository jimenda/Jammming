import React from 'react';
import './app.css';
import SearchBar from '../searchbar/searchbar';
import SearchResults from '../searchresults/searchresults';
import Playlist from '../playlist/playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlist: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.search=this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlist;
    if(!tracks.find(obj => obj.id === track.id)) {
      tracks.push(track);
      this.setState({playlist: tracks});
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlist;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlist: tracks});
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlist: []
      });
    });
  }

  updatePlaylistName(name) {
    this.state({playlistName: name});
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        console.log('debug1');
          <SearchBar onSearch={this.search} />
          console.log('debug2');
          <div className="App-playlist">
          console.log('debug3');
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            console.log('debug4');
            <Playlist
              playlistName="My Playlist"
              playlistTracks={this.state.playlist}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
            console.log('debug5');
          </div>
        </div>
      </div>
    );
  }
}

export default App;
