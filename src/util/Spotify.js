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
    console.log('Debug Spotify Search')
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {headers: {Authorization: `Bearer ${accessToken}`}}
    ).then(response => response.json()
    ).then(jsonResponse => {
      console.log(jsonResponse)
      if(!jsonResponse.tracks) {
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
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if(!playlistName || !trackURIs || trackURIs.length === 0) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userID;
    let playlistID;

    return fetch(`https://api.spotify.com/v1/me`, {
          headers: headers
    }).then(response => response.json())
    .then(jsonResponse => userID = jsonResponse.id)
    .then(() => {
      return fetch(
        `https://api.spotify.com/v1/users/${playlistID}/playlists`,
        {headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName})}
      )
      .then(response => response.json())
      .then(jsonResponse => {
        return fetch (`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({uris: trackURIs})
        })
      })
    });
  }
};

export default Spotify;
