import React, { useEffect, useState } from 'react'

import { fetchApi } from '../../../function/GlobalFunctions'
import TittleTab from '../../Atoms/tittleTab';
import CardGraph from '../../Organisms/cardGraph/cardGraph';
import CardConvenciones from '../../Organisms/cardConvenciones/cardConvenciones';
import LoadingPage from '../loadingPage/loadingPage';
import GroupCardsAverage from '../../Organisms/groupCardsAverage/groupCardsAverage';

const MultipleIntelligencesStudent = ({ idForFetch, showAllData, nameItemClicked }) => {
    const [isLoaded, setisLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [jsonApi, setJsonApi] = useState([]);
    const tabs = [
        { id: 'General' },
        { id: 'Visoespacial' },
        { id: 'Musical' },
        { id: 'Kinestésica' },
        { id: 'Interpersonal' },
        { id: 'lingüística' },
        { id: 'Matemática' },
    ];

    const [dataGamesPlayed, setdataGamesPlayed] = useState()


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
            title: 'Visoespacial',
            desc: 'Capacidad de reconocer objetos y hacerse una idea de sus características, sea como cuadros visuales.'
        },
        {
            title: 'Musical',
            desc: 'Al recibir la instrucción, el estudiante desarrolla la actividad propuesta de manera exitosa después de 1, 2 ó 3 intentos, necesitando consultar la instrucción.'
        },
        {
            title: 'Kinestésica',
            desc: 'Capacidad para coordinar movimientos corporales.'
        },
        {
            title: 'Interpersonal',
            desc: 'Es la habilidad para relacionarse y llevarse bien con otras personas.'
        },
        {
            title: 'Lingüístico',
            desc: 'Consiste en la dominación del lenguaje.'
        },
        {
            title: 'Matemática',
            desc: 'Capacidad de conceptualizar las relaciones lógicas entre las acciones o los símbolos.'
        }
    ]


    useEffect(() => {
        fetchData();
    }, [idForFetch])

    async function fetchData() {
        try {
            const result = await fetchApi(`http://127.0.0.1:8000/intelligences/${idForFetch}`)
            setJsonApi(result)

            const gamesPlayedInfo = await fetchApi(`http://127.0.0.1:8000/gamesPlayed/student/${idForFetch}/inteligencias`)
            setdataGamesPlayed(gamesPlayedInfo)

            setisLoaded(false)
        } catch (error) {
            setisLoaded(true)
            setError(error)
        }
    }


    if (isLoaded) {
        return (<LoadingPage />)
    } else {

        return (
            <div className="col-12">
                <TittleTab
                    tittle={'Inteligencias Múltiples'}
                    nameItemClicked={nameItemClicked} />

                <GroupCardsAverage titleCardTotalGames="Total de juegos" averageTotalGames={dataGamesPlayed.total_games} titleAverage="Promedio de juegos jugados" averageGamesPlayed={dataGamesPlayed.games_played} />


                <CardGraph tabs={tabs} jsonApi={jsonApi} showAllData={showAllData} heightGraph={225} widthGraph={768} typeGraph='bar' />
            </div>
        )
    }
}

export default MultipleIntelligencesStudent;