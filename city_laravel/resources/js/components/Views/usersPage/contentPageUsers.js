import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import SelectedView from '../selectedView/selectedView'
import ContentSelectedListUsers from './contentSelectedListUsers'


const ContentPageUsers = ({ messageSelectedView , roles , permissions }) => {
    const { url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${url}`}>
                <SelectedView text={messageSelectedView} />
            </Route>
            <Route path={`${url}/:idForFetch`}>
                <ContentSelectedListUsers roles={roles} permissions={permissions} />
            </Route>
        </Switch>
    )
}

export default ContentPageUsers