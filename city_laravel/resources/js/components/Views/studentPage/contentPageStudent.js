import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import SelectedView from '../selectedView/selectedView'
import ContentSelectedListStudent from './contentSelectedListStudent';

const ContentPageStudent = ({ messageSelectedView, tabsPage, showAllData, limitsForyLabels, nameItemClicked }) => {
    const { url } = useRouteMatch();


    return (
        <Switch>
            <Route exact path={`${url}`}>
                <SelectedView text={messageSelectedView} />
            </Route>
            <Route path={`${url}/:idForFetch`}>
                <ContentSelectedListStudent
                    tabsPage={tabsPage}
                    showAllData={showAllData}
                    limitsForyLabels={limitsForyLabels}
                    nameItemClicked={nameItemClicked} />
            </Route>

        </Switch>
    )
}

export default ContentPageStudent;