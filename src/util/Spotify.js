let accessToken;
let expiresIn;
const clientID = '12327032fd3d4af0a10855a0c9c0fe17';
const redirectURI = 'http://localhost:3000';

let Spotify = {
  getAccessToken() {
    if(accessToken) {return accessToken};
    const spotifyToken = window.location.href.match(/access_token=([^&]*)/);
    const spotifyExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if(spotifyToken && spotifyExpiresIn) {
      accessToken = spotifyToken[1];
      expiresIn = spotifyExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
//      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {headers: {Authorization: `Bearer ${accessToken}`}}
    ).then(response => response.json()
    ).then(jsonResponse => {
      if(!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      })
      }
    );
  },

  async savePlaylist(name, uris) {
    if(!name || !uris.length) return;
    const token = Spotify.getAccessToken();
    let response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {Authorization: `Bearer ${token}`}
    });
    let jsonResponse = await response.json();
    let userId = jsonResponse.id;
    response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({name: name})
    });
    jsonResponse = await response.json();
    let playlistId = jsonResponse.id;
    return await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({uris: uris})
    });
  };
  console.log('Playlist Saved')
};

export default Spotify;
