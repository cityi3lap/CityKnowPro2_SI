const url = new URL(window.location);
const user = url.searchParams.get("username");

function back () {
    window.location = `./principal.html?username=${user}`
}

function openPage(url, index) {
    window.location = `${url}?username=${user}&index=${index}`
}