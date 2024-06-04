var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        console.log(data);
        return data;
    }
    catch (error) {
        console.error("An error has ocurred: ", error);
        return null;
    }
});
const datosChuck = () => __awaiter(this, void 0, void 0, function* () {
    const data = yield chuckJokes();
    if (data) {
        console.log(data.value);
        return data.value;
    }
    else {
        console.log("Data couldn't be obtained");
    }
});
