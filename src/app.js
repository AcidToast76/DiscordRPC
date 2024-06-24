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

    const { name, artists, album, url} = spotifyData.song
    
    RPC.setActivity({
        details: "Listening To Spotify",
        state: `${name} by ${artists} on ${album}`,
        largeImageKey: "spotify",
        largeImageText: album,
        buttons: [
            { label: "Listen on Spotify", url },
            { label: "Website", url: "https://nezha.thefemdevs.com"},
        ],
    })


}

RPC.on("ready", async () => {
    updateDiscordRPCWithSpotify();
    setInterval(() => {
        updateDiscordRPCWithSpotify();
    }, 15e3);
});

RPC.login({ clientId }).catch(err => console.error(err));
