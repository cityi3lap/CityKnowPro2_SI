import React from 'react'
import ReactDOM from 'react-dom'
import ListSearch from '../../Organisms/listSearch/listSearch'
import ContentPageStudent from './contentPageStudent'

import { fetchPost } from '../../../function/GlobalFunctions';

class StudentPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idForSearch: null,
            infoForSelectList: [],

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
            messageSelectedView: 'Selecciona un estudiante',
            placeHolder: 'Ingrese un estudiante',
            tittleListSearch: 'Estudiantes',
            showAllData: 'General',
            routeForFetchListSearch: 'https://raw.githubusercontent.com/DuvanMorenoCardona/json/master/department.json'
        }
        this.getNameItemClicked = this.getNameItemClicked.bind(this);

    }

    getNameItemClicked(name) {
        this.setState({ nameItemClicked: name })
    }

    render() {
        return (
            <div className="contentDepartment d-flex">
                <ListSearch
                    tittle={this.state.tittleListSearch}
                    placeHolder={this.state.placeHolder}
                    routeForFetchListSearch={this.state.routeForFetchListSearch}
                    isInput={true}
                    isData={true}
                    infoForSelectList={this.state.infoForSelectList}
                    isHovering={this.props.isHovering}
                    getNameItemClicked={this.getNameItemClicked} 
                    headquarters={this.props.headquarters}/>
                <ContentPageStudent
                    messageSelectedView={this.state.messageSelectedView}
                    getIdForSearch={this.state.idForSearch}
                    tabsPage={this.state.tabsPage}
                    showAllData={this.state.showAllData}
                    limitsForyLabels={this.props.limitsForyLabels}
                    nameItemClicked={this.state.nameItemClicked}
                />
            </div>
        )
    }
}

export default StudentPage;