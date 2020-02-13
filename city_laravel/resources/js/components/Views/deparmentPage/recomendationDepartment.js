
import React, { useEffect, useState } from 'react'

import LoadingPage from '../loadingPage/loadingPage'
import { fetchApi } from '../../../function/GlobalFunctions'
import TittleTab from '../../Atoms/tittleTab'
import CollapseRecomendation from '../../Organisms/collapseRecomendation/collapseRecomendation'

const RecommendationDepartment = ({ idForFetch, nameItemClicked }) => {

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
        let subject = await fetchApi(`http://127.0.0.1:8000/recomendations/department/${idForFetch}`)
        if (subject.message === undefined && Object.is(subject, subject)) {
            console.log("TCL: FetchSubject -> subject", subject.length)

            Object.keys(subject).map(
                i => {
                    let grade = {
                        name: `Grado ${i}`,
                        subjects: []
                    }
                    subject[i].map(
                        item =>
                            grade.subjects.push(
                                {
                                    name: item.subject_name,
                                    performance: item.performance,
                                    recomendation: item.recomendation
                                }
                            )
                    )
                    setdataSubjects(dataSubjects => [...dataSubjects, grade])
                }
            )

        } else {
            setdataSubjects([{
                name: 'Sin registro de datos',
                subjects: [
                    {
                        name: 'No se tienen datos',
                        performance: 'No se tienen datos',
                        recomendation: 'No se tienen datos'
                    }
                ]
            }])

        }
    }

    async function FetchIntelligences(params) {
        let itelliences = await fetchApi(`http://127.0.0.1:8000/intelligences/department/${idForFetch}`)
        if (itelliences.message === undefined || itelliences.length > 0) {
            setdataIntelligence(itelliences)
        } else {
            setdataIntelligence([{
                average: '',
                all_decsc: 'No se tiene evidencia de ninguna dato',
                name: 'Sin registro de datos'
            }])

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
                    tittle={'Recomendaciones'}
                    nameItemClicked={nameItemClicked} />
                <CollapseRecomendation
                    dataIntelligence={dataIntelligence}
                    dataSubjects={dataSubjects} />
            </div>
        )
    }
}

export default RecommendationDepartment;