
mostrar()

let randomJoke: string = ''

function mostrar() {

    document.getElementById('respuesta').innerHTML = ''

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
        randomJoke = data.joke
        console.log(data.joke);
        document.getElementById('randomJoke').innerHTML = randomJoke
    })
    
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

}


type report = {
    joke: string
    score: number
    date: `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
}

const reportJokes = [];


function submitScore(): void {

    let scores = document.getElementsByName('score') as NodeListOf<HTMLInputElement>;
    
    let selectedScore: number | null;

    for (const score of scores) {
        if (score.checked) {
            selectedScore = parseInt(score.value);
            break;
        }
    }

    const fechaActualISO = new Date().toISOString();

    const report1: report = {
        joke: randomJoke,
        score: selectedScore,
        date: fechaActualISO as `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`
    }

    let existentJoke = reportJokes.find(element => element.joke == randomJoke);

    if (!existentJoke){
        reportJokes.push(report1)
        document.getElementById('respuesta').innerHTML = 'Gracies per la valoració'
    } else {
        document.getElementById('respuesta').innerHTML = 'Ja has valorat aquest acudit'
    }
    
    
    console.log(reportJokes)
}

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
}


const weatherTemp = async () => {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=e7704bc895b4a8d2dfd4a29d404285b6&lat=41.38879&lon=2.15899", options)
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const data = response.json();
        return data
    } catch (error) {
        console.error("An error has ocurred: ", error);
        return null
    }
}


const datosWeather = async () => {
    const data = await weatherTemp();
    if (data) {
        let temp: Number = data.main.temp;
        let icon = data.weather[0].icon;
        let url = `https://openweathermap.org/img/wn/${icon}@2x.png`
        let imageElement = document.createElement('img')
        imageElement.src = url
        document.getElementById('weatherReport').appendChild(imageElement);
        document.getElementById('weatherReport').innerHTML += `${temp.toFixed(1)} C º`
    } else {
        console.log("Data couldn't be obtained");
    }
}

datosWeather()


const chuckJokes = async () => {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random', options);
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const data = (response).json();
        console.log(data)
        return data

    } catch (error) {
        console.error("An error has ocurred: ", error);
        return null
    }
}

const datosChuck = async () => {
    const data = await chuckJokes();
    if (data) {
        console.log(data.value)
        return data.value
    } else {
        console.log("Data couldn't be obtained");
    }
}

