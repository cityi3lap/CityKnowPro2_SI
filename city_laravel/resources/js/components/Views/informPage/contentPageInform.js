import React from 'react'

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import SelectedView from '../selectedView/selectedView'
import ContentSelectedListInform from './contentSelectedListInform';
import PdfGenerateInform from '../pdfGenerateInform/pdfGenerateInform';


const ContentPageInform = ({ messageSelectedView, tabsPage, linkFetchForTittle }) => {
    const { url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${url}`}>
                <SelectedView text={messageSelectedView} />
            </Route>
            <Route path={`${url}/:idForFetch`}>
                <ContentSelectedListInform tabsPage={tabsPage} linkFetchForTittle={linkFetchForTittle} />
            </Route>
            
        </Switch>
    )
}

export default ContentPageInform

