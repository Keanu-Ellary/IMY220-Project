"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// CREATE APP
var app = (0, _express["default"])();

// RESOLVE PATH TO frontend/public
var publicPath = _path["default"].resolve("../D1/frontend/public");
var pathToPages = _path["default"].resolve("../D1/frontend/src/pages");

// SERVE STATIC FILES FROM frontend/public
app.use(_express["default"]["static"](publicPath));
app.use(_express["default"]["static"](pathToPages));

// FALLBACK TO index.html FOR REACT ROUTES
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(publicPath, "index.html"));
});
app.get('/home', function (req, res) {
  res.sendFile(_path["default"].join(publicPath, "home.html"));
});
app.get('/playlists', function (req, res) {
  res.sendFile(_path["default"].join(pathToPages, "playlist.html"));
});
app.get('/profile.html/:id', function (req, res) {
  res.sendFile(_path["default"].join(pathToPages, "profile.html"));
  alert(_path["default"]);
});

// PORT TO LISTEN TO
app.listen(3000, function () {
  console.log("Listening on http://localhost:3000");
});