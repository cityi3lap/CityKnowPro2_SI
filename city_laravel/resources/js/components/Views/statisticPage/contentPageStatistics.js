import React from 'react'

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import SelectedView from '../selectedView/selectedView';
import ContentSelectedListStatistic from '../statisticPage/contentSelectedListStatistic';


const ContentPageStatistic = ({ messageSelectedView , linkFetchForTittle }) => {
    const { url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${url}`}>
                <SelectedView text={messageSelectedView} />
            </Route>
            <Route path={`${url}/:idForFetch`}>
                <ContentSelectedListStatistic linkFetchForTittle = {linkFetchForTittle}/>
            </Route>
        </Switch>
    )
}

export default ContentPageStatistic;