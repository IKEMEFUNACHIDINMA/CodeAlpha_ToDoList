const https = require('https');

const url = 'https://todolist-9wnc.onrender.com/';

function pingSite() {
  https.get(url, (res) => {
    console.log(`Pinged ${url}: Status ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`Error pinging ${url}: ${e.message}`);
  });
}

// Ping every 10 minutes
setInterval(pingSite, 600000);

// Initial ping
pingSite();