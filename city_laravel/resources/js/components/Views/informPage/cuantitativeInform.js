import React, { useState, useEffect, useRef, createRef } from 'react'

import { fetchApi } from '../../../function/GlobalFunctions'
import TittleTab from '../../Atoms/tittleTab'
import ButtonGenerateInform from '../../Atoms/buttonGenerateInform';
import CardsAveranges from '../../Organisms/cardsStatisticResult/cardsAveranges';
import LoadingPage from '../loadingPage/loadingPage';
import ListInfo from '../../Organisms/listInfo/listInfo';
import domtoimage from 'dom-to-image';
import Graphline from '../../Organisms/graphline/graphline'

import PdfGenerateInform from '../pdfGenerateInform/pdfGenerateInform';

const CuantitativeInform = ({ titlePage }) => {
    const [dataForList, setDataForList] = useState([]);
    const [isLoaded, setisLoaded] = useState(true)
    const [isRef, setisRef] = useState(true)
    const [imgA, setImgA] = useState(null)
    const [jsonApi, setJsonApi] = useState([]);
    const [error, setError] = useState(null)
    const containerRef = createRef();
    const tittlesList = [
        "Nombre de estudiante",
        "Usuario",
        "Matematicas",
        "Lenguaje",
        "Competencias ciudadanas",
        "Inglés",
        "Sociales",
        "Naturales",
        "Ultima Conexion"
    ]

    useEffect(() => {
        fetchData();

    }, [])

    function Foto() {
        domtoimage
            .toPng(containerRef.current, { quality: 1 })
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                setImgA(dataUrl)
                setisRef(false)

            })
            .catch(function (error) {
                setisRef(true)
                console.error("oops, something went wrong!", error);
            });
        // return (
        //     <div>
        //         <img src={imgA} className="img-fluid" alt="Responsive image">
        //         </img>
        //     </div>
        // )

    }


    useEffect(() => {
        if (containerRef.current != null) {
            Foto()
        } else {
            setisRef(true)
        }
    }, [containerRef])

    async function fetchData() {
        try {
            const result = await fetchApi(`https://raw.githubusercontent.com/DuvanMorenoCardona/json/master/tableList1.json`)
            result.List.map(
                (item) => {
                    let dataInstitution = []
                    // add info institution into array dataInstitution for concat at dataForList
                    dataInstitution.push(item.name, item.town, item.Matematicas, item.Lenguaje, item.Competencias, item.Ingles, item.Sociales, item.Naturales)
                    setDataForList(dataForList => [...dataForList, dataInstitution])
                }
            )
            setisLoaded(false)
            cons
        } catch (error) {

            setError(error)
            setisLoaded(true)
        }
    }

    // async function fetchData() {
    //     setisLoaded(true)
    //     try {
    //         const result = await fetchApi(`https://my-json-server.typicode.com/DuvanMorenoCardona/json/db`)
    //         setJsonApi(result.Departamentos)
    //         setisLoaded(false)
    //     } catch (error) {
    //         setisLoaded(true)
    //         setError(error)
    //     }
    // }


    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <div className='col-md-12'>

                {false && <ListInfo tittleList={tittlesList} contentList={dataForList} ref={containerRef} />
                }
                {/* <Graphline jsonApi={jsonApi} ref={containerRef} /> */}
                {isRef ? <LoadingPage /> : <div>
                    <img src={imgA} className="img-fluid" alt="Responsive image">
                    </img>
                </div>}
                {/* {isRef ? Foto() : <LoadingPage/>}
                <PDFViewer className="view-Pdf col-md-12">
                    <PdfGenerateInform imgR = {imgA} />
                </PDFViewer> */}
            </div>
        )
    }

}

export default CuantitativeInform