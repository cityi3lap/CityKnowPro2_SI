import React, { useState, useEffect } from 'react'
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';

import { fetchPOST } from '../../../function/GlobalFunctions'


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


    const dataDisability = [
        {
            Docdasability: "AUTISMO",
            text: "cognitiva",
        },
        {
            Docdasability: "BAJA VISIÓN DIAGNOSTICADA",
            text: "visual",
        },
        {
            Docdasability: "CEGUERA",
            text: "visual",
        },
        {
            Docdasability: "DEFICIENCIA COGNITIVA (RETARDO MENTAL)",
            text: "cognitiva",
        },
        {
            Docdasability: "HIPOACUSIA O BAJA AUDICIÓN",
            text: "auditiva",
        },
        {
            Docdasability: "LIMITACIÓN FÍSICA (MOVILIDAD)",
            text: "motora",
        },
        {
            Docdasability: "PARÁLISIS CEREBRAL",
            text: "cognitiva",
        },
        {
            Docdasability: "PSICOSOCIAL",
            text: "cognitiva",
        },
        {
            Docdasability: "SÍNDROME DE DOWN",
            text: "cognitiva",
        },
        {
            Docdasability: "SORDERA PROFUNDA",
            text: "auditiva",
        },
        {
            Docdasability: "SORDOS USUARIOS DE CASTELLANO ORAL",
            text: "auditiva",
        },
        {
            Docdasability: "SORDOS USUARIOS DE LENGUA DE SEÑAS",
            text: "auditiva",
        }
    ]


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

    function keysToLowerCase(obj) {

        let infoFilterForFetch = []

        obj.map(
            (item) => {

                let dissbilityForPush = findDissability(item.TIPOS_DISCAPACIDAD)
                infoFilterForFetch.push(
                    {
                        doc: item.NRO_IDENTIDAD,
                        codigo_dane_sede: `${item.NOMBRES_SEDES}`,
                        grado_cod: item.COD_GRADO,
                        apellido1: item.PRI_APE,
                        apellido2: item.SEG_APE,
                        nombre1: item.PRI_NOM,
                        nombre2: item.SEG_NOM,
                        dissability: dissbilityForPush,
                    }
                )
            }
        )

        return infoFilterForFetch;
        // if (obj instanceof Array) {
        //     for (var i in obj) {
        //         obj[i] = keysToLowerCase(obj[i]);
        //     }
        // }
        // if (!typeof (obj) === "object" || typeof (obj) === "string" || typeof (obj) === "number" || typeof (obj) === "boolean") {
        //     return obj;
        // }
        // var keys = Object.keys(obj);
        // var n = keys.length;
        // var lowKey;
        // while (n--) {
        //     var key = keys[n];
        //     if (key === (lowKey = key.toLowerCase()))
        //         continue;
        //     obj[lowKey] = keysToLowerCase(obj[key]);
        //     delete obj[key];
        // }
        // return (obj);
    }

    function findDissability(dissabilityDocument) {
        let isDissability = dataDisability.find(Dissability => Dissability.Docdasability == dissabilityDocument)
        if (isDissability == undefined) {
            return "ninguno"
        }
        return isDissability.text
    }

    useEffect(() => {
        let jsonWithLowerCaseKey = keysToLowerCase(dataJson.data)
        var data = {
            "users": jsonWithLowerCaseKey
        }
        console.log("TCL: handleFile -> data", data)

        if ( data.users.length > 0) {
            fetchPOSTDATA(data)
        }

    }, [dataJson])


    async function fetchPOSTDATA(data) {
        var url = 'http://127.0.0.1:8000/simat/students';

        try {
            const data = await fetchPOST(url, JSON.stringify(data), "POST")
            console.log("TCL: UploadXlsxtoJson -> data", data)

        } catch (error) {
            console.log("TCL: UploadXlsxtoJson -> error", error)

        }
    }

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