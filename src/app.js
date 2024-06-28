const clientId = "1254145695762485248";
const DiscordRPC = require("discord-rpc");
const RPC = new DiscordRPC.Client({ transport: "ipc" });

async function spotifyJSONfetch(url) {
    let spotifyData = await fetch('https://spotify.thefemdevs.com/playing/nezha').then(res => res.json())
    console.log(spotifyData)
    return spotifyData;
}

spotifyJSONfetch();


// Function to update Discord RPC with Spotify track information
async function updateDiscordRPCWithSpotify() {
    let spotifyData = await fetch('https://spotify.thefemdevs.com/playing/nezha').then(res => res.json());
    console.dir(spotifyData);
    if(!RPC) {
        return;
    }

    const { playing, isPlaying } = spotifyData;
    
    RPC.setActivity({
        details: "Listening To Spotify",
        state: `${playing.track.title} by ${playing.artists[0].name} on ${playing.album.title}`,
        largeImageKey: playing.album.image,
        largeImageText: playing.album.title,
        startTimestamp: playing.meta.start,
        endTimestamp: playing.meta.end,
        buttons: [
            { label: "Listen on Spotify", url: playing.track.url },
            { label: "Website", url: "https://nezha.thefemdevs.com"},
        ],
    })


}

// Function to optimize Discord API requests

async function optimizeDiscordAPIRequests() {
    let lastSpotifyTrack = null;

    setInterval(async () => {
        try {
            let spotifyData = await fetch('https://spotify.thefemdevs.com/playing/nezha').then(res => res.json());
            let isPlaying = spotifyData.isPlaying;
            let currentSpotifyTrack = spotifyData.playing?.track?.title;

            if (isPlaying && currentSpotifyTrack !== lastSpotifyTrack) {
                await updateDiscordRPCWithSpotify(); // Ensure RPC is updated before proceeding
                console.log(`Updated Discord RPC with: ${currentSpotifyTrack}`);
                lastSpotifyTrack = currentSpotifyTrack; // Update the last track to the current one
            }
        } catch (error) {
            console.error("Failed to update Discord RPC:", error);
        }
    }, 5000); // Check every 5 seconds. Adjust to 10000 for 10 seconds if preferred.
}

// Login to Discord RPC

optimizeDiscordAPIRequests();

RPC.login({ clientId }).catch(err => console.error(err));

; // Start optimizing Discord API requests
