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
        buttons: [
            { label: "Listen on Spotify", url: playing.track.url },
            { label: "Website", url: "https://nezha.thefemdevs.com"},
        ],
    })


}

// Function to optimize Discord API requests

async function optimizeDiscordAPIRequests() {

    setInterval(() => {
        while (isPlaying === true) {
            let spotifyData = fetch('https://spotify.thefemdevs.com/playing/nezha').then(res => res.json());
            let spotifyTrack = spotifyData.playing.track.title;
            
            if (spotifyTrack !== spotifyData.playing.track.title) {
                updateDiscordRPCWithSpotify();
            } else {
                continue;
            }
        }
    }, 500);
}

RPC.on("ready", async () => {
    updateDiscordRPCWithSpotify();
    setInterval(() => {
        optimizeDiscordAPIRequests();
    }, 15e3);
});

RPC.login({ clientId }).catch(err => console.error(err));


