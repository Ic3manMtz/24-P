//Martínez Buenrostro Jorge Rafael

// Initialize the Spotify Player
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'YOUR_ACCESS_TOKEN_HERE';
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    // Add event listeners
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    // Function to toggle play/pause
    function togglePlay() {
        player.togglePlay().then(() => {
            console.log('Toggle called');
        }).catch((err) => {
            console.error(err);
        });
    }

    // Attach event listener to the play/pause button
    document.getElementById('playPauseBtn').addEventListener('click', togglePlay);

    // Connect to the Spotify Web API
    player.connect();
};

// Check if the Spotify Web Playback SDK is ready
if (typeof window.onSpotifyWebPlaybackSDKReady === 'function') {
    window.onSpotifyWebPlaybackSDKReady();
} else {
    setTimeout(window.onSpotifyWebPlaybackSDKReady, 500);
}
