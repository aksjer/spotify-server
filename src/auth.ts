export function auth() {
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      'bb091685278c48a6bd694ab6c0b51395' +
      '&scope=' +
      encodeURIComponent('user-read-private user-read-email') +
      '&redirect_uri=' +
      encodeURIComponent('http://localhost:3000' as string)
  );
}
