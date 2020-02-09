import React, { useState, useEffect } from 'react'

import { fetchApi } from '../../../function/GlobalFunctions'
import { useRouteMatch } from 'react-router-dom';

import LoadingPage from '../loadingPage/loadingPage';
import CardsAveranges from '../../Organisms/cardsStatisticResult/cardsAveranges';
import TittleTab from '../../Atoms/tittleTab';
import TabsContentSelectedList from '../../Organisms/tabsContentSelectedList/tabsContentSelectedList';

import { Route, Switch, Redirect } from 'react-router-dom'
import Graphline from '../../Organisms/graphline/graphline';
import ListInfo from '../../Organisms/listInfo/listInfo';




const CompetitionInform = ({ titlePage, idForFetch }) => {
    const { url } = useRouteMatch();

    const [isLoadedGraph, setisLoadedGraph] = useState(true);
    const [isLoadedList, setisLoadedList] = useState(true);
    const [error, setError] = useState(null);
    const [jsonApi, setJsonApi] = useState([]);
    const [dataForList, setDataForList] = useState([]);


    const averanges = [
        { descript: "Numero de departamentos", averange: 5 },
        { descript: "Promedio de Matematicas", averange: 'Bajo' },
        { descript: "Promedio de Lenguaje", averange: 'Basico' },
        { descript: "Promedio de Competencias", averange: 'Medio' },
        { descript: "Promedio de Inglés", averange: 'Alto' },
        { descript: "Promedio de Sociales", averange: 'Superior' },
        { descript: "Promedio de Naturales", averange: 'Superior' },
    ];

    const tabscompetitionInform = [{
        'name': 'Resultados por competencias',
        'route': 'resultadosporcompetencias'
    },
    {
        'name': 'Información de instituciones',
        'route': 'informaciondeinstituciones'
    }
    ]

    const tittlesList = [
        "Nombre de institución",
        "Municipio",
        "Matematicas",
        "Lenguaje",
        "Competencias ciudadanas",
        "Inglés",
        "Sociales",
        "Naturales"
    ]


    useEffect(() => {
        fetchData();
    }, [idForFetch])

    async function fetchData() {
        setisLoadedGraph(true)
        setisLoadedList(true)
        try {
            let result = await fetchApi(`https://my-json-server.typicode.com/DuvanMorenoCardona/json/db`)
            setJsonApi(result.Departamentos)
            setisLoadedGraph(false)
        } catch (error) {
            setisLoadedGraph(true)
            setError(error)
        }

        try {
            let result = await fetchApi(`https://raw.githubusercontent.com/DuvanMorenoCardona/json/master/tableList1.json`)
            result.List.map(
                (item) => {
                    let dataInstitution = []
                    // add info institution into array dataInstitution for concat at dataForList
                    dataInstitution.push(item.name, item.town, item.Matematicas, item.Lenguaje, item.Competencias, item.Ingles, item.Sociales, item.Naturales)
                    setDataForList(dataForList => [...dataForList, dataInstitution])
                }
            )
            setisLoadedList(false)
        } catch (error) {
            setError(error)
            setisLoadedList(true)
        }
    }

    if (isLoadedGraph && isLoadedList) {
        return (<LoadingPage />)
    } else {
        return (
            <div className="col-md-12">
                <div className='d-flex mb-2'>
                    <TittleTab tittle={`Informe cualitativo - ${titlePage}`} />
                </div>
                <div>
                    <CardsAveranges averanges={averanges} />
                </div>
                <div>
                    <TabsContentSelectedList
                        namesTabs={tabscompetitionInform}
                    />
                </div>
                <div>
                    <Switch>
                        <Route path={`${url}/resultadosporcompetencias`}>
                            <Graphline jsonApi={jsonApi}  heightGraph={225} widthGraph={768} />
                        </Route>
                        <Route path={`${url}/informaciondeinstituciones`}>
                            <ListInfo tittleList={tittlesList} contentList={dataForList} />
                        </Route>
                        <Redirect from={`${url}`} to={`${url}/resultadosporcompetencias`} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default CompetitionInform