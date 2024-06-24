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
  var spotifyData, playing, isPlaying;
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
          playing = spotifyData.playing, isPlaying = spotifyData.isPlaying;
          RPC.setActivity({
            details: "Listening To Spotify",
            state: "".concat(playing.track.title, " by ").concat(playing.artists[0].name, " on ").concat(playing.album.title),
            largeImageKey: playing.album.image,
            largeImageText: playing.album.title,
            startTimestamp: playing.meta.start,
            endTimestamp: playing.meta.end,
            buttons: [{
              label: "Listen on Spotify",
              url: playing.track.url
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
} // Function to optimize Discord API requests


function optimizeDiscordAPIRequests() {
  var spotifyData, isPlaying;
  return regeneratorRuntime.async(function optimizeDiscordAPIRequests$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch('https://spotify.thefemdevs.com/playing/nezha').then(function (res) {
            return res.json();
          }));

        case 2:
          spotifyData = _context3.sent;
          isPlaying = spotifyData.isPlaying;
          setInterval(function () {
            while (isPlaying === true) {
              var spotifyTrack = spotifyData.playing.track.title;

              if (spotifyTrack !== null && spotifyTrack !== undefined) {
                updateDiscordRPCWithSpotify();
                console.dir(spotifyData);
                return;
              } else {
                continue;
              }
            }
          }, 500);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

RPC.on("ready", function _callee() {
  return regeneratorRuntime.async(function _callee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          updateDiscordRPCWithSpotify();
          setInterval(function () {
            optimizeDiscordAPIRequests();
          }, 15e3);

        case 2:
        case "end":
          return _context4.stop();
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
