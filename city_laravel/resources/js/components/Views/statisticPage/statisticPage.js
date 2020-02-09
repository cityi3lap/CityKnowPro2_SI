import React from 'react'
import ReactDOM from 'react-dom'
import ListSearch from '../../Organisms/listSearch/listSearch'
import ContentPageStatistic from './contentPageStatistics'

class StatisticPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            infoForSelectList : props.infoForSelectList,
            itemsStatistic: [
                {
                    name: "Departamento",
                    id: 1
                },
                {
                    name: "Municipio",
                    id: 2
                },
                {
                    name: "Institución",
                    id: 4
                },
                {
                    name: "Grupos",
                    id: 5
                },
                {
                    name: "Estudiantes",
                    id: 6
                }
            ],
            messageSelectedView: 'Selecciona una opción',
            routeForFetchListSearch: 'https://raw.githubusercontent.com/DuvanMorenoCardona/json/master/categories.json'
        }
    }

    render() {
        return (
            <div className="d-flex">
                <ListSearch tittle="Estadísticas" isInput={false} isData={true} routeForFetchListSearch={this.state.routeForFetchListSearch} infoForSelectList={this.state.infoForSelectList}/>
                <ContentPageStatistic messageSelectedView={this.state.messageSelectedView} linkFetchForTittle={this.state.routeForFetchListSearch} />
            </div>
        )
    }
}

export default StatisticPage;