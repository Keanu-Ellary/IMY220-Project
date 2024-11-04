const express = require('express');
const path = require('path');

// CREATE APP
const app = express();

// RESOLVE PATH TO frontend/public
const publicPath = path.resolve("../D2/public");
const pathToPages = path.resolve("../D2/src/pages");

// SERVE STATIC FILES FROM frontend/public
app.use(express.static(publicPath));
app.use(express.static(pathToPages));

// FALLBACK TO index.html FOR REACT ROUTES
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(publicPath, "home.html"));
});

app.get('/playlists', (req, res) => {
  res.sendFile(path.join(pathToPages, "playlist.html"));
});

app.get('/profile.html/:id', (req, res) => {
  res.sendFile(path.join(pathToPages, "profile.html"));
  alert(path);
});

// PORT TO LISTEN TO
app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});