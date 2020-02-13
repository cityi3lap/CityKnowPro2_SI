import React, { useEffect, useState } from 'react'

import { Route, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom';
import TittleTab from '../../Atoms/tittleTab';
import CardsAveranges from '../../Organisms/cardsStatisticResult/cardsAveranges';
import LateralGraphBar from '../../Organisms/lateralGraphBar/lateralGraphBar';
import LoadingPage from '../loadingPage/loadingPage';


import { fetchApi } from '../../../function/GlobalFunctions'


const ContentSelectedListStatistic = ({linkFetchForTittle}) => {
    const { params, url } = useRouteMatch();
    const [titlePage, setTitlePage] = useState('')
    const [isLoaded, setisLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [jsonApi, setJsonApi] = useState([]);

    const averanges = [
        { descript: "Numero de departamentos", averange: 5 },
        { descript: "Promedio de Matematicas", averange: 'Bajo' },
        { descript: "Promedio de Lenguaje", averange: 'Basico' },
        { descript: "Promedio de Competencias", averange: 'Medio' },
        { descript: "Promedio de Inglés", averange: 'Alto' },
        { descript: "Promedio de Sociales", averange: 'Superior' },
        { descript: "Promedio de Naturales", averange: 'Superior' },
    ];

    useEffect(() => {
        fetchData();
        fetchIdOption();
    }, [params.idForFetch])

    async function fetchData() {
        try {
            const result = await fetchApi(`https://raw.githubusercontent.com/DuvanMorenoCardona/json/master/statisticDepartment.json`)
            setJsonApi(result.Institution)
            setisLoaded(false)
        } catch (error) {
            console.warn(error)
            setisLoaded(true)
            setError(error)
        }
    }

    async function fetchIdOption() {
        try {
            const result = await fetchApi(linkFetchForTittle)
            result.Department.map(
                (item) => {
                    if (item.id == params.idForFetch) {
                        setTitlePage(item.name)
                    }
                }
            )
            setisLoaded(false)
        } catch (error) {
            setError(error)
            setisLoaded(true)
        }
    }

    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <div className="col-md-9">
                <TittleTab tittle={`Estadisticas por ${titlePage}`} />
                <div>
                    <CardsAveranges averanges={averanges} />
                </div>
                <div>
                    <LateralGraphBar jsonApi = {jsonApi}/>
                </div>
            </div>
        )
    }
}
export default ContentSelectedListStatistic 