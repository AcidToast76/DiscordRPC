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
});
RPC.login({
  clientId: clientId
})["catch"](function (err) {
  return console.error(err);
});
//# sourceMappingURL=app.dev.js.map
