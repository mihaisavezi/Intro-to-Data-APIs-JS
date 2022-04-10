
window.addEventListener('load', setup);

async function setup() {

    const res = await fetch('/api');
    const {data: jsonLogs} = await res.json();

    for (item of jsonLogs) {
        const root = document.createElement('p');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');
    
        mood.textContent = `mood: ${item.mood}`;
        geo.textContent = `${item.lat}°, ${item.long}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;

        image.src = item.image;
        image.alt = 'photos from Mihai\'s webcam.';
    
        root.append(mood, geo, date, image);
        document.body.append(root);
      }

}
