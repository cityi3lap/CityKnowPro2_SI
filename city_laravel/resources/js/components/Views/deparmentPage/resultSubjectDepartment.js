import React, { useState, useEffect } from 'react'

// Import components
import TittleTab from '../../Atoms/tittleTab.js'
import CardConvenciones from '../../Organisms/cardConvenciones/cardConvenciones';
import CardGraph from '../../Organisms/cardGraph/cardGraph.js';

import { fetchApi } from '../../../function/GlobalFunctions';
import LoadingPage from '../loadingPage/loadingPage.js';
import GroupCardsAverage from '../../Organisms/groupCardsAverage/groupCardsAverage.js';


const ResultSubjectDepartment = (props) => {
    const [isLoaded, setisLoaded] = useState(true);
    const [error, setError] = useState(null);

    const [dataGamesPlayed, setdataGamesPlayed] = useState()

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

    async function fetchData() {
        setisLoaded(true)
        try {
            const result = await fetchApi(`http://127.0.0.1:8000/department/${props.idForFetch}`)
            setJsonApi(result)
            const gamesPlayedInfo = await fetchApi(`http://127.0.0.1:8000/gamesPlayed/department/${props.idForFetch}`)
            
            setdataGamesPlayed(gamesPlayedInfo)
            setisLoaded(false)
        } catch (error) {
            setisLoaded(true)
            setError(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [props.idForFetch])

    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <div className="col-12">
                <TittleTab tittle={'Resultados por asignatura'} nameItemClicked={props.nameItemClicked} />
                <GroupCardsAverage titleCardTotalGames="Total de juegos" averageTotalGames={dataGamesPlayed.total_games} titleAverage="Promedio de juegos jugados" averageGamesPlayed={dataGamesPlayed.average} />
                <CardGraph tabs={tabs} jsonApi={jsonApi} showAllData={props.showAllData} typeGraph='line' limitsForyLabels={props.limitsForyLabels} />
                <CardConvenciones desc={desc} conventions={conventions} showDesc={false} />
            </div>
        )
    }
}

export default ResultSubjectDepartment;