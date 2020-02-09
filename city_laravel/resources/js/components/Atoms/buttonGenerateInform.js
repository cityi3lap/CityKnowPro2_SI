import React, { useEffect, useState, createRef } from 'react'

import { renderToString } from "react-dom/server";
import { fetchApi } from '../../function/GlobalFunctions';
import { useRouteMatch } from 'react-router-dom';


import jsPDF from 'jsPDF'
import PdfGenerateInform from '../Views/pdfGenerateInform/pdfGenerateInform';
import Graphline from '../Organisms/graphline/graphline';

import ReactToPrint from "react-to-print";

const ButtonGenerateInform = ({ idForFetch, routeFetchCompetitions, routeFetchIntelligence, routeFetchStyles, routeFetchStyleCompetitions, routeFetchIntelligenceCompetitions, limitsForyLabels, nameItemClicked }) => {

    const { params, url } = useRouteMatch();
    const [isLoaded, setisLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [jsonApiCompetitions, setJsonApiCompetitions] = useState([]);
    const [jsonApiIntelligence, setJsonApiIntelligence] = useState([]);
    const [jsonApiStyles, setJsonApiStyles] = useState([]);


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
            let competitions = await fetchApi(`${routeFetchCompetitions}/${idForFetch}`)
            setJsonApiCompetitions(competitions)
            let intelligence = await fetchApi(`${routeFetchIntelligence}/${idForFetch}`)
            setJsonApiIntelligence(intelligence)

            if (intelligence.message === undefined) {
                setisDataIntelligences(true)
            }

            let styles = await fetchApi(`${routeFetchStyles}/${idForFetch}`)
            setJsonApiStyles(styles)

            if (styles.message === undefined) {
                setisDataStyles(true)
            }

            const intelligenceCompetition = await fetchApi(`${routeFetchIntelligenceCompetitions}/${idForFetch}`)
            getIntelligences(intelligenceCompetition)

            const stylesCompetition = await fetchApi(`${routeFetchStyleCompetitions}/${idForFetch}`)
            getStyles(stylesCompetition)

            setisLoaded(false)
        } catch (error) {
            console.warn(error)
            setisLoaded(true)
            setError(error)
        }
    }



    function getIntelligences(intelligenceCompetition) {
        if (intelligenceCompetition.message === undefined) {
            setIntelligenceForCompentition(intelligenceCompetition)
        }
    }

    function getStyles(stylesCompetition) {
        if (stylesCompetition.message === undefined) {
            setStyleForCompentition(stylesCompetition)
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
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default ButtonGenerateInform