var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
jokes();
let randomJoke = '';
let actualJoke = '';
function jokes() {
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
        document.getElementById('randomJoke').innerHTML = randomJoke;
        actualJoke = randomJoke;
    })
        .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
};
const weatherTemp = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=e7704bc895b4a8d2dfd4a29d404285b6&lat=41.38879&lon=2.15899", options);
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const data = response.json();
        return data;
    }
    catch (error) {
        console.error("An error has ocurred: ", error);
        return null;
    }
});
const datosWeather = () => __awaiter(this, void 0, void 0, function* () {
    const data = yield weatherTemp();
    if (data) {
        let temp = data.main.temp;
        let icon = data.weather[0].icon;
        let url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        let imageElement = document.createElement('img');
        imageElement.src = url;
        document.getElementById('weatherReport').appendChild(imageElement);
        document.getElementById('weatherReport').innerHTML += `${temp.toFixed(1)} C º`;
    }
    else {
        console.log("Data couldn't be obtained");
    }
});
datosWeather();
const chuckJokes = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://api.chucknorris.io/jokes/random', options);
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const data = (response).json();
        return data;
    }
    catch (error) {
        console.error("An error has ocurred: ", error);
        return null;
    }
});
let randomChuck = '';
const datosChuck = () => __awaiter(this, void 0, void 0, function* () {
    const data = yield chuckJokes();
    if (data) {
        document.getElementById('randomJoke').innerHTML = data.value;
        randomChuck = data.value;
        actualJoke = randomChuck;
        return randomChuck;
    }
    else {
        console.log("Data couldn't be obtained");
    }
});
function mostrar() {
    let random = Math.floor(Math.random() * 2);
    if (random == 0) {
        jokes();
    }
    else {
        datosChuck();
    }
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
        date: fechaActualISO,
        changed: false
    };
    const report2 = {
        joke: randomChuck,
        score: selectedScore,
        date: fechaActualISO,
        changed: false
    };
    let existentJoke = reportJokes.find(element => element.joke == randomJoke);
    let existentJoke2 = reportJokes.find(element => element.joke == randomChuck);
    if (selectedScore == undefined) {
        document.getElementById('respuesta').innerHTML = 'You didn/t select a score';
        return;
    }
    if (!existentJoke && randomJoke == actualJoke) {
        reportJokes.push(report1);
        document.getElementById('respuesta').innerHTML = 'Gracies per la valoració';
    }
    else if (!existentJoke2 && actualJoke == randomChuck) {
        reportJokes.push(report2);
        document.getElementById('respuesta').innerHTML = 'Gracies per la valoració';
    }
    else {
        if (existentJoke && !existentJoke.changed && randomJoke === actualJoke) {
            existentJoke.score = selectedScore;
            existentJoke.date = fechaActualISO;
            existentJoke.changed = true;
            document.getElementById('respuesta').innerHTML = 'Has canviat la teva valoració';
        }
        else if (existentJoke2 && !existentJoke2.changed) {
            existentJoke2.score = selectedScore;
            existentJoke2.date = fechaActualISO;
            existentJoke2.changed = true;
            document.getElementById('respuesta').innerHTML = 'Has canviat la teva valoració';
        }
        else {
            document.getElementById('respuesta').innerHTML = 'Ja has valorat aquest acudit';
        }
    }
    console.log(reportJokes);
}
