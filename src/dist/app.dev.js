"use strict";

var clientId = "1254145695762485248";

var DiscordRPC = require("discord-rpc");

var RPC = new DiscordRPC.Client({
  transport: "ipc"
});
DiscordRPC.register(clientId);

function spotifyrpc(url) {
  var spotifyRPC;
  return regeneratorRuntime.async(function spotifyrpc$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://spotify.thefemdevs.com/playing/nezha").then(function (res) {
            return res.json();
          }));

        case 2:
          spotifyRPC = _context.sent;
          console.log(spotifyRPC);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

spotifyrpc();

function setActivity() {
  return regeneratorRuntime.async(function setActivity$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (RPC) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return");

        case 2:
          RPC.setActivity({
            details: "Playing a game",
            state: "In the menu",
            largeImageKey: "large",
            largeImageText: "Large Image",
            smallImageKey: "small",
            smallImageText: "Small Image",
            instance: false,
            buttons: [{
              label: "Website",
              url: "https://nezha.thefemdevs.com"
            }, {
              label: "Spotify",
              url: "https://open.spotify.com/user/hpjv09y99ucx7adf3jb6qijvp?si=40ac1fa71e7d44ee"
            }]
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function setSpotifyRPC() {
  return regeneratorRuntime.async(function setSpotifyRPC$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (RPC) {
            _context3.next = 2;
            break;
          }

          return _context3.abrupt("return");

        case 2:
          RPC.setActivity({
            details: "Listening to Spotify",
            state: "Warframe Bops",
            largeImageKey: "large",
            largeImageText: "Large Image",
            smallImageKey: "small",
            smallImageText: "Small Image",
            instance: false,
            buttons: [{
              label: "Website",
              url: "https://nezha.thefemdevs.com"
            }, {
              label: "Spotify",
              url: "https://open.spotify.com/user/hpjv09y99ucx7adf3jb6qijvp?si=40ac1fa71e7d44ee"
            }]
          });

        case 3:
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
          setActivity();
          setInterval(function () {
            setActivity();
          }, 15e3);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // Function to fetch the currently playing track from Spotify

function fetchCurrentlyPlayingTrack() {
  var response, data;
  return regeneratorRuntime.async(function fetchCurrentlyPlayingTrack$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(fetch("https://spotify.thefemdevs.com/playing/nezha", {}));

        case 2:
          response = _context5.sent;

          if (response.ok) {
            _context5.next = 5;
            break;
          }

          throw new Error("Failed to fetch currently playing track");

        case 5:
          _context5.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context5.sent;
          return _context5.abrupt("return", {
            trackName: data.item.name,
            artistName: data.item.artists.map(function (artist) {
              return artist.name;
            }).join(", "),
            trackUrl: data.item.external_urls.spotify
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
} // Function to update Discord RPC with Spotify track information


function updateDiscordRPCWithSpotify() {
  var _ref, trackName, artistName, trackUrl;

  return regeneratorRuntime.async(function updateDiscordRPCWithSpotify$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(fetchCurrentlyPlayingTrack(accessToken));

        case 3:
          _ref = _context6.sent;
          trackName = _ref.trackName;
          artistName = _ref.artistName;
          trackUrl = _ref.trackUrl;
          RPC.setActivity({
            details: "Listening to ".concat(trackName),
            state: "by ".concat(artistName),
            largeImageKey: "spotify",
            buttons: [{
              label: "Listen on Spotify",
              url: trackUrl
            }]
          });
          _context6.next = 13;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error("Failed to update Discord RPC with Spotify:", _context6.t0);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
} // Example usage


RPC.on("ready", function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          updateDiscordRPCWithSpotify();
          setInterval(updateDiscordRPCWithSpotify, 15e3); // Update every 15 seconds

        case 2:
        case "end":
          return _context7.stop();
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
