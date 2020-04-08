import React, { useState, useEffect } from 'react'

import { fetchApi } from '../../../function/GlobalFunctions'
import TittleTab from '../../Atoms/tittleTab';
import CardGraph from '../../Organisms/cardGraph/cardGraph';
import CardConvenciones from '../../Organisms/cardConvenciones/cardConvenciones';
import LoadingPage from '../loadingPage/loadingPage';
import GroupCardsAverage from '../../Organisms/groupCardsAverage/groupCardsAverage';


const ResultSubjectStudent = ({ idForFetch, showAllData, nameItemClicked, limitsForyLabels }) => {
    const [isLoaded, setisLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [jsonApi, setJsonApi] = useState([]);
    const tabs = [
        { id: 'General' },
        { id: 'Matematicas' },
        { id: 'Lenguaje' },
        { id: 'Competencias' },
        { id: 'Ingles' },
        { id: 'Sociales' },
        { id: 'Naturales' },
    ];

    const [subjectResultByGrade, setsubjectResultByGrade] = useState([])

    const [dataGamesPlayed, setdataGamesPlayed] = useState()

    const [dataSchool, setdataSchool] = useState()

    const conventions = [
        {
            title: 'Alto',
            desc: 'Después de recibir la instrucción, el estudiante en un solo intento desarrolla la actividad propuesta de manera exitosa.'
        },
        {
            title: 'Medio',
            desc: 'Al recibir la instrucción, el estudiante desarrolla la actividad propuesta de manera exitosa después de 1, 2 ó 3 intentos, necesitando consultar la instrucción.'
        },
        {
            title: 'Bajo',
            desc: 'Al recibir la instrucción, el estudiante desarrolla la actividad propuesta de manera exitosa después de más de 5 intentos.'
        },
        {
            title: 'Sin evidencias',
            desc: 'No se tienen datos registrados.'
        }
    ]

    const desc = [
        {
            title: 'Matematicas',
            desc: ''
        },
        {
            title: 'Lenguaje',
            desc: ''
        },
        {
            title: 'Competencias ciudadanas',
            desc: ''
        },
        {
            title: 'Inglés',
            desc: ''
        },
        {
            title: 'Sociales',
            desc: ''
        },
        {
            title: 'Naturales',
            desc: ''
        }
    ]

    useEffect(() => {
        fetchData();
    }, [idForFetch])

    async function fetchData() {
        setisLoaded(true)
        try {
            const result = await fetchApi(`http://127.0.0.1:8000/student/${idForFetch}`)
            setJsonApi(result)

            const gamesPlayedInfo = await fetchApi(`http://127.0.0.1:8000/gamesPlayed/student/${idForFetch}`)
            setdataGamesPlayed(gamesPlayedInfo)

            const getSubjectResultByGrade = await fetchApi(`http://127.0.0.1:8000/byGrade/student/${idForFetch}`)
            const getEvaluateData = await fetchApi(`http://127.0.0.1:8000/byGrade/school/student/${idForFetch}`)
            isDataSubject(getSubjectResultByGrade, getEvaluateData)

            // console.log("TCL: fetchData -> getSchool", getSchool)
            // setdataSchool(getSchool)

            setisLoaded(false)
        } catch (error) {
            console.log("TCL: fetchData -> error", error)
            setisLoaded(true)
            setError(error)
        }
    }


    function isDataSubject(result, evaluateData) {
        console.log("TCL: isDataSubject -> result", result.message)
        if (result.message == undefined) {
            console.log("TCL: isDataSubject -> result", result)
            Object.keys(result).map(
                i => {
                    let grade = {
                        name: `Grado ${i}`,
                        subjects: [],
                        evaluate: []
                    }
                    result[i].map(
                        item => grade.subjects.push({
                            average: item.average, name: `${item.subject.charAt(0).toUpperCase()}${item.subject.slice(1)}`
                        })
                    )

                    if (evaluateData[i] !== undefined) {
                        evaluateData[i].map(
                            (item) =>
                                grade.evaluate.push(
                                    {
                                        average: item.average, name: `${item.subject.charAt(0).toUpperCase()}${item.subject.slice(1)}`
                                    }
                                )
                        )
                    }

                    setsubjectResultByGrade(subjectResultByGrade => [...subjectResultByGrade, grade])
                }
            )
        } else {
            setsubjectResultByGrade([])
        }
    }

    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <div className="col-12">
                <TittleTab
                    tittle={'Resultados por Asignatura'}
                    nameItemClicked={nameItemClicked} />

                <GroupCardsAverage titleCardTotalGames="Total de juegos" averageTotalGames={dataGamesPlayed.total_games} titleAverage="Promedio de juegos jugados" averageGamesPlayed={dataGamesPlayed.games_played} />


                <CardGraph
                    titleCard={'Datos Generales'}
                    jsonApi={jsonApi}
                    showAllData={showAllData}
                    heightGraph={225}
                    widthGraph={768}
                    // typeGraph={'line'}
                    limitsForyLabels={limitsForyLabels}
                />


                {
                    subjectResultByGrade.length > 0 &&
                    subjectResultByGrade.map(
                        (item, i) =>
                            <div key={i} >
                                <CardGraph
                                    titleCard={item.name}
                                    jsonApi={item.subjects}
                                    showAllData={showAllData}
                                    // typeGraph={'line'}
                                    limitsForyLabels={limitsForyLabels}
                                />
                                {
                                    item.evaluate.length > 0 &&
                                    <CardGraph
                                        titleCard={`${item.name} evaluación`}
                                        jsonApi={item.evaluate}
                                        showAllData={showAllData}
                                        // typeGraph={'line'}
                                        limitsForyLabels={limitsForyLabels}
                                    />

                                }
                            </div>
                    )
                }
                {/* <CardConvenciones desc={desc} conventions={conventions} showDesc={false} /> */}

            </div>
        )
    }

}
export default ResultSubjectStudent