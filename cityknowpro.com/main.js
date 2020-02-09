window.addEventListener("load", function() {
  var app = new Vue({
    el: "#app",
    data: {
      windowStatus: 0,
      window: {
        0: {
          buttons: [
            {
              class: "btn2-city",
              img: "./img/si.png",
              label: "Sístema de Información",
              action: {
                type: "navigate",
                to: './si'
              }
            },
            {
              class: "btn2-city locked",
              img: "./img/game.png",
              label: "City Know Pro",
              action: {
                type: "navigate",
                to: 0
              }
            },
            {
              class: "btn2-city",
              img: "./img/game2.png",
              label: "Inteligencias Multiples",
              action: {
                type: "window",
                to: 2
              }
            },
            {
              class: "btn2-city",
              img: "./img/books.png",
              label: "Tipologías de Uso",
              action: {
                type: "window",
                to: 1
              }
            }
          ]
        },
        1: {
          info:'Accede a la cartilla de la tipologías de uso para:  ',
          buttons: [
            {
              class: "btn-city",
              img: "./img/im.png",
              label: "Talentos Excepcionales",
              action: {
                type: "navigate",
                to: "https://indd.adobe.com/view/f4164f4e-834e-48fa-86f8-ee6cb296a4c5"
              }
            },
            {
              class: "btn-city",
              img: "./img/da.png",
              label: "Discapacidad Auditiva",
              action: {
                type: "navigate",
                to: "https://indd.adobe.com/view/440988e0-0533-482e-bf0d-a5f8c0baaf7a"
              }
            },
            {
              class: "btn-city",
              img: "./img/dv.png",
              label: "Discapacidad Visual",
              action: {
                type: "navigate",
                to: "https://indd.adobe.com/view/18fcdaa5-08e9-4515-b80e-c57dff858d4a"
              }
            },
            {
              class: "btn-city",
              img: "./img/dm.png",
              label: "Discapacidad Motriz",
              action: {
                type: "navigate",
                to: "https://indd.adobe.com/view/98d4038d-2e84-4871-841c-1fd71ef7a991"
              }
            },
            {
              class: "btn-city",
              img: "./img/dc.png",
              label: "Discapacidad Cognitiva",
              action: {
                type: "navigate",
                to: "https://indd.adobe.com/view/6e07cdc3-cbd2-4b53-8589-57ddf3a0f92a"
              }
            }
          ]
        },
        2: {
          info:'Accede a los minijuegos o al lector QR',
          buttons: [
            {
              class: "btn2-city",
              img: "./img/game2.png",
              label: "Inteligencias Multiples",
              action: {
                type: "navigate",
                to: "./imgame"
              }
            },
            {
                class: "btn2-city",
                img: "./img/qr.png",
                label: "Lector de Código QR",
                action: {
                  type: "navigate",
                  to: "./inteligencias"
                }
              }
          ]
        }
      }
    },
    methods: {
      btnOnAction: action => {
        var type = action.type;
        var to = action.to;
        if (type === "navigate") {
          window.location = to;
        } else if (type === "window") {
          app.windowStatus = to;
        }
      },
      goHome: () => {
        app.windowStatus = 0;
      }
    }
  });
});
