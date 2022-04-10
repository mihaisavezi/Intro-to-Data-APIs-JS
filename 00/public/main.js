const sendAllButton = document.querySelector("[data-js=send-all]");
const moodInput = document.querySelector("[data-js=mood-input]");

let video;

function setup() {
    setupP5();
    showLocation()
    sendAllButton.addEventListener('click', sendAll)
}

function showLocation() {
    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(onGetCurrentPosition);
    } else {
        console.log('geolocation not available');
    }
}

function setupP5() {
    noCanvas();
    video = createCapture(VIDEO);
    video.size(320, 240);
}

async function sendAll() {
    const lat = document.getElementById('latitude').textContent;
    const long = document.getElementById('longitude').textContent;
    const mood = moodInput.value;
    
    video.loadPixels();
    const image = video.canvas.toDataURL();

    if(!(lat || long)) return alert('no latitude or longitude provided');
    if(!mood) return alert('provide your mood');


    const data = { lat, long, mood, image };
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    };

    const response = await fetch('/api', options);
    const json = await response.json();

    console.log(json);
}


function onGetCurrentPosition(position) {

    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat, long);
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = long;

}
