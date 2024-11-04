"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _child_process = require("child_process");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// CREATE APP
var app = (0, _express["default"])();

// RESOLVE PATH TO frontend/public
var publicPath = _path["default"].resolve("../D2/frontend/public");
var pathToPages = _path["default"].resolve("../D2/frontend/src/pages");

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
var apiProcess = (0, _child_process.spawn)('node', ['backend/api.js'], {
  stdio: 'inherit',
  shell: true
});
apiProcess.on('error', function (err) {
  console.error('Start up failed:', err);
});
apiProcess.on('exit', function (code) {
  console.log("api.js process exited with ".concat(code));
});

// PORT TO LISTEN TO
app.listen(3000, function () {
  console.log("Listening on http://localhost:3000");
});