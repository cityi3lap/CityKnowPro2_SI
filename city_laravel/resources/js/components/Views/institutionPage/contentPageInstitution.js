import React from 'react'
import { Switch, Route, useRouteMatch} from 'react-router-dom'

import SelectedView from '../selectedView/selectedView'
import ContentSelectedListInstitution from './contentSelectedListInstitution';

const ContentPageInstitution = ({ messageSelectedView , tabsPage , showAllData ,  limitsForyLabels , nameItemClicked}) => {
    const { url } = useRouteMatch();


    return (
        <Switch>
            <Route exact path={`${url}`}>
                <SelectedView text={messageSelectedView} />
            </Route>
            <Route path={`${url}/:idForFetch`}>
                <ContentSelectedListInstitution tabsPage = {tabsPage} showAllData = {showAllData} limitsForyLabels={limitsForyLabels} nameItemClicked={nameItemClicked}/>
            </Route>

        </Switch>
    )
}

export default ContentPageInstitution;