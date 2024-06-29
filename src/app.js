const clientId = "1254145695762485248";
const DiscordRPC = require("discord-rpc");
const RPC = new DiscordRPC.Client({ transport: "ipc" });
const crypto = require("crypto");

let trackPlaying = crypto.createHash('sha256').update('trackPlaying').digest('hex');

// Function to update Discord RPC with Spotify track information
async function updateDiscordRPCWithSpotify() {
    let spotifyData = await fetch('https://spotify.thefemdevs.com/playing/nezha').then(res => res.json());
    console.dir(spotifyData);
    if (!RPC) {
        return;
    }

    const { playing, isPlaying } = spotifyData;

    if (!isPlaying) return;

    if (trackPlaying === crypto.createHash('sha256').update(playing.track.title).digest('hex')) {
        return;
    }

    trackPlaying = crypto.createHash('sha256').update(playing.track.title).digest('hex');

    RPC.setActivity({
        details: "Listening To Spotify",
        state: `${playing.track.title} by ${playing.artists[0].name} on ${playing.album.title}`,
        largeImageKey: playing.album.image,
        largeImageText: playing.album.title,
        startTimestamp: playing.meta.progress.start, // Timestamp of when the song started playing
        endTimestamp: playing.meta.progress.end, // Timestamp of when the song will end
        buttons: [
            { label: "Listen on Spotify", url: playing.track.url },
            { label: "Website", url: "https://nezha.thefemdevs.com"},
        ],
    })


}

// Function to optimize Discord API requests

setInterval(updateDiscordRPCWithSpotify, 5e3); // Check every 5 seconds. Adjust to 10000 for 10 seconds if preferred.

// Login to Discord RPC

RPC.login({ clientId }).catch(err => console.error(err));

; // Start optimizing Discord API requests
