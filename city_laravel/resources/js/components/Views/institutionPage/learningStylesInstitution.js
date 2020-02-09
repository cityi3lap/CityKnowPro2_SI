import React, { useEffect, useState } from 'react'

import { fetchApi } from '../../../function/GlobalFunctions'
import TittleTab from '../../Atoms/tittleTab';
import CardGraph from '../../Organisms/cardGraph/cardGraph';
import CardConvenciones from '../../Organisms/cardConvenciones/cardConvenciones';
import LoadingPage from '../loadingPage/loadingPage';



const LearningStylesInstitution = ({ idForFetch, showAllData , nameItemClicked }) => {
    const [isLoaded, setisLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [jsonApi, setJsonApi] = useState([]);
    const tabs = [
        { id: 'General' },
        { id: 'Acomodadores' },
        { id: 'Asimiladores' },
        { id: 'Divergentes' },
        { id: 'Convergentes' },
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
            title: 'Convergente',
            desc: 'Combina la conceptualización abstracta y la experimentación activa.'
        },
        {
            title: 'Divergente',
            desc: 'Combina la experiencia concreta y la observación reflexiva.'
        },
        {
            title: 'Asimilador',
            desc: 'Combina la conceptualización abstracta y la observación reflexiva.'
        },
        {
            title: 'Acomodador',
            desc: 'Combina la experiencia concreta y la experimentación activa.'
        }
    ]

    useEffect(() => {
        fetchData();
    }, [idForFetch])

    async function fetchData() {
        try {
            const result = await fetchApi(`http://127.0.0.1:8000/styles/institution/${idForFetch}`)
            setJsonApi(result)
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
                <TittleTab tittle={'Estilos de aprendizaje'} nameItemClicked={nameItemClicked} />
                <CardGraph tabs={tabs} jsonApi={jsonApi} showAllData={showAllData} heightGraph={225} widthGraph={768} typeGraph='bar' />
            </div>
        )
    }
}

export default LearningStylesInstitution;