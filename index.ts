
jokes()

let randomJoke: string = ''
let actualJoke: String = ''

function jokes() {

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
        randomJoke = data.joke;
        document.getElementById('randomJoke').innerHTML = randomJoke
        actualJoke = randomJoke
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
        return data
        
    } catch (error) {
        console.error("An error has ocurred: ", error);
        return null
    }
}

let randomChuck = ''

const datosChuck = async () => {
    const data = await chuckJokes();
    if (data) {
        document.getElementById('randomJoke').innerHTML = data.value
        randomChuck = data.value
        actualJoke = randomChuck
        return randomChuck
    } else {
        console.log("Data couldn't be obtained");
    }
}


function mostrar() {

    let random = Math.floor(Math.random() * 2)

    if (random == 0){
        jokes()
    } else {
        datosChuck()
    }

    cambiarFormaBlob()
}


type report = {
    joke: string
    score: number
    date: `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`
    changed: boolean;
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
        date: fechaActualISO as `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`,
        changed: false
    }
 
    const report2: report = {
        joke: randomChuck,
        score: selectedScore,
        date: fechaActualISO as `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`,
        changed: false
    }


    let existentJoke = reportJokes.find(element => element.joke == randomJoke);
    let existentJoke2 = reportJokes.find(element => element.joke == randomChuck)


    if (selectedScore == undefined) {
        document.getElementById('respuesta').innerHTML = 'No has seleccionat cap puntuació'
        return 
    }
    if (!existentJoke && randomJoke == actualJoke){
        reportJokes.push(report1)
        document.getElementById('respuesta').innerHTML = 'Gracies per la valoració'
    } else if (!existentJoke2 && actualJoke == randomChuck){
        reportJokes.push(report2)
        document.getElementById('respuesta').innerHTML = 'Gracies per la valoració'
    } else {

        if (existentJoke && !existentJoke.changed && randomJoke === actualJoke) {
            existentJoke.score = selectedScore;
            existentJoke.date = fechaActualISO as `${number}-${number}-${number}T${number}-${number}-${number}.${number}Z`;
            existentJoke.changed = true;
            document.getElementById('respuesta').innerHTML = 'Has canviat la teva valoració';
        } else if (existentJoke2 && !existentJoke2.changed) {
            existentJoke2.score = selectedScore;
            existentJoke2.date = fechaActualISO as `${number}-${number}-${number}T${number}-${number}-${number}.${number}Z`;
            existentJoke2.changed = true;
            document.getElementById('respuesta').innerHTML = 'Has canviat la teva valoració';
        } else {
            document.getElementById('respuesta').innerHTML = 'Ja has valorat aquest acudit';
        }
    }
    
    console.log(reportJokes)
}


function cambiarFormaBlob() {

    let randomNumber = Math.floor(Math.random() * 3) + 1;

    let nuevaRuta: string = '';

    if (randomNumber == 1) {
        nuevaRuta = "images/blob.svg";
    } else if (randomNumber == 2) {
        nuevaRuta = "images/blob2.svg";
    } else if (randomNumber == 3) {
        nuevaRuta = "images/blob3.svg";
    }

    let imagen = document.getElementById("dynamicImg") as HTMLImageElement;

    imagen.src = nuevaRuta;
}
