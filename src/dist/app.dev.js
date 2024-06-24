"use strict";

var clientId = "1254145695762485248";

var DiscordRPC = require("discord-rpc");

var RPC = new DiscordRPC.Client({
  transport: "ipc"
});

function spotifyJSONfetch(url) {
  var spotifyData;
  return regeneratorRuntime.async(function spotifyJSONfetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('https://spotify.thefemdevs.com/playing/nezha').then(function (res) {
            return res.json();
          }));

        case 2:
          spotifyData = _context.sent;
          console.log(spotifyData);
          return _context.abrupt("return", spotifyData);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

spotifyJSONfetch(); // Function to update Discord RPC with Spotify track information

function updateDiscordRPCWithSpotify() {
  var spotifyData, _spotifyData$song, name, artists, album, url;

  return regeneratorRuntime.async(function updateDiscordRPCWithSpotify$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch('https://spotify.thefemdevs.com/playing/nezha').then(function (res) {
            return res.json();
          }));

        case 2:
          spotifyData = _context2.sent;
          console.dir(spotifyData);

          if (RPC) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return");

        case 6:
          _spotifyData$song = spotifyData.song, name = _spotifyData$song.name, artists = _spotifyData$song.artists, album = _spotifyData$song.album, url = _spotifyData$song.url;
          RPC.setActivity({
            details: "Listening To Spotify",
            state: "".concat(name, " by ").concat(artists, " on ").concat(album),
            largeImageKey: "spotify",
            largeImageText: album,
            buttons: [{
              label: "Listen on Spotify",
              url: url
            }, {
              label: "Website",
              url: "https://nezha.thefemdevs.com"
            }]
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

RPC.on("ready", function _callee() {
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          updateDiscordRPCWithSpotify();
          setInterval(function () {
            updateDiscordRPCWithSpotify();
          }, 15e3);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
RPC.login({
  clientId: clientId
})["catch"](function (err) {
  return console.error(err);
});
//# sourceMappingURL=app.dev.js.map
