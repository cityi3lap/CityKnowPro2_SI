import React, { useState, useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom';

import TabsContentSelectedList from '../../Organisms/tabsContentSelectedList/tabsContentSelectedList';

// Import Page Tabs
import ButtonGenerateInform from '../../Atoms/buttonGenerateInform';
import MultipleIntelligencesInstitution from './multipleIntelligencesInstitution';
import LearningStylesInstitution from './learningStylesInstitution';
import HeadquaterListInstitution from './headquaterListInstitution';
import ResultSubjectInstitution from './resultSubjectInstitution';
import ResultCompetitionsInstitution from './resultCompetitionInstitutions';
import SelectListMovil from '../../Organisms/tabsContentSelectedList/selectListMovil';
import RecomendationInstitution from './recomendationInstitution';


const ContentSelectedListInstitution = (props) => {
    const infoTabs = props.tabsPage;
    const { params, url } = useRouteMatch();

    const routeFetchCompetitions = 'http://127.0.0.1:8000/institution'
    const routeFetchIntelligence = 'http://127.0.0.1:8000/intelligences/institution'
    const routeFetchStyles = 'http://127.0.0.1:8000/styles/institution'

    const routeFetchVocational = 'http://127.0.0.1:8000/vocationals/institution'
    const routerFetchSubject = 'http://127.0.0.1:8000/recomendations/institution'


    const routeFetchIntelligenceCompetitions = 'http://127.0.0.1:8000/competences/intelligences/institution'
    const routeFetchStyleCompetitions = 'http://127.0.0.1:8000/competences/styles/institution'

    return (
        <div className="col-12 m-0">
            <TabsContentSelectedList
                namesTabs={infoTabs}
            />
            <SelectListMovil namesTabs={infoTabs} />
            <Switch>
                <Route path={`${url}/resultadosporasignatura`}>
                    <ResultSubjectInstitution idForFetch={params.idForFetch} showAllData={props.showAllData} limitsForyLabels={props.limitsForyLabels} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/inteligenciasmultiples`}>
                    <MultipleIntelligencesInstitution idForFetch={params.idForFetch} showAllData={props.showAllData} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/estilosdeaprendizaje`}>
                    <LearningStylesInstitution idForFetch={params.idForFetch} showAllData={props.showAllData} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/resultadosporcompetencia`}>
                    <ResultCompetitionsInstitution idForFetch={params.idForFetch} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/recomendaciones`}>
                    <RecomendationInstitution idForFetch={params.idForFetch} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Redirect from={`${url}`} to={`${url}/resultadosporasignatura`} />
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

export default ContentSelectedListInstitution;