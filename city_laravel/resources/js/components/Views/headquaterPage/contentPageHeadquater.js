import React from 'react'
import { Switch, Route, useRouteMatch} from 'react-router-dom'

import SelectedView from '../selectedView/selectedView'
import ContentSelectedListHeadquater from './contetSelectedListHeadquater';

const ContentPageHeadquater = ({ messageSelectedView , tabsPage , showAllData , nameItemClicked, limitsForyLabels }) => {
    const { url } = useRouteMatch();


    return (
        <Switch>
            <Route exact path={`${url}`}>
                <SelectedView text={messageSelectedView} />
            </Route>
            <Route path={`${url}/:idForFetch`}>
                <ContentSelectedListHeadquater tabsPage = {tabsPage} showAllData = {showAllData} limitsForyLabels={limitsForyLabels} nameItemClicked={nameItemClicked}/>
            </Route>

        </Switch>
    )
}

export default ContentPageHeadquater;