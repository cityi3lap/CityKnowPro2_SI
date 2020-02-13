import React, { useState, useEffect } from 'react'
import LoadingPage from '../loadingPage/loadingPage'
import TittleTab from '../../Atoms/tittleTab'
import InformationCard from '../../Organisms/informationCard/informationCard'

import {fetchApi} from '../../../function/GlobalFunctions'

const InfoTown = ({ idForFetch }) => {
    const [infoDept, setInfoDept] = useState()
    const [isLoaded, setisLoaded] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            const result = await fetchApi(`https://raw.githubusercontent.com/DuvanMorenoCardona/json/master/infoDept.json`)
            setInfoDept(result.InfoData[0]);
            setisLoaded(false)
        } catch (error) {
            setisLoaded(true)
            setError(error)
            console.warn(error)
        }
    }

    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <div>
                <TittleTab tittle='Información de Municipio' />
                <div className="d-flex justify-content-center">
                    <InformationCard informationData={infoDept} />
                </div>
            </div>
        )
    }

}
export default InfoTown;