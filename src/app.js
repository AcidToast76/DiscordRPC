const clientId = "1254145695762485248";
const DiscordRPC = require("discord-rpc");
const RPC = new DiscordRPC.Client({ transport: "ipc" });


DiscordRPC.register(clientId);

async function setActivity() {
    let spotifyRPC = await fetch("https://spotify.thefemdevs.com/playing/nezha").then(res => res.json());
    console.dir(spotifyRPC);
    if (!RPC) {
        return;
    }
    const { title, artists, album, url } = spotifyRPC.song
    
    RPC.setActivity({
        details: "Listening to Spotify",
        state: "Warframe Bops",
        largeImageKey: "large",
        largeImageText: "Large Image",
        smallImageKey: "small",
        smallImageText: "Small Image",
        instance: false,
        buttons: [
            { 
                label: "Website", url: "https://nezha.thefemdevs.com" 
            },
            { 
                label: "Spotify", url: "https://open.spotify.com/user/hpjv09y99ucx7adf3jb6qijvp?si=40ac1fa71e7d44ee" 
            }
        ]
    });
}

RPC.on("ready", async () => {
    setActivity();
    setInterval(() => {
        setActivity();
    }, 15e3);
});


// Function to fetch the currently playing track from Spotify
async function fetchCurrentlyPlayingTrack() {
    const response = await fetch("https://spotify.thefemdevs.com/playing/nezha", {
    });

    if (!response.ok) {
        throw new Error("Failed to fetch currently playing track");
    }

    const data = await response.json();
    return {
        trackName: data.item.name,
        artistName: data.item.artists.map(artist => artist.name).join(", "),
        trackUrl: data.item.external_urls.spotify,
    };
}

// Function to update Discord RPC with Spotify track information
async function updateDiscordRPCWithSpotify() {
    try {
        const { trackName, artistName, trackUrl } = await fetchCurrentlyPlayingTrack(accessToken);

        RPC.setActivity({
            details: `Listening to ${trackName}`,
            state: `by ${artistName}`,
            largeImageKey: "spotify",
            buttons: [{ label: "Listen on Spotify", url: trackUrl }]
        });
    } catch (error) {
        console.error("Failed to update Discord RPC with Spotify:", error);
    }
}

// Example usage
RPC.on("ready", async () => {
    updateDiscordRPCWithSpotify();
    setInterval(updateDiscordRPCWithSpotify, 15e3); // Update every 15 seconds
});

RPC.login({ clientId }).catch(err => console.error(err));

setSpotifyRPC()