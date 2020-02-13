import React from 'react'
import ReactDOM from 'react-dom'
import ListSearch from '../../Organisms/listSearch/listSearch'
import ContentPageStatistic from '../statisticPage/contentPageStatistics'
import ContentPageInform from './contentPageInform'

class InformPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            infoForSelectList : props.infoForSelectList,
            tabsPage: [{
                'name': 'Informe por competencia',
                'route': 'informeporcompetencia'
            },
            {
                'name': 'Informe por inteligencia multiple',
                'route': 'informeporinteligenciamultiple'
            }
            ],
            messageSelectedView: 'Selecciona una opción',
            routeForFetchListSearch: 'https://raw.githubusercontent.com/DuvanMorenoCardona/json/master/categories.json'
        }
    }

    render() {
        return (
            <div className="d-flex ">
                <ListSearch tittle="Informes" isInput={false} isData={true} routeForFetchListSearch={this.state.routeForFetchListSearch}  infoForSelectList={this.state.infoForSelectList} />
                <ContentPageInform messageSelectedView={this.state.messageSelectedView} tabsPage={this.state.tabsPage} linkFetchForTittle={this.state.routeForFetchListSearch} />
            </div>
        )
    }
}

export default InformPage;