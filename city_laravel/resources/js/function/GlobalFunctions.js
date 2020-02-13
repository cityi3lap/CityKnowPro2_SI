
export async function fetchApi(url) {

  const res = await fetch(url).then()
  let result = await res.json();
  return result

}


export async function fetchPOST(url, dataJson, typeFetch) {
  let prueba;
  const contentMeta = getToken();

  await fetch(url, {
    method: typeFetch, // or 'PUT'
    body: JSON.stringify(dataJson), // data can be `string` or {object}!
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': contentMeta
    }
  }).then(result => {
      console.log("TCL: fetchPOST -> result", result)
      prueba = result.status;
      return prueba;
}).then( prueba => { console.log(prueba); alert("La acción se realizo de manera correcta")})
.catch((err) => { return err })

}

function getToken() {
  const metas = document.getElementsByTagName('meta');

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === "csrf-token") {
      return metas[i].getAttribute('content');
    }
  }
}