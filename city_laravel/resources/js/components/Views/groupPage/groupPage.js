import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ListSearch from '../../Organisms/listSearch/listSearch'
import ContentPageGroup from './contentPageGroup'

const GroupPage = (props) => {
    const [gradeForInfoUser, setGradeForInfoUser] = useState([])
    const [nameItemClicked, setnameItemClicked] = useState("")

    const state = {
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
        messageSelectedView: 'Selecciona un grupo',
        placeHolder: 'Ingrese el grupo',
        tittleListSearch: 'Grupos',
        showAllData: 'General',
        routeForFetchListSearch: 'https://raw.githubusercontent.com/DuvanMorenoCardona/json/master/department.json'
    }



    useEffect(() => {
        setGradeForInfoUser(props.infoGrade)
    }, [props.infoGrade])

    function getNameItemClicked(name) {
        setnameItemClicked(name)
    }

    return (
        <div className="contentDepartment d-flex">
            <ListSearch
                tittle={state.tittleListSearch}
                placeHolder={state.placeHolder}
                routeForFetchListSearch={state.routeForFetchListSearch}
                isInput={true}
                isData={true}
                infoForSelectList={gradeForInfoUser}
                isHovering={props.isHovering}
                getNameItemClicked={getNameItemClicked} />
            <ContentPageGroup
                messageSelectedView={state.messageSelectedView}
                tabsPage={state.tabsPage}
                showAllData={state.showAllData}
                limitsForyLabels={props.limitsForyLabels}
                nameItemClicked={nameItemClicked} />
        </div>
    )

}

export default GroupPage;