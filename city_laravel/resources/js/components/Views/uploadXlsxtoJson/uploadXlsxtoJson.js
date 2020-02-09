import React, { useState, useEffect } from 'react'
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';

const UploadXlsxtoJson = () => {
    const [file, setFile] = useState({})
    const [dataJson, setDataJson] = useState({
        data: [],
        cols: []
    })
    const [UsersJson, setUsersJson] = useState(null)
    const [textInput, settextInput] = useState("Seleccionar Archivo")
    // const [data , setData] = useState([])
    // const [cols , setCols] = useState([])


    const handleChange = (e) => {
        const files = e.target.files;
        // console.log("TCL: handleChange -> files", files[0].name)
        if (files && files[0]) setFile(files[0]);
        settextInput(files[0].name)
    }

    const handleFile = () => {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];

            const ws = wb.Sheets[wsname];
            console.log("TCL: reader.onload -> ws", ws)
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            setDataJson({ data: data, cols: make_cols(ws['!ref']) });
            setUsersJson(
                {
                    "users": data
                }
            )
        };

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        };


    }

    function getToken() {
        const metas = document.getElementsByTagName('meta');

        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === "csrf-token") {
                return metas[i].getAttribute('content');
            }
        }
    }

    function keysToLowerCase(obj) {
        if (obj instanceof Array) {
            for (var i in obj) {
                obj[i] = keysToLowerCase(obj[i]);
            }
        }
        if (!typeof (obj) === "object" || typeof (obj) === "string" || typeof (obj) === "number" || typeof (obj) === "boolean") {
            return obj;
        }
        var keys = Object.keys(obj);
        var n = keys.length;
        var lowKey;
        while (n--) {
            var key = keys[n];
            if (key === (lowKey = key.toLowerCase()))
                continue;
            obj[lowKey] = keysToLowerCase(obj[key]);
            delete obj[key];
        }
        return (obj);
    }

    useEffect(() => {
        const contentMeta = getToken();
        // console.log("TCL: UploadXlsxtoJson -> metas", contentMeta)
        var url = 'http://127.0.0.1:8000/simat/students';
        let jsonWithLowerCaseKey = keysToLowerCase(dataJson.data)
        var data = {
            "users": jsonWithLowerCaseKey
        }
        console.log("TCL: handleFile -> data", data)
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': contentMeta,
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }, [dataJson])

    return (
        <div className='content-uploadxlsm col-md-12 d-flex align-items-center justify-content-center text-center'>
            <div>
                <div>
                    <label className='title-group  text-center' htmlFor="file"> Subir un archivo XLSX </label>
                </div>

                <div className="custom-file mb-5 mt-5">
                    <input type="file" className="custom-file-input" id="customFileLang" lang="es" accept={SheetJSFT} onChange={handleChange} />
                    <label className="custom-file-label" for="customFileLang">{textInput}</label>
                </div>

                <input className='btn-uploadFile btn' type='submit'
                    value="Subir archivo"
                    onClick={handleFile} />
            </div>
        </div>
    )
}
export default UploadXlsxtoJson