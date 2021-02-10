const apiKey = config.VOICERSS_API_KEY;
const audioElement = document.getElementById('audio');
const button = document.getElementById('button');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}
// Passing Joke to VoiceRSS API
function tellMe(joke) {
    console.log('tell me', joke);
    VoiceRSS.speech({
        key: apiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Jokes API
async function getJokes() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    let joke = '';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        // Text-to-Speach
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch(error) {
        console.log('whoops', error);
    }
};
//  Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);