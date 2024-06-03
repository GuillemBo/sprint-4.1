mostrar();
let randomJoke = '';
function mostrar() {
    document.getElementById('respuesta').innerHTML = '';
    fetch("https://icanhazdadjoke.com/", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
    })
        .then(data => {
        randomJoke = data.joke;
        console.log(data.joke);
        document.getElementById('randomJoke').innerHTML = randomJoke;
    })
        .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
const reportJokes = [];
function submitScore() {
    let scores = document.getElementsByName('score');
    let selectedScore;
    for (const score of scores) {
        if (score.checked) {
            selectedScore = parseInt(score.value);
            break;
        }
    }
    const fechaActualISO = new Date().toISOString();
    const report1 = {
        joke: randomJoke,
        score: selectedScore,
        date: fechaActualISO
    };
    let existentJoke = reportJokes.find(element => element.joke == randomJoke);
    if (!existentJoke) {
        reportJokes.push(report1);
        document.getElementById('respuesta').innerHTML = 'Gracies per la valoració';
    }
    else {
        document.getElementById('respuesta').innerHTML = 'Ja has valorat aquest acudit';
    }
    console.log(reportJokes);
}
