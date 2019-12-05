window.addEventListener("load", (event) => {
    var app = new Vue({
        el: '#app',
        data: {
            markers: []
        },
        mounted: () => {
            //get data
            fetch('./data.json')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data.markers) {
                        app.markers = data.markers
                    }
                    else {
                        console.log('JSON data Error')
                    }
                })
                //add listeners
                .then(()=>{
                    app.addEventListener('markerFound',()=>{
                        console.log('yai')
                    })
                })
        },
    });
}
);
