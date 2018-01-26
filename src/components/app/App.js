import React from 'react';
import './app.css';
import SearchBar from '../searchbar/searchbar';
import SearchResults from '../searchresults/searchresults';
import Playlist from '../playlist/playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

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
    if(!this.state.playlist.includes(track.id)) {
      this.state.playlist.push(track);
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlist;
    this.setState({playlist: this.state.tracks.filter(currentTrack => currentTrack.id !== track.id)});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name.target.value});
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

  search(searchTerm) {
    console.log('Debug App Search')
    Spotify.search(searchTerm).then(searchResult => {
      this.setState({searchResults: searchResult});
    });
    console.log(this.state.searchResults);
  }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            {console.log('Playlist Track:')}
            {console.log(this.state.searchResults)}
            {console.log('End.')}
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlist}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
