import React, { useState, useEffect } from 'react'
import CardCompetitions from '../../Organisms/cardCompetitions/cardCompetitions'
import LoadingPage from '../loadingPage/loadingPage'
import TittleTab from '../../Atoms/tittleTab';

import { fetchApi } from '../../../function/GlobalFunctions'


const ResultCompetitionsHeadquarter = ({ idForFetch , nameItemClicked }) => {
    const [isLoaded, setisLoaded] = useState(true);
    const [error, setError] = useState(null);

    const [intelligenceForCompentition, setIntelligenceForCompentition] = useState({
        1: { message: "No info found." },
        2: { message: "No info found." },
        3: { message: "No info found." }
    });
    const [styleForCompentition, setStyleForCompentition] = useState({
        1: { message: "No info found." },
        2: { message: "No info found." },
        3: { message: "No info found." }
    });


    async function fetchData() {
        setisLoaded(true)
        try {
            const intelligence = await fetchApi(`http://127.0.0.1:8000/competences/intelligences/headquarter/${idForFetch}`)
            getIntelligences(intelligence)
            const styles = await fetchApi(`http://127.0.0.1:8000/competences/styles/headquarter/${idForFetch}`)
            getStyles(styles)

            setisLoaded(false)
        } catch (error) {
            setisLoaded(true)
            setError(error)
        }
    }

    function getIntelligences(intelligence) {
        if (intelligence.message === undefined) {
            setIntelligenceForCompentition(intelligence)
        } else {
        }
    }

    function getStyles(styles) {
        if (styles.message === undefined) {
            setStyleForCompentition(styles)
        } else {
        }
    }

    useEffect(() => {
        fetchData();
    }, [idForFetch])

    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <div className="col-12">
                <TittleTab tittle={'Resultados por competencia'} nameItemClicked={nameItemClicked}/>
                <CardCompetitions title={'Lectura Crítica'} titleGraph1={'Inteligencias Múltiples'} dataForGraph1={intelligenceForCompentition[1]} titleGraph2={'Estilos de aprendizaje'} dataForGraph2={styleForCompentition[1]} />
                <CardCompetitions title={'Razonamiento Cuantitativo'} titleGraph1={'Inteligencias Múltiples'} dataForGraph1={intelligenceForCompentition[2]} titleGraph2={'Estilos de aprendizaje'} dataForGraph2={styleForCompentition[2]} />
                <CardCompetitions title={'Comunicación Escrita'} titleGraph1={'Inteligencias Múltiples'} dataForGraph1={intelligenceForCompentition[3]} titleGraph2={'Estilos de aprendizaje'} dataForGraph2={styleForCompentition[2]} />
            </div>
        )
    }
}

export default ResultCompetitionsHeadquarter