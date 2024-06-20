document.addEventListener('DOMContentLoaded', () => {
    const germanFlag = document.getElementById("german-flag");
    const dutchFlag = document.getElementById("dutch-flag");
    const englishFlag = document.getElementById("english-flag");

    germanFlag.addEventListener('click', () => {
        translateToGermanTasteBuds();
        localStorage.setItem('currentLanguage', 'german');
    });

    dutchFlag.addEventListener('click', () => {
        translateToDutchTasteBuds();
        localStorage.setItem('currentLanguage', 'dutch');
    });

    englishFlag.addEventListener('click', () => {
        translateToEnglishTastebuds();
        localStorage.setItem('currentLanguage', 'english');
    });

    const currentLanguage = localStorage.getItem('currentLanguage') || 'english';
    if (currentLanguage === 'german') {
        translateToGermanTasteBuds();
    } else if (currentLanguage === 'dutch') {
        translateToDutchTasteBuds();
    } else {
        translateToEnglishTastebuds();
    }
});

function translateToGermanTasteBuds() {
    document.getElementById("project-info-tastebuds").innerHTML = "TasteBuds ist eine Android-App, in der Benutzer ihre Rezepte mit Freunden teilen können. <br><br> Die App wurde als Projekt für das 3. Semester meines Softwaretechnik-Studiums in einer Gruppe von 6 Personen entwickelt. <br><br> Bei diesem Projekt war meine Hauptaufgabe die Funktionalität der Benutzerverwaltung. Ich habe mich speziell auf das Backend konzentriert. Dazu habe ich eine <b>PostgreSQL</b>-Datenbank verwendet, die auf <b>Render</b> gehostet wurde. Für den Teil des Frontends, an dem ich gearbeitet habe, habe ich <b>Kotlin</b> verwendet. Eine <b>REST API</b> wurde verwendet, um das Frontend und das Backend zu implementieren. <br><br> Die letzte große Funktionalität, die ich erstellt habe, war die <b>OpenStreetMap-Integration</b>, um Supermärkte in Ihrer Nähe zu finden. <br><br>";
    document.getElementById("back-btn-tastebuds").innerHTML = "Zurück zu den Projekten <img src='/images/scroll-btn.svg' id='rotated-scroll-btn'>";
}

function translateToDutchTasteBuds() {
    document.getElementById("project-info-tastebuds").innerHTML = "TasteBuds is een Android-app waarin gebruikers hun recepten kunnen delen met vrienden. <br><br> De app werd ontwikkeld als project voor het 3e semester van mijn studie software-engineering in een groep van 6. <br><br> In dit project was mijn hoofdtaak om de functionaliteit van de gebruikersbeheer te ontwikkelen. Ik richtte me specifiek op de backend. Hiervoor gebruikte ik een <b>PostgreSQL</b>-database die gehost werd op <b>Render</b>. Voor het deel van de frontend waaraan ik werkte, gebruikte ik <b>Kotlin</b>. Een <b>REST API</b> werd gebruikt om de frontend en de backend te implementeren. <br><br> De laatste grote functionaliteit die ik maakte, was de <b>OpenStreetMap-integratie</b> om supermarkten in je omgeving te vinden. <br><br>";
    document.getElementById("back-btn-tastebuds").innerHTML = "Terug naar projecten <img src='/images/scroll-btn.svg' id='rotated-scroll-btn'>";
}

function translateToEnglishTastebuds() {
    document.getElementById("project-info-tastebuds").innerHTML = "TasteBuds is an Android app in which users can share their recipes with friends. <br><br> The app was developed as the project for the 3rd semester of my study software engineering in a group of 6. <br><br> In this project, my main job was to work on the functionality of the user handling. I specifically focused on the backend for this. Using a <b>PostgreSQL</b> which was hosted on <b>Render</b>. For the part of the front-end that I worked on, I used <b>Kotlin</b>. A <b>REST API</b> was used to implement the front-end and the backend. <br><br> The last major functionality I made, was the <b>OpenStreetap integration</b> to find grocery stores in your area. <br><br>";
    document.getElementById("back-btn-tastebuds").innerHTML = "Back to projects <img src='/images/scroll-btn.svg' id='rotated-scroll-btn'>";
}
