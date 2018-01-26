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

    this.search=this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResult => {
      this.setState({searchResults: searchResult});
    });
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

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = this.state.playlist.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        searchResults: [],
        playlist: []
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlist}
              onRemove={this.removeTrack}
              updatePlaylistName={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
