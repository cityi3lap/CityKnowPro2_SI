import React, { useEffect, useState } from 'react'

import ListSearch from '../../Organisms/listSearch/listSearch';
import ContentPage from './contentPage';
const DeparmentPage = (props) => {
    const [isHovering, setIsHovering] = useState(false)
    const [nameItemClicked, setnameItemClicked] = useState("")

    const state = {
        idForSearch: null,
        infoForSelectList: props.infoForSelectList,
        // Json to defined Name and router tabs
        tabsPage: [
            {
                'name': 'Resultado por asignatura',
                'route': 'resultadosporasignatura',
                'activate': true
            },
            {
                'name': 'Inteligencias múltiples',
                'route': 'inteligenciasmultiples',
                'activate': true
            },
            {
                'name': 'Estilos de aprendizaje',
                'route': 'estilosdeaprendizaje',
                'activate': true
            },
            {
                'name': 'Resultados por competencias',
                'route': 'resultadosporcompetencia',
                'activate': true
            },
            {
                'name': 'Recomendaciones',
                'route': 'recomendaciones',
                'activate': true
            },
        ],
        messageSelectedView: 'Selecciona un Departamento',
        placeHolder: 'Ingrese el departamento',
        tittleListSearch: 'Departamentos',
        showAllData: 'General',
        routeForFetchListSearch: 'https://raw.githubusercontent.com/DuvanMorenoCardona/json/master/department.json'
    }


    useEffect(() => {
        setIsHovering(!props.isHovering)
    }, [props.isHovering])

    function getNameItemClicked(name) {
        setnameItemClicked(name)
    }

    return (
        <div className="d-flex"  >

            <ListSearch
                tittle={state.tittleListSearch}
                placeHolder={state.placeHolder}
                routeForFetchListSearch={state.routeForFetchListSearch}
                isInput={true}
                isData={true}
                infoForSelectList={state.infoForSelectList}
                isHovering={isHovering}
                getNameItemClicked={getNameItemClicked} />

            <ContentPage
                messageSelectedView={state.messageSelectedView}
                getIdForSearch={state.idForSearch}
                tabsPage={state.tabsPage}
                showAllData={state.showAllData}
                limitsForyLabels={props.limitsForyLabels}
                nameItemClicked={nameItemClicked} />
        </div>
    )
}

export default DeparmentPage;