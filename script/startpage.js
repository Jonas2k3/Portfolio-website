// Make lat and lon global
let lat;
let lon;

function setGlobalLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log('Global lat:', lat, 'Global lon:', lon);
            if (typeof callback === 'function') callback();
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

async function getNasaImage() {
    try {
        // Define keywords to include
        const imageID = 'spaceImage';
        const imageTitle = 'spaceImageTitle';

        const includeKeywords = ['mars', 'galaxy', 'nebula', 'space', 'moon', 'earth', 
                                 'satellite', 'comet', 'asteroid', 'sun', 'jupiter', 
                                 'saturn', 'uranus', 'neptune', 'pluto', 'black hole', 
                                 'supernova', 'exoplanet', 'cosmos', 'universe'];
        const keywordsQuery = includeKeywords.join(',');


        // Fetch NASA images filtered by keywords
        const searchUrl = `https://images-api.nasa.gov/search?media_type=image&keywords=${encodeURIComponent(keywordsQuery)}`;
        const response = await fetch(searchUrl);
        const data = await response.json();
        const items = data.collection.items;


        if (!items.length) {
            document.getElementById(imageTitle).innerText = "No images found for the given keywords.";
            return;
        }


        // Filter out images with titles starting with 'ksc' (case-insensitive)
        const filteredItems = items.filter(item => {
            const title = item.data[0].title.toLowerCase();
            return !(title.startsWith('ksc') || title.startsWith('arc'));
        });


        if (!filteredItems.length) {
            document.getElementById(imageTitle).innerText = "No images found after filtering titles starting with 'ksc'.";
            return;
        }


        // Pick a random image from filtered list
        const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)];
        const nasaId = randomItem.data[0].nasa_id;
        const title = randomItem.data[0].title;


        // Fetch image asset URLs
        const assetResponse = await fetch(`https://images-api.nasa.gov/asset/${nasaId}`);
        const assetData = await assetResponse.json();
        const assetItems = assetData.collection.items;


        // Find first JPG image URL
        const imageUrl = assetItems.find(item => item.href.endsWith('.jpg'))?.href;


        if (!imageUrl) {
            document.getElementById(imageTitle).innerText = "No JPG image found for selected item.";
            return;
        }


        // Display image and title
        document.getElementById(imageID).src = imageUrl;
        document.getElementById(imageTitle).innerText = title;
    } catch (error) {
        console.error("Error fetching NASA image:", error);
        document.getElementById(imageTitle).innerText = "Error fetching image.";
    }
}

// Fetch a random Wikipedia article and display it
async function fetchRandomWikipediaArticle() {
    const resultElem = document.getElementById('wikipedia-iframe');
    resultElem.textContent = 'Loading...';

    try {
        const response = await fetch(
            'https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&format=json&rnnamespace=0&origin=*'
        );
        const data = await response.json();
        const article = data.query.random[0];
        const title = article.title;
        const urlTitle = title.replace(/ /g, '_');
        const url = `https://en.wikipedia.org/wiki/${urlTitle}`;

        

        resultElem.src = `https://en.wikipedia.org/wiki/${urlTitle}`;
    } catch (error) {
        resultElem.textContent = 'Failed to fetch article.';
        console.error(error);
    }
}

async function fetchRandomNOSArticleFromLast24Hours() {
    console.log('Fetching NOS articles from the last 24 hours...');
    const resultElem = document.getElementById('nosArticles'); // Set your element ID here
    resultElem.textContent = 'Loading...';

    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const nosRssUrl = encodeURIComponent('https://feeds.nos.nl/nosnieuwsalgemeen');

    try {
        const response = await fetch(proxyUrl + nosRssUrl);
        const data = await response.json();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'application/xml');

        const items = Array.from(xmlDoc.querySelectorAll('item'));

        // Filter for articles from the last 24 hours
        const recentArticles = items.filter(item => {
            const pubDateText = item.querySelector('pubDate')?.textContent;
            if (!pubDateText) return false;
            const pubDate = new Date(pubDateText);
            return isWithinLast24Hours(pubDate);
        });

        if (recentArticles.length === 0) {
            resultElem.textContent = 'No articles found from the last 24 hours.';
            return;
        }

        // Sort by pubDate descending (most recent first)
        recentArticles.sort((a, b) => {
            const dateA = new Date(a.querySelector('pubDate').textContent);
            const dateB = new Date(b.querySelector('pubDate').textContent);
            return dateB - dateA;
        });

        // Take only the 5 most recent
        const topArticles = recentArticles.slice(0, 5);

        // Build HTML for these articles with images if available
        let html = '';
        topArticles.forEach(article => {
            const title = article.querySelector('title').textContent;
            const link = article.querySelector('link').textContent;
            const pubDate = article.querySelector('pubDate')?.textContent || '';
            const enclosure = article.querySelector('enclosure');
            const imageUrl = enclosure ? enclosure.getAttribute('url') : null;

            html += `<div style="margin-bottom:1em;">`;
            if (imageUrl) {
                html += `<img src="${imageUrl}" alt="Article image" style="max-width:100%;height:auto;display:block;margin-bottom:0.5em;">`;
            }
            html += `<a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a>`;
            html += `<br /><small>Published: ${new Date(pubDate).toLocaleString()}</small>`;
            html += `</div><hr />`;
        });

        resultElem.innerHTML = html;
    } catch (error) {
        resultElem.textContent = 'Failed to fetch NOS news.';
        console.error(error);
    }
}

function isWithinLast24Hours(date) {
    const now = new Date();
    const diff = now - date;
    return diff <= 24 * 60 * 60 * 1000; // milliseconds in 24 hours
}

function fetchMeteoData() {
    if (lat !== undefined && lon !== undefined) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=Europe%2FBerlin&forecast_days=1`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const dailyData = data.daily;
                const temperatureMax = dailyData.temperature_2m_max[0];
                const temperatureMin = dailyData.temperature_2m_min[0];
                const precipitationProbability = dailyData.precipitation_probability_max[0];
                const sunrise = dailyData.sunrise[0];
                const sunset = dailyData.sunset[0];
                const uvIndexMax = dailyData.uv_index_max[0];

                const maxTempRound = Math.round(temperatureMax);
                const minTempRound = Math.round(temperatureMin);
                const roundUVIndex = Math.round(uvIndexMax);

                const dateSunrise = new Date(sunrise);
                const hours = dateSunrise.getHours();
                const minutes = dateSunrise.getMinutes();
                const dateSunset = new Date(sunset);
                const sunsetHours = dateSunset.getHours();
                const sunsetMinutes = dateSunset.getMinutes();

                if (Date.now() > dateSunrise.getTime() && Date.now() < dateSunset.getTime()) {
                    document.getElementById('sun').innerHTML = `${sunsetHours}:${sunsetMinutes}`;
                    document.getElementById('sunImage').style.backgroundImage = "url('../images/startpage-images/sunset.png')";
                } else {
                    document.getElementById('sun').innerHTML = `${hours}:${minutes}`;
                    document.getElementById('sunImage').style.backgroundImage = "url('../images/startpage-images/sunrise.png')";
                }

                document.getElementById('temperatureCircle').style.backgroundImage = "url('../images/startpage-images/sun.png')";
                document.getElementById('rainCircle').style.backgroundImage = "url('../images/startpage-images/rain.png')";


                document.getElementById('temperatureMax').innerHTML = `${maxTempRound}°C`;
                document.getElementById('temperatureMin').innerHTML = `${minTempRound}°C`;
                document.getElementById('precipitationProbability').innerHTML = `${precipitationProbability}%`;
                document.getElementById('UVIndex').innerHTML = `${roundUVIndex}`;

                if (roundUVIndex <= 2) {
                    document.getElementById('UVIndexCircle').style.backgroundColor = "#57bf45"; // Green
                } else if (roundUVIndex <= 4) {
                    document.getElementById('UVIndexCircle').style.backgroundColor = "#ffbf45"; // Yellow
                } else if (roundUVIndex <= 6) {
                    document.getElementById('UVIndexCircle').style.backgroundColor = "#ff7145"; // Orange
                } else {
                    document.getElementById('UVIndexCircle').style.backgroundColor = "#ff3545"; // Red
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    } else {
        console.error("Latitude and longitude are not set yet.");
    }
}

function fetchMoonPhase() {
    const timestamp = Math.round(Date.now() / 1000);
    const url = `https://api.farmsense.net/v1/moonphases/?d=${timestamp}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const moonPhase = data[0].Phase;
            console.log("Current Moon Phase:", moonPhase);
            switch (moonPhase) {
                case "New Moon":
                    document.getElementById('moonImage').style.backgroundImage = "url('../images/startpage-images/new_moon.png')";
                    break;
                case "Waxing Crescent":
                    document.getElementById('moonImage').style.backgroundImage = "url('../images/startpage-images/waxing_crescent_moon.png')";
                    break;
                case "First Quarter":
                    document.getElementById('moonImage').style.backgroundImage = "url('../images/startpage-images/first_quarter_moon.png')";
                    break;
                case "Waxing Gibbous":
                    document.getElementById('moonImage').style.backgroundImage = "url('../images/startpage-images/waxing_gibbous_moon.png')";
                    break;
                case "Full Moon":
                    document.getElementById('moonImage').style.backgroundImage = "url('../images/startpage-images/full_moon.png')";
                    break;
                case "Waning Gibbous":
                    document.getElementById('moonImage').style.backgroundImage = "url('../images/startpage-images/waning_gibbous_moon.png')";
                    break;
                case "Last Quarter":
                    document.getElementById('moonImage').style.backgroundImage = "url('../images/startpage-images/last_quarter_moon.png')";
                    break;
                case "Waning Crescent":
                    document.getElementById('moonImage').style.backgroundImage = "url('../images/startpage-images/waning_crescent_moon.png')";
                    break;
            }
        })
        .catch(error => {
            console.error("Error fetching moon phase data:", error);
        });
}

function fetchPollenToday() {
    // Use global lat/lon if available, otherwise fallback to default values
    const latitude = lat !== undefined ? lat : 51.37;
    const longitude = lon !== undefined ? lon : 6.1681;
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var treeLevel = 0;
            var grassLevel = 0;
            var weedLevel = 0;

            const pollen = data.current;

            var treePollen = pollen.alder_pollen + pollen.birch_pollen + pollen.olive_pollen;
            if (treePollen <= 14) {
                treeLevel = 0;
            } else if (treePollen <= 89) {
                treeLevel = 1;
            } else if (treePollen <= 1499) {
                treeLevel = 2;
            } else {
                treeLevel = 3;
            }

            if (pollen.grass_pollen <= 4) {
                grassLevel = 0;
            } else if (pollen.grass_pollen <= 19) {
                grassLevel = 1;
            } else if (pollen.grass_pollen <= 199) {
                grassLevel = 2;
            } else {
                grassLevel = 3;
            }

            var weedPollen = pollen.mugwort_pollen + pollen.ragweed_pollen;
            if (weedPollen <= 9) {
                weedLevel = 0;
            } else if (weedPollen <= 49) {
                weedLevel = 1;
            } else if (weedPollen <= 499) {
                weedLevel = 2;
            } else {
                weedLevel = 3;
            }

            const element = document.getElementById('pollen');
            const elementBG = document.getElementById('pollenCircle');
            switch (Math.max(treeLevel, grassLevel, weedLevel)) {
                case 0:
                    element.innerHTML = "Low";
                    elementBG.style.backgroundColor = "#57bf45";
                    break;
                case 1:
                    element.innerHTML = "Moderate";
                    elementBG.style.backgroundColor = "#ffbf45";
                    break;
                case 2:
                    element.innerHTML = "High";
                    elementBG.style.backgroundColor = "#ff7145";
                    break;
                case 3:
                    element.innerHTML = "Very High";
                    elementBG.style.backgroundColor = "#ff3545";
                    break;
            }
        })
        .catch(error => {
            console.error("Error fetching pollen data:", error);
        });
}


function setGreetingMessage(){
    const greetings = [
        "Hello!", 
        "Welcome back!", 
        "Hi there!", 
        "Greetings!", 
        "Guten Morgen Sonnenschein 🌞", 
        "Well hello there!", 
        "Good day!", 
        "Howdy there partner!", 
        "Greetings my fellow human!", 
        "Salutations!", 
        "What's crackin'?",
        "Ahoy!"
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    document.getElementById('greetingText').innerText = randomGreeting;
}

function setLogos(){
    document.getElementById('youtubeImage').style.backgroundImage = "url('../images/startpage-images/youtube.png')";
    document.getElementById('canvasImage').style.backgroundImage = "url('../images/startpage-images/canvas.png')";
    document.getElementById('nebulaImage').style.backgroundImage = "url('../images/startpage-images/nebula.png')";
    document.getElementById('chatImage').style.backgroundImage = "url('../images/startpage-images/cat.png')";
    document.getElementById('githubImage').style.backgroundImage = "url('../images/startpage-images/github.png')";
    document.getElementById('calendarImage').style.backgroundImage = "url('../images/startpage-images/calendar.png')";
    document.getElementById('tasksImage').style.backgroundImage = "url('../images/startpage-images/tasks.png')";
    
}


setGlobalLocation(() => {
    fetchMeteoData();
    fetchPollenToday();
});

setLogos();
setGreetingMessage();
fetchRandomWikipediaArticle();
getNasaImage();
fetchRandomNOSArticleFromLast24Hours();
fetchMoonPhase();
