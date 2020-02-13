import React, { useState, useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom';

import TabsContentSelectedList from '../../Organisms/tabsContentSelectedList/tabsContentSelectedList';

// Import Page Tabs
import { fetchApi } from '../../../function/GlobalFunctions';
import LoadingPage from '../loadingPage/loadingPage';
import GroupListHeadquater from './groupListHeadquater';
import MultipleIntelligencesHeadquater from './multipleIntelligenceHeadquater';
import RecomendationHeadquater from './recommendationHeadquater';
import LearningStylesHeadquater from './learningStylesHeadquater';
import ButtonGenerateInform from '../../Atoms/buttonGenerateInform';
import ResultSubjectHeadquater from './resultSubjectHeadquater';
import ResultSubjectStudent from '../studentPage/resultSubjectStudent';
import ResultCompetitionsHeadquarter from './resultCompetitionHeadquater';
import SelectListMovil from '../../Organisms/tabsContentSelectedList/selectListMovil';

const ContentSelectedListHeadquater = (props) => {
    const infoTabs = props.tabsPage;
    const { params, url } = useRouteMatch();

    const routeFetchCompetitions = 'http://127.0.0.1:8000/headquarter'
    const routeFetchIntelligence = 'http://127.0.0.1:8000/intelligences/headquarter'
    const routeFetchStyles = 'http://127.0.0.1:8000/styles/headquarter'

    const routeFetchIntelligenceCompetitions = 'http://127.0.0.1:8000/competences/intelligences/headquarter'
    const routeFetchStyleCompetitions = 'http://127.0.0.1:8000/competences/styles/headquarter'


    const routeFetchVocational = 'http://127.0.0.1:8000/vocationals/headquarter'
    const routerFetchSubject = 'http://127.0.0.1:8000/recomendations/headquarter'


    return (
        <div className="col-12 m-0">
            <TabsContentSelectedList
                namesTabs={infoTabs}
            />
            <SelectListMovil namesTabs={infoTabs} />
            <Switch>
                <Route path={`${url}/resultadosporasignatura`}>
                    <ResultSubjectHeadquater idForFetch={params.idForFetch} showAllData={props.showAllData} limitsForyLabels={props.limitsForyLabels} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/inteligenciasmultiples`} >
                    <MultipleIntelligencesHeadquater idForFetch={params.idForFetch} showAllData={props.showAllData} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/estilosdeaprendizaje`}>
                    <LearningStylesHeadquater idForFetch={params.idForFetch} showAllData={props.showAllData} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/resultadosporcompetencia`}>
                    <ResultCompetitionsHeadquarter idForFetch={params.idForFetch} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/recomendaciones`}>
                    <RecomendationHeadquater idForFetch={params.idForFetch} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Redirect from={`${url}`} to={`${url}/inteligenciasmultiples`} />
            </Switch>
            <ButtonGenerateInform
                idForFetch={params.idForFetch}
                routeFetchCompetitions={routeFetchCompetitions}
                routeFetchIntelligence={routeFetchIntelligence}
                routeFetchStyles={routeFetchStyles}
                routeFetchIntelligenceCompetitions={routeFetchIntelligenceCompetitions} routeFetchStyleCompetitions={routeFetchStyleCompetitions}
                nameItemClicked={props.nameItemClicked}
                routeFetchVocational={routeFetchVocational}
                routerFetchSubject={routerFetchSubject}

            />

        </div>
    )
}

export default ContentSelectedListHeadquater;