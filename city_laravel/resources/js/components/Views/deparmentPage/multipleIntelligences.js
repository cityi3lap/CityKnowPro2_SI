import React, { useEffect, useState } from 'react'

import { fetchApi } from '../../../function/GlobalFunctions'
import TittleTab from '../../Atoms/tittleTab';
import CardGraph from '../../Organisms/cardGraph/cardGraph';
import CardConvenciones from '../../Organisms/cardConvenciones/cardConvenciones';
import LoadingPage from '../loadingPage/loadingPage';
import GroupCardsAverage from '../../Organisms/groupCardsAverage/groupCardsAverage';



const MultipleIntelligences = ({ idForFetch, showAllData , nameItemClicked }) => {
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


    useEffect(() => {
        fetchData();
    }, [idForFetch])

    async function fetchData() {
        try {
            const result = await fetchApi(`http://127.0.0.1:8000/intelligences/department/${idForFetch}`)
            setJsonApi(result)
            const gamesPlayedInfo = await fetchApi(`http://127.0.0.1:8000/gamesPlayed/department/${idForFetch}/inteligencias`)
            setdataGamesPlayed(gamesPlayedInfo)
            setisLoaded(false)
        } catch (error) {
            setisLoaded(true)
            setError(error)
            console.log("TCL: fetchData -> error", error)
        }
    }


    if (isLoaded) {
        return (<LoadingPage />)
    } else {

        return (
            <div className="col-12">
                <TittleTab tittle={'Inteligencias Múltiples'} nameItemClicked={nameItemClicked} />
                <GroupCardsAverage titleCardTotalGames="Total de juegos" averageTotalGames={dataGamesPlayed.total_games} titleAverage="Promedio de juegos jugados" averageGamesPlayed={dataGamesPlayed.average} />
                <CardGraph tabs={tabs} jsonApi={jsonApi} showAllData={showAllData} heightGraph={225} widthGraph={768} typeGraph='bar' />
            </div>
        )
    }
}

export default MultipleIntelligences;