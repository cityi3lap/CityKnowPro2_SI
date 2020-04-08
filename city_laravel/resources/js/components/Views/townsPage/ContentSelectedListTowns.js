import React, { useState, useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom';

import TabsContentSelectedList from '../../Organisms/tabsContentSelectedList/tabsContentSelectedList';

// Import Page Tabs
import InstitutionList from '../deparmentPage/institutionList';
import MultipleIntelligenceTowns from './multipleIntelligenceTowns';
import RecomendationTowns from './recomendationTowns';
import InfoTown from './infoTown';
import InstitutionListTown from './institutionListTown';
import LearningStylesTowns from './LearningStylesTowns';
import ButtonGenerateInform from '../../Atoms/buttonGenerateInform';
import ResultSubjectTowns from './resultSubjectTowns';
import ResultCompetitionsTowns from './resultCompetitionsTowns';
import SelectListMovil from '../../Organisms/tabsContentSelectedList/selectListMovil';

const ContentSelectedListTowns = (props) => {
    const infoTabs = props.tabsPage;
    const { params, url } = useRouteMatch();

    const routeFetchCompetitions = 'http://127.0.0.1:8000/town'
    const routeFetchIntelligence = 'http://127.0.0.1:8000/intelligences/town'
    const routeFetchStyles = 'http://127.0.0.1:8000/styles/town'

    const routeFetchIntelligenceCompetitions = 'http://127.0.0.1:8000/competences/intelligences/town'
    const routeFetchStyleCompetitions = 'http://127.0.0.1:8000/competences/styles/town'


    const routeFetchVocational = 'http://127.0.0.1:8000/vocationals/town'
    const routerFetchSubject = 'http://127.0.0.1:8000/recomendations/town'

    return (
        <div className="col-12 m-0">
            <TabsContentSelectedList
                namesTabs={infoTabs}
            />

            <SelectListMovil namesTabs={infoTabs} />

            <Switch>
                <Route path={`${url}/resultadosporasignatura`}>
                    <ResultSubjectTowns idForFetch={params.idForFetch} showAllData={props.showAllData} limitsForyLabels={props.limitsForyLabels} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/inteligenciasmultiples`}>
                    <MultipleIntelligenceTowns idForFetch={params.idForFetch} showAllData={props.showAllData} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/estilosdeaprendizaje`}>
                    <LearningStylesTowns idForFetch={params.idForFetch} showAllData={props.showAllData} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/resultadosporcompetencia`}>
                    <ResultCompetitionsTowns idForFetch={params.idForFetch} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/recomendaciones`}>
                    <RecomendationTowns idForFetch={params.idForFetch} nameItemClicked={props.nameItemClicked} />
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

export default ContentSelectedListTowns;