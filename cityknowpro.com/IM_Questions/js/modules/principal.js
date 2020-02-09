const url = new URL(window.location);
const user = url.searchParams.get("username");

function grades(grade) {
    window.location = `./${grade}.html?username=${user}`;
}