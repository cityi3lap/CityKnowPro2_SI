
import React, { useEffect, useState } from 'react'

import LoadingPage from '../loadingPage/loadingPage'
import { fetchApi } from '../../../function/GlobalFunctions'
import TittleTab from '../../Atoms/tittleTab'
import CollapseRecomendation from '../../Organisms/collapseRecomendation/collapseRecomendation'

const RecomendationStudent = ({ idForFetch, nameItemClicked }) => {

    const [dataSubjects, setdataSubjects] = useState([])
    const [dataIntelligence, setdataIntelligence] = useState([])


    const [isLoaded, setisLoaded] = useState(true)
    const [error, seterror] = useState(null)

    function fetchData() {
        setisLoaded(true)
        try {
            console.log("Hola voy a ejecutar fetch Subject")
            FetchSubject();
            console.log("Hola voy a ejecutar fetch Intelilligences")
            FetchIntelligences();

        } catch (error) {
            setisLoaded(true)
            seterror(error)
        }
    }

    async function FetchSubject() {
        let subject = await fetchApi(`http://127.0.0.1:8000/student/${idForFetch}`)
        console.log("TCL: FetchSubject -> subject", subject)
        if (subject.message === undefined && subject.length > 0) {
            console.log("TCL: FetchSubject", subject)
            setdataSubjects(subject)
        } else {
            setdataSubjects([
                {
                    average: '',
                    all_decsc: 'No se tiene evidencia de ninguna dato',
                    name: 'Sin registro de datos'
                }
            ])

        }
        // setdataSubjects(subject)
    }

    async function FetchIntelligences() {
        let itelliences = await fetchApi(`http://127.0.0.1:8000/intelligences/${idForFetch}`)
        console.log("TCL: FetchIntelligences -> itelliences", itelliences)
        // console.log("TCL: F Ing", itelliences.length)

        if (itelliences.length > 0 && subject.message === undefined) {
            console.log("TCL: entro Intelligence", itelliences.length)
            setdataIntelligence(itelliences)
        } else {
            setdataIntelligence([
                {
                    average: '',
                    all_decsc: 'No se tiene evidencia de ninguna dato',
                    name: 'Sin registro de datos'
                }
            ])

        }
        // setdataIntelligence(itelliences)
    }

    useEffect(() => {
        fetchData();
    }, [idForFetch])

    useEffect(() => {
        if (dataIntelligence.length > 0 && dataSubjects.length > 0) {
            setisLoaded(false)
        }
    }, [dataIntelligence, dataSubjects])


    if (isLoaded) {
        return (
            <LoadingPage />
        )
    } else {
        return (
            <div className="mt-5 col-12">
                <TittleTab
                    tittle="Recomendaciones"
                    nameItemClicked={nameItemClicked} />
                <CollapseRecomendation
                    dataIntelligence={dataIntelligence}
                    dataSubjects={dataSubjects} />
            </div>
        )
    }
}

export default RecomendationStudent;