const url = new URL(window.location);
const user = url.searchParams.get("username");
const indexS = url.searchParams.get("index")
const indexI = parseInt(indexS)
console.log("user", user, "index", indexI)

// var inteligence = data.firstGrade[indexI].intelligences;
// var style = data.firstGrade[indexI].styles;
// var arrayJson = []

json.playerid = user;
// json.intelligenceGames[0].intelligences = inteligence;
// json.intelligenceGames[0].styles = style;
console.log(json)

var value1 = document.getElementById('value1');
var value2 = document.getElementById('value2');
var value3 = document.getElementById('value3');
var value4 = document.getElementById('value4');
var value4 = document.getElementById('value5');
var value4 = document.getElementById('value6');
var value4 = document.getElementById('value7');
var btn = document.getElementById('btn');
btn.disabled = true;


function back(url) {
    window.location = `${url}?username=${user}`
}

function gildardo() {
    if(value1.value === 'Lo logré' && value2.value !== '' && value3.value === 'Lo logré' && value4.value === 'Lo logré'){
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function theCondor() {
    if (value1.value === '20' && value2.value === '20' && value3.value === '20') {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function gestures() {
    if(value1.checked || value2.checked || value3.checked || value4.checked || value5.checked || value6.checked || value7.checked){
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

async function ingresar(urlBack, inteligence, style) {
    var inteligence = inteligence;
    var style = style;

    json.intelligenceGames[0].intelligences = await inteligence;
    json.intelligenceGames[0].styles = await style;
    console.log('aja che', json)

    fetch('http://localhost:8000/api/saveRecords', {
        method: 'PUT',
        body: JSON.stringify(json),
        headers: new Headers({
            "content-type": "aplication/json",
        }),
        mode: 'cors',
        cache: 'default'
    }).then(res => res.json()).then(json => {
        console.log('aja',json);
        window.location = `${urlBack}?username=${user}`;
    }).catch(error => console.error('error', error));
}