document.addEventListener('DOMContentLoaded', () => {
    const germanFlag = document.getElementById("german-flag");
    const dutchFlag = document.getElementById("dutch-flag");
    const englishFlag = document.getElementById("english-flag");

    germanFlag.addEventListener('click', () => {
        translateToGermanPhishDetective();
        localStorage.setItem('currentLanguage', 'german');
    });

    dutchFlag.addEventListener('click', () => {
        translateToDutchPhishDetective();
        localStorage.setItem('currentLanguage', 'dutch');
    });

    englishFlag.addEventListener('click', () => {
        translateToEnglishPhishDetective();
        localStorage.setItem('currentLanguage', 'english');
    });

    const currentLanguage = localStorage.getItem('currentLanguage') || 'english';
    if (currentLanguage === 'german') {
        translateToGermanPhishDetective();
    } else if (currentLanguage === 'dutch') {
        translateToDutchPhishDetective();
    } else {    
        translateToEnglishPhishDetective();
    }
});

function translateToGermanPhishDetective() {
    document.getElementById("project-info-phish-detective").innerHTML = "Phish Detective ist ein Add-In für Microsoft Outlook. Der Zweck des Add-Ins ist es, Benutzer vor potentiell schädlichen E-Mails oder deren Anhängen zu warnen. <br> <br> Dieses Add-in wurde als Projekt für das 4. Semester meines Studiums Software Engineering in einer 3er-Gruppe entwickelt. <br> <br> In diesem Projekt bestand meine Hauptaufgabe darin, an der Funktionalität der Benutzerinterface in Outlook zu arbeiten, d.h. ich musste sowohl am Front- als auch am Backend mit <b>HTML</b>, <b>CSS</b> und <b>JavaScript</b> arbeiten. Für das Backend habe ich einen <b>Node.js</b>-Express-Server eingerichtet, der die Kommunikation mit der <b>PostgreSQL</b>-Datenbank übernahm.";
    document.getElementById("back-btn-phish-detective").innerHTML = "Zurück zu den Projekten <img src='/images/scroll-btn.svg' id='rotated-scroll-btn'>";
}

function translateToDutchPhishDetective() {
    document.getElementById("project-info-phish-detective").innerHTML = "Phish Detective is een add-in voor Microsoft Outlook. Het doel van de add-in is om gebruikers te waarschuwen voor potentieel schadelijke e-mails of hun bijlagen. <br> <br> Deze add-in is ontwikkeld als project voor het 4e semester van mijn studie software engineering in een groep van 3. <br> <br> In dit project was mijn belangrijkste taak om te werken aan de functionaliteit van de gebruikersinterface in Outlook, wat betekent dat ik zowel aan de front- als aan de backend moest werken met <b>HTML</b>, <b>CSS</b> en <b>JavaScript</b>. Voor de backend heb ik een <b>Node.js</b> express server opgezet die de communicatie met de <b>PostgreSQL</b> database afhandelde.";
    document.getElementById("back-btn-phish-detective").innerHTML = "Terug naar projecten <img src='/images/scroll-btn.svg' id='rotated-scroll-btn'>";
    }

function translateToEnglishPhishDetective() {
    document.getElementById("project-info-phish-detective").innerHTML = "Phish Detective is an add-in for Microsoft Outlook. The purpose of the add-in is for it to warn users about potentially harmfull emails, or their attachments. <br> <br> This add-in was developed as the project for the 4th semester of my study software engineering in a group of 3. <br> <br> In this project, my main job was to work on the functionality of the user interface in Outlook, meaning I had to work on both front- and backend using <b>HTML</b>, <b>CSS</b> and <b>JavaScript</b>. For the backend, I set up a <b>Node.js</b> express server which handled communication with the <b>PostgreSQL</b> database.";
    document.getElementById("back-btn-phish-detective").innerHTML = "Back to projects<img src='/images/scroll-btn.svg' id='rotated-scroll-btn'>";
}
