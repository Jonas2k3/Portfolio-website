document.addEventListener('DOMContentLoaded', () => {
    const germanFlag = document.getElementById("german-flag");
    const dutchFlag = document.getElementById("dutch-flag");
    const englishFlag = document.getElementById("english-flag");

    germanFlag.addEventListener('click', () => {
        translateToGerman();
        localStorage.setItem('currentLanguage', 'german');
    });

    dutchFlag.addEventListener('click', () => {
        translateToDutch();
        localStorage.setItem('currentLanguage', 'dutch');
    });

    englishFlag.addEventListener('click', () => {
        translateToEnglish();
        localStorage.setItem('currentLanguage', 'english');
    });

    const currentLanguage = localStorage.getItem('currentLanguage') || 'english';
    if (currentLanguage === 'german') {
        translateToGerman();
    } else if (currentLanguage === 'dutch') {
        translateToDutch();
    } else {
        translateToEnglish();
    }
});

function translateToGerman() {
    document.getElementById("projects-text-index").innerHTML = "Projekte";
    document.getElementById("intro-text").innerHTML = "Mein Name ist Jonas Koens, ich bin ein 20-jähriger Student der Softwaretechnik an der Fontys University of Applied Sciences. Ich bin ein begeisterter Problemlöser, daher begeistert mich jede komplexe Programmieraufgabe. <br> <br> <a href='/pages/about.html' id='about-page-link'>Mehr über mich <img src='/images/scroll-btn.svg' id='rotated-scroll-btn'></a>";
    document.getElementById("project-text-header-index").innerHTML = "Projekte";
}

function translateToDutch() {
    document.getElementById("projects-text-index").innerHTML = "Projecten";
    document.getElementById("intro-text").innerHTML = "Mijn naam is Jonas Koens, ik ben een 20 jaar oude software engineering student aan de Fontys Hogeschool. Ik ben een fervent probleemoplosser, dus voor elke complexe programmeertaak wordt ik enthousiast. <br> <br> <a href='/pages/about.html' id='about-page-link'>Meer over mij <img src='/images/scroll-btn.svg' id='rotated-scroll-btn'></a>";
    document.getElementById("project-text-header-index").innerHTML = "Projecten";
}

function translateToEnglish() {
    document.getElementById("projects-text-index").innerHTML = "Projects";
    document.getElementById("intro-text").innerHTML = "My name is Jonas Koens, I am a 20-year-old software engineering student at Fontys University of Applied Sciences. I am an avid problem solver, so any complex programming task excites me. <br> <br> <a href='/pages/about.html' id='about-page-link'>More about me <img src='/images/scroll-btn.svg' id='rotated-scroll-btn'></a>";
    document.getElementById("project-text-header-index").innerHTML = "Projects";
}
