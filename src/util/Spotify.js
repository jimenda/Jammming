let accessToken = '';
const clientID = '12327032fd3d4af0a10855a0c9c0fe17';
const redirectURI = 'https://jammming_bc.surge.sh/';

const Spotify = {
  getAccessToken() {
    if(accessToken) return accessToken;
    let token = window.location.href.match(/access_token=([^&]*)/);
    let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (token && expiresIn) {
      accessToken = token[1];
      const expiration = Number(expiresIn[1]);
      window.setTimeout(() => accessToken = '', expiration * 1000);
      window.history.pushState('Access Token', null, '/');
      return token;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  async search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {headers: {Authorization: `Bearer ${accessToken}`}}
    );
    let jsonResponse = await response.json();
    if(!jsonResponse.tracks) return [];
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

  async savePlaylist(playlistName, trackURIs) {
    if(!playlistName || trackURIs.length) return;
    const accessToken = Spotify.getToken();
    let response = await fetch(`https://api.spotify.com/v1/me`, {
          headers: headers
    });
    let jsonResponse = await response.json();
    let playlistId = jsonResponse.id;
    response = await fetch(
      `https://api.spotify.com/v1/users/${playlistId}/playlists`,
      {headers: {Authorization: `Bearer ${accessToken}`}, 'Content-Type': 'application/json',
      method: 'POST',
      body: JSON.stringify({trackURIs: trackURIs})
    });
  }
};

export default Spotify;
