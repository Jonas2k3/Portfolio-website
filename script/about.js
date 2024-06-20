document.addEventListener('DOMContentLoaded', () => {
    const germanFlag = document.getElementById("german-flag");
    const dutchFlag = document.getElementById("dutch-flag");
    const englishFlag = document.getElementById("english-flag");

    germanFlag.addEventListener('click', () => {
        translateToGermanAboutPage();
        localStorage.setItem('currentLanguage', 'german');
    });

    dutchFlag.addEventListener('click', () => {
        translateToDutchAboutPage();
        localStorage.setItem('currentLanguage', 'dutch');
    });

    englishFlag.addEventListener('click', () => {
        translateToEnglishAboutPage();
        localStorage.setItem('currentLanguage', 'english');
    });

    const currentLanguage = localStorage.getItem('currentLanguage') || 'english';
    if (currentLanguage === 'german') {
        translateToGermanAboutPage();
    } else if (currentLanguage === 'dutch') {
        translateToDutchAboutPage();
    } else {
        translateToEnglishAboutPage();
    }

    function translateToDutchAboutPage() {
        document.getElementById("about-box-id").innerHTML = "<h1 id='about-title'>Over mij</h1> <p id='about-text'>Hallo, mijn naam is Jonas Koens. Op dit moment studeer ik software engineering aan de Fontys Hogeschool in Venlo. <br><br> Programmeren heeft altijd al mijn interesse gehad sinds ik een jaar of 12 was. Toen het tijd was om een studie te kiezen was de keuze duidelijk, ik wil Software Engineering studeren in een zeer internationaal gerichte omgeving. <br><br> Nu ik 2 jaar heb gestudeerd, is het tijd voor mij om stage te lopen bij een bedrijf. Om mij te helpen met deze zoektocht en om mijn vaardigheden te laten zien, heb ik deze website gemaakt. <br><br> Buiten mijn studie vind ik het leuk om te roeien, te voetballen en Formule 1 te kijken. <br><br> Als ik goed bij <b>uw</b> bedrijf pas, kunt u <a href='#cv-title' style='color: white;'>hieronder</a> een compacte versie van mijn CV lezen en/of <a href='mailto:jonaskoens2003@gmail.com' style='color: white;'>contact met mij opnemen</a>. </p> <br><br> <h3 id='cv-title'>Mijn CV</h3><div id='cv-body'> <div id='cv-education'> <h3>Onderwijs</h3> <p>Bachelor in Software Engineering <br> Fontys Hogescholen <br>09/2022-07/2026</p> </div> <div id='cv-professional-experience'> <h3>Professionele ervaring</h3> <p>Vulploegmedewerker <br> Albert Heijn <br> 02/2020-07/2022</p> </div> <div id='skills-text'> <h3 id='skills-header'>Vaardigheden</h3> <p id='programming-text'><b>Programmeertalen: </b>Java, HTML, CSS, JavaScript, PostgreSQL, PHP, Kotlin</p> <p id='technologies-text'><b>Technologieën & werkwijzen: </b>Git, GitHub, Docker, Scrum, Agile</p> <p id='languages'><b>Talen: </b>Nederlands (moedertaal), Duits (moedertaal), Engels (C2), Frans (A2), Zweeds (A2, aan het leren)</p> </div> </div> <p id='contact-text'>Nieuwsgierig? Neem contact met me op: <a href='mailto:jonaskoens2003@gmail.com'>jonaskoens2003@gmail.com</a> of <a href='https://www.linkedin.com/in/jonaskoens/'>LinkedIn</a></p>";
        document.getElementById("back-to-main").innerHTML = "<img src='/images/scroll-btn.svg' id='rotated-scroll-btn-left'>Terug";
    }
    
    function translateToGermanAboutPage() {
        document.getElementById("about-box-id").innerHTML = "<h1 id='about-title'>Über mich</h1> <p id='about-text'>Hallo, mein Name ist Jonas Koens. Zurzeit studiere ich Software Engineering an der Fontys University of Applied Sciences in Venlo. <br><br> Seit ich 12 Jahre alt bin, habe ich mich für das Programmieren interessiert. Als es an der Zeit war, einen Studiengang zu wählen, lag die Wahl auf der Hand: Ich wollte Software Engineering in einem sehr internationalen Umfeld studieren. <br><br> Nachdem ich nun 2 Jahre lang studiert habe, ist es an der Zeit, ein Praktikum in einem Unternehmen zu absolvieren. Um mir bei dieser Suche zu helfen und um meine Fähigkeiten zu präsentieren, habe ich diese Website erstellt. <br><br> Außerhalb meines Studiums rudere ich gerne, spiele Fußball und schaue Formel 1. <br><br> Wenn ich gut zu <b>Ihrem</b> Unternehmen passe, können Sie <a href='#cv-title' style='color: white;'>hier unten</a> eine kompakte Version meines Lebenslaufs lesen und/oder <a href='mailto:jonaskoens2003@gmail.com' style='color: white;'>Kontakt mit mir aufnehmen</a>. </p> <br><br> <h3 id='cv-title'>Mein Lebenslauf</h3><div id='cv-body'> <div id='cv-education'> <h3>Bildungsweg</h3> <p>Bachelor in Softwaretechnik <br> Fontys Hochschule für angewandte Wissenschaften <br>09/2022-07/2026</p> </div> <div id='cv-professional-experience'> <h3>Berufliche Erfahrung</h3> <p>Lagermitarbeiter <br> Albert Heijn <br> 02/2020-07/2022</p> </div> <div id='skills-text'> <h3 id='skills-header'>Fähigkeiten</h3> <p id='programming-text'><b>Programmiersprachen: </b>Java, HTML, CSS, JavaScript, PostgreSQL, PHP, Kotlin</p> <p id='technologies-text'><b>Technologien und Arbeitsweisen: </b>Git, GitHub, Docker, Scrum, Agile</p> <p id='languages'><b>Sprachen: </b>Niederländisch (Muttersprache), Deutsch (Muttersprache), Englisch (C2), Französisch (A2), Schwedisch (A2, lernend)</p> </div> </div> <p id='contact-text'>Neugierig? Kontaktieren Sie mich unter: <a href='mailto:jonaskoens2003@gmail.com'>jonaskoens2003@gmail.com</a> oder <a href='https://www.linkedin.com/in/jonaskoens/'>LinkedIn</a></p>";
        document.getElementById("back-to-main").innerHTML = "<img src='/images/scroll-btn.svg' id='rotated-scroll-btn-left'>Zurück";
    }
    
    function translateToEnglishAboutPage() {
        document.getElementById("about-box-id").innerHTML = "<h1 id='about-title'>About me</h1> <p id='about-text'>Hello, my name is Jonas Koens. Currently, I am studying to become a software engineer at Fontys University of Applied Sciences in Venlo. <br><br> Programming has always been an interest of mine since I was about 12 years old. When it was time to choose a study, the choice was obvious, I want to study Software Engineering in a very international setting. <br><br> Now having studied for 2 years, it is time for me to do an internship at a company. To help me with this search and to showcase my abilities, I have made this website. <br><br> Outside of my study, I enjoy rowing, playing football and watching Formula 1. <br><br> If I sound like a good fit for <b>your</b> company, you can read through a compact version of my CV <a href='#cv-title' style='color: white;'>down below</a>, and/or <a href='mailto:jonaskoens2003@gmail.com' style='color: white;'>contact me</a> . </p> <br><br> <h3 id='cv-title'>My CV</h3> <div id='cv-body'> <div id='cv-education'> <h3>Education</h3> <p>Bachelor of Software Engineering <br> Fontys University of Applied Sciences <br>09/2022-07/2026</p> </div> <div id='cv-professional-experience'> <h3>Professional Experience</h3> <p>Stock clerk <br> Albert Heijn <br> 02/2020-07/2022</p> </div> <div id='skills-text'> <h3 id='skills-header'>Skills</h3> <p id='programming-text'><b>Programming languages: </b>Java, HTML, CSS, JavaScript, PostgreSQL, PHP, Kotlin</p> <p id='technologies-text'><b>Technologies & Practices: </b>Git, GitHub, Docker, Scrum, Agile</p> <p id='languages'><b>Languages: </b>Dutch (Native), German (Native), English (C2), French (A2), Swedish (A2, learning)</p> </div> </div> <p id='contact-text'>Curious? Contact me at: <a href='mailto:jonaskoens2003@gmail.com'>jonaskoens2003@gmail.com</a> or <a href='https://www.linkedin.com/in/jonaskoens/'>LinkedIn</a></p>";
        document.getElementById("back-to-main").innerHTML = "<img src='/images/scroll-btn.svg' id='rotated-scroll-btn-left'>Back";
    }
});


