function ingresar() {
    let user = document.getElementById('user').value;
    let inUser = document.getElementById('ingresar');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    // let get = {}
    const url = new URL(window.location);
    const param = url.searchParams.get("grade");

    try {
        fetch(`http://localhost:8000/api/userInfo/${user}`).then((res) => {
            console.log(res)
            if (res.status === 200) {
                localStorage.setItem('usuario', user);
                console.log("el usuario existe" + localStorage.getItem('usuario'));

                //redirecciona a la pagina que corresponde
                switch (param) {
                    case "firstgrade":
                        window.location = `./FirstGrade.html?username=${user}`;
                        break;
                    case "secondgrade":
                        window.location = `./SecondGrade.html?username=${user}`;
                        break;
                    case "fourthgrade":
                        window.location = `./FourthGrade.html?username=${user}`;
                        break;
                    case "sixthgrade":
                        window.location = `./SixthGrade.html?username=${user}`;
                        break;
                    case "eighthgrade":
                        window.location = `./EighthGrade.html?username=${user}`;
                        break;
                    default:
                        console.log('link incorrecto')
                        break;
                }
            } else {
                console.log('Este usuario no Existe');
                $('#exampleModalCenter').modal('show')
            }
        })
    } catch (error) {
        console.log(error)
    }
}