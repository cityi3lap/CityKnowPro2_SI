import React, { useEffect, useState, createRef } from 'react'

import { renderToString } from "react-dom/server";
import { fetchApi } from '../../function/GlobalFunctions';
import { useRouteMatch } from 'react-router-dom';


import jsPDF from 'jsPDF'
import PdfGenerateInform from '../Views/pdfGenerateInform/pdfGenerateInform';
import Graphline from '../Organisms/graphline/graphline';

import ReactToPrint from "react-to-print";

const ButtonGenerateInform = ({ idForFetch, routeFetchCompetitions, routeFetchIntelligence, routeFetchStyles, routeFetchStyleCompetitions, routeFetchIntelligenceCompetitions, limitsForyLabels, nameItemClicked, routeFetchVocational, routerFetchSubject }) => {

    const { params, url } = useRouteMatch();
    const [isLoaded, setisLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [jsonApiCompetitions, setJsonApiCompetitions] = useState([]);
    const [jsonApiIntelligence, setJsonApiIntelligence] = useState([]);
    const [jsonApiStyles, setJsonApiStyles] = useState([]);

    const [jsonApiVocation, setjsonApiVocation] = useState([]);

    const [jsonApiSubject, setjsonApiSubject] = useState([]);


    // this var defined if fetch intelligence and styles have data or not
    // if not, send false to pdf generator  
    const [isDataIntelligences, setisDataIntelligences] = useState(false)
    const [isDataStyles, setisDataStyles] = useState(false)

    const [intelligenceForCompentition, setIntelligenceForCompentition] = useState({
        1: { message: 'No se tienen datos' },
        2: { message: 'No se tienen datos' },
        3: { message: 'No se tienen datos' }
    });
    const [styleForCompentition, setStyleForCompentition] = useState({
        1: { message: 'No se tienen datos' },
        2: { message: 'No se tienen datos' },
        3: { message: 'No se tienen datos' }
    });

    const containerRef = createRef();

    useEffect(() => {
        setisDataIntelligences(false)
        setisDataStyles(false)
        setisLoaded(true)
        AllFetch();
    }, [idForFetch])

    async function AllFetch() {
        setisLoaded(true)
        try {
            // let competitions = await fetchApi(`${routeFetchCompetitions}/${idForFetch}`)
            // setJsonApiCompetitions(competitions)
            let intelligence = await fetchApi(`${routeFetchIntelligence}/${idForFetch}`)
            // setJsonApiIntelligence(intelligence)
            getIntelligences(intelligence)

            if (intelligence.message === undefined) {
                setisDataIntelligences(true)
            }

            let styles = await fetchApi(`${routeFetchStyles}/${idForFetch}`)
            getStyles(styles)

            if (styles.message === undefined) {
                setisDataStyles(true)
            }

            let subject = await fetchApi(`${routerFetchSubject}/${idForFetch}`)
            getSubject(subject)

            let vocational = await fetchApi(`${routeFetchVocational}/${idForFetch}`)
            getVocations(vocational)

            // const intelligenceCompetition = await fetchApi(`${routeFetchIntelligenceCompetitions}/${idForFetch}`)
            // getIntelligences(intelligenceCompetition)

            // const stylesCompetition = await fetchApi(`${routeFetchStyleCompetitions}/${idForFetch}`)
            // getStyles(stylesCompetition)


            setisLoaded(false)
        } catch (error) {
            console.warn(error)
            setisLoaded(true)
            setError(error)
        }
    }

    function getVocations(vocational) {
        console.log("TCL: getVocations -> vocational", vocational)
        if (vocational.message != undefined && Object.is(vocational, vocational)) {
            setjsonApiVocation([])
        } else {
            let dataSort = vocational.sort(function (a, b) {
                if (a.average < b.average) {
                    return 1;
                }
                if (a.average > b.average) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            setjsonApiVocation(dataSort.slice(0, 3))
        }
    }

    function getSubject(subject) {
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
                    setjsonApiSubject(dataSubjects => [...dataSubjects, grade])
                }
            )

        } else {
            setjsonApiSubject([{
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


    function getIntelligences(intelligenceCompetition) {
        console.log("TCL: getIntelligences -> intelligenceCompetition", intelligenceCompetition)
        if (intelligenceCompetition.message === undefined) {
            let dataSort = intelligenceCompetition.sort(function (a, b) {
                if (a.average < b.average) {
                    return 1;
                }
                if (a.average > b.average) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            setJsonApiIntelligence(dataSort.slice(0, 3))
        }
    }

    function getStyles(stylesCompetition) {
        if (stylesCompetition.message === undefined) {
            let dataSort = stylesCompetition.sort(function (a, b) {
                if (a.average < b.average) {
                    return 1;
                }
                if (a.average > b.average) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            setJsonApiStyles(dataSort.slice(0, 3))
        }
    }

    return (
        <div>
            <button type="button" className="float d-flex justify-content-center align-items-center" data-toggle="modal" data-target="#exampleModalLong">
                <i className="fas fa-print"></i>
            </button>

            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Generar Informe
                            </h5>
                            <div>
                                {isLoaded ? <div>Loading...</div> :
                                    <ReactToPrint
                                        trigger={() => <button type="button" className="btn btn-generate-inform" onClick={print}><i className="fas fa-print"></i></button>}
                                        content={() => containerRef.current}
                                    />}
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <PdfGenerateInform
                                ref={containerRef}
                                jsonApiCompetitions={jsonApiCompetitions} jsonApiIntelligence={jsonApiIntelligence}
                                jsonApiStyles={jsonApiStyles}
                                isLoaded={isLoaded}
                                name={nameItemClicked}
                                intelligenceForCompentition={intelligenceForCompentition}
                                styleForCompentition={styleForCompentition} limitsForyLabels={limitsForyLabels}
                                isDataIntelligences={isDataIntelligences}
                                isDataStyles={isDataStyles}
                                jsonApiSubject={jsonApiSubject}
                                jsonApiVocation={jsonApiVocation}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default ButtonGenerateInform