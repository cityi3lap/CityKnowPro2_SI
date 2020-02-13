import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import SelectedView from '../selectedView/selectedView'
import ContentSelectedListGroup from './contentSelectedListGroup';

const ContentPageGroup = ({ messageSelectedView, tabsPage, showAllData, limitsForyLabels, nameItemClicked }) => {
    const { url } = useRouteMatch();


    return (
        <Switch>
            <Route exact path={`${url}`}>
                <SelectedView text={messageSelectedView} />
            </Route>
            <Route path={`${url}/:idForFetch`}>
                <ContentSelectedListGroup
                    tabsPage={tabsPage}
                    showAllData={showAllData}
                    limitsForyLabels={limitsForyLabels}
                    nameItemClicked={nameItemClicked} />
            </Route>
        </Switch>
    )
}

export default ContentPageGroup;