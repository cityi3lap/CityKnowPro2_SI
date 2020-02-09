import React, { useState, useEffect } from 'react'
import LoadingPage from '../loadingPage/loadingPage';
import TittleTab from '../../Atoms/tittleTab';
import ListInfo from '../../Organisms/listInfo/listInfo';
import { fetchApi } from '../../../function/GlobalFunctions'



const HeadquaterListInstitution = ({ idForFetch }) => {

    const [dataForList, setDataForList] = useState([]);
    const [isLoaded, setisLoaded] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchData();
    }, [idForFetch])

    async function fetchData() {
        try {
            const result = await fetchApi(`https://raw.githubusercontent.com/DuvanMorenoCardona/json/master/tableList1.json`)
            result.List.map(
                (item) => {
                    let dataInstitution = []
                    // add info institution into array dataInstitution for concat at dataForList
                    dataInstitution.push(item.name, item.town, item.Matematicas, item.Lenguaje, item.Competencias, item.Ingles, item.Sociales, item.Naturales)
                    setDataForList(dataForList => [...dataForList, dataInstitution])
                }
            )
            setisLoaded(false)
        } catch (error) {
            setError(error)
            setisLoaded(true)
        }
    }

    const tittlesList = [
        "Nombre de Sede",
        "Municipio",
        "Matematicas",
        "Lenguaje",
        "Competencias ciudadanas",
        "Inglés",
        "Sociales",
        "Naturales"
    ]

    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <div>
                <TittleTab tittle={'Listado de Instituciones'} />
                <ListInfo tittleList={tittlesList} contentList={dataForList} />
            </div>
        )
    }

}

export default HeadquaterListInstitution