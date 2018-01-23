let token = '12327032fd3d4af0a10855a0c9c0fe17';
const clientID = '';
const redirectURI = '';

const Spotify = {
  getToken() {
    if(token) return token;
    let match = window.location.href.match(/access_token=([^&]*)/);
    let expires = window.location.href.match(/expires_in=([^&]*)/);
    if (match && expires) {
      token = match[1];
      const expiration = Number(expires[1]);
      window.setTimeout(() => token = '', expires * 1000);
      window.history.pushState('Access Token', null, '/');
      return token;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  async search(searchTerm) {
    let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {headers: {Authorization: `Bearer ${token}`}}
    );
    if(response.ok) {
      let jsonResponse = await response.json();
      if(!jsonResponse.tracks) return [];
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.album.name,
        uri: track.uri
      }));
    }
  },

  async savePlaylist(playlistName, trackURIs) {
    if(!playlistName || trackURIs.length) return;
    const accessToken = Spotify.getToken();
    let response = await fetch(`https://api.spotify.com/v1/me`, {
          headers: {Authorization: `Bearer ${token}`}
    });
    let jsonResponse = await response.json();
    let playlistId = jsonResponse.id;
    response = await fetch(
      `https://api.spotify.com/v1/users/${playlistId}/playlists`,
      {headers: {Authorization: `Bearer ${token}`}, 'Content-Type': 'application/json',
      method: 'POST',
      body: JSON.stringify({trackURIs: trackURIs})
    });
  }
};

export default Spotify;
