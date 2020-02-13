var resources = null;
var videos = null;
var links = null;
var scannerReady = false;
try {
  fetch("./assets/resources.json")
    .then(response => response.json())
    .then(data => (resources = data["resources"]))
    .then(() => console.log(resources))
    .then(() => {
      if (resources) {
        videos = resources.filter(r => r.type === "video");
        links = resources.filter(r => r.type === "link");

        videos.forEach(resource => {
          var asset = createAssets(resource);
          createVideoMarker(resource, asset);
        });

        // links.forEach(resource => {
        //     createLinkMarker(resource);
        // });
      }
    })
    .then(() => {
      //createQrScanner();
    });
} catch (error) {
  alert("Error al conseguir los recursos");
}

function createAssets(resource) {
  var video = document.createElement("video");
  video.setAttribute("id", `${resource.id}-video`);
  video.setAttribute("loop", false);
  video.setAttribute("src", resource.src);
  var asset = document.createElement("a-assets");
  asset.appendChild(video);
  document.querySelector("a-scene").appendChild(asset);
  return video;
}

function createVideo(resourceId) {
  var aVideo = document.createElement("a-video");
  aVideo.setAttribute("src", `#${resourceId}-video`);
  aVideo.setAttribute("width", "3");
  aVideo.setAttribute("height", "1.5");
  aVideo.setAttribute("rotation", "-90 0 0");
  return aVideo;
}

function createMarker(resource) {
  var marker = document.createElement("a-marker");
  marker.setAttribute("id", resource.id);
  marker.setAttribute("type", "pattern");
  marker.setAttribute("url", resource.marker);
  return marker;
}

function createVideoMarker(resource, asset) {
  var marker = createMarker(resource);
  marker.appendChild(createVideo(resource.id));
  document.querySelector("a-scene").appendChild(marker);
  marker.addEventListener("markerFound", function(event) {
    asset.play();
  });
  marker.addEventListener("markerLost", function(event) {
    asset.pause();
  });
}

// function createLinkMarker(resource) {
//     var marker = createMarker(resource);
//     var cursor = document.getElementById("cursor");
//     marker.addEventListener("markerFound", function (event) {
//         setTimeout(() => {
//             window.open(resource.src, "_blank");
//         }, 500);
//     });
//     document.querySelector("a-scene").appendChild(marker);
// }

function createQrScanner() {
  var observer = new MutationObserver(function(mutationList) {
    for (var mutation of mutationList) {
      for (var child of mutation.addedNodes) {
        if (child.nodeName === "VIDEO") {
          if (!scannerReady) {
            child.setAttribute("id", "preview");
            child.classList.add("video-back")
            scannerReady = true;
            instatiateScanner();
          }
        }
      }
    }
  });
  observer.observe(document, { childList: true, subtree: true });
}

function instatiateScanner() {
  let scanner = new Instascan.Scanner({
    video: document.getElementById("preview")
  });
  scanner.addListener("scan", function(content) {
    if (links.some(l => l.src === content)) {
        console.log(content)
      //window.open(content, "_blank");
    }
  });
  Instascan.Camera.getCameras()
    .then(function(cameras) {
        console.log(cameras)
      switch (cameras.length) {
        case 2:
          scanner.mirror = false;
          scanner.start(cameras[1]);
          break;
        case 1:
          scanner.start(cameras[0]);
          break;
        default:
          console.error("No cameras found");
      }
    })
    .catch(function(e) {
      console.error(e);
    });
}

function gotoHome() {
  localStorage.removeItem("resources");
  window.history.back();
}
