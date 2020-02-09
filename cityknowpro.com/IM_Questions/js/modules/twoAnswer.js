const url = new URL(window.location);
const user = url.searchParams.get("username");
const indexS = url.searchParams.get("index")
const indexI = parseInt(indexS)
console.log("user", user, "index", indexI)

// var inteligence = data.firstGrade[indexI].intelligences;
// var style = data.firstGrade[indexI].styles;
var arrayJson = []

json.playerid = user;
// json.intelligenceGames[0].intelligences = inteligence;
// json.intelligenceGames[0].styles = style;
console.log(json)

var value1 = document.getElementById('value1');
var value2 = document.getElementById('value2');
var btn = document.getElementById('btn');
btn.disabled = true;


function back(url) {
    window.location = `${url}?username=${user}`
}


function select() {
    if (value1.value === 'Lo logré' && value2.value != '') {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function enableBtn() {
    // console.log(game)
    if (value1.value === 'Lo logré' && value2.value !== '') {
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
        console.log(json);
        window.location = `${urlBack}?username=${user}`;
    }).catch(error => console.error('error', error));
}