const clientId = "1254145695762485248";
const DiscordRPC = require("discord-rpc");
const RPC = new DiscordRPC.Client({ transport: "ipc" });

DiscordRPC.register(clientId);

async function spotifyrpc (url) {
   let spotifyRPC = await fetch("https://spotify.thefemdevs.com/playing/nezha").then(res => res.json())
   console.log(spotifyRPC)
}

spotifyrpc()

async function setActivity() {
    if (!RPC) {
        return;
    }
    
    RPC.setActivity({
        details: "Playing a game",
        state: "In the menu",
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

async function setSpotifyRPC() {
    if (!RPC) {
        return;
    }
    
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

RPC.login({ clientId }).catch(err => console.error(err));