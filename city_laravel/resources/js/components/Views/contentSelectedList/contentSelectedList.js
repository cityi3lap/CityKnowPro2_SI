import React, { useState, useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom';

import TabsContentSelectedList from '../../Organisms/tabsContentSelectedList/tabsContentSelectedList';

// Import Page Tabs
import InstitutionList from '../deparmentPage/institutionList';
import { fetchApi } from '../../../function/GlobalFunctions';
import LoadingPage from '../loadingPage/loadingPage';
import MultipleIntelligences from '../deparmentPage/multipleIntelligences';
import ButtonGenerateInform from '../../Atoms/buttonGenerateInform';
import LearningStylesDept from '../deparmentPage/learningStyles';
import ResultSubjectDepartment from '../deparmentPage/resultSubjectDepartment';
import ResultCompetitionsDepartment from '../deparmentPage/resultCompetitionsDepartment';
import SelectListMovil from '../../Organisms/tabsContentSelectedList/selectListMovil';
import RecommendationDepartment from '../deparmentPage/recomendationDepartment';

const ContentSelectedList = (props) => {
    const infoTabs = props.tabsPage;
    const { params, url } = useRouteMatch();


    const routeFetchCompetitions = 'http://127.0.0.1:8000/department'
    const routeFetchIntelligence = 'http://127.0.0.1:8000/intelligences/department'
    const routeFetchStyles = 'http://127.0.0.1:8000/styles/department'
    const routeFetchVocational = 'http://127.0.0.1:8000/vocationals/department'
    const routerFetchSubject = 'http://127.0.0.1:8000/recomendations/department'

    const routeFetchIntelligenceCompetitions = 'http://127.0.0.1:8000/competences/intelligences/department'
    const routeFetchStyleCompetitions = 'http://127.0.0.1:8000/competences/styles/department'

    return (
        <div className="col m-0" >
            <TabsContentSelectedList
                namesTabs={infoTabs}
            />
            <SelectListMovil namesTabs={infoTabs} />

            <Switch>
                <Route path={`${url}/resultadosporasignatura`}>
                    <ResultSubjectDepartment
                        idForFetch={params.idForFetch}
                        showAllData={props.showAllData}
                        limitsForyLabels={props.limitsForyLabels}
                        nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/inteligenciasmultiples`}>
                    <MultipleIntelligences
                        idForFetch={params.idForFetch}
                        showAllData={props.showAllData}
                        nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/estilosdeaprendizaje`} >
                    <LearningStylesDept
                        idForFetch={params.idForFetch}
                        showAllData={props.showAllData}
                        nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/resultadosporcompetencia`}>
                    <ResultCompetitionsDepartment
                        idForFetch={params.idForFetch}
                        nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/recomendaciones`}>
                    <RecommendationDepartment
                        idForFetch={params.idForFetch}
                        nameItemClicked={props.nameItemClicked} />
                </Route>
                <Redirect from={`${url}`} to={`${url}/resultadosporasignatura`} />
            </Switch>
            <ButtonGenerateInform
                idForFetch={params.idForFetch}
                routeFetchCompetitions={routeFetchCompetitions}
                routeFetchIntelligence={routeFetchIntelligence}
                routeFetchStyles={routeFetchStyles}
                routeFetchIntelligenceCompetitions={routeFetchIntelligenceCompetitions}
                routeFetchStyleCompetitions={routeFetchStyleCompetitions}
                routeFetchVocational={routeFetchVocational}
                routerFetchSubject={routerFetchSubject}
                limitsForyLabels={props.limitsForyLabels}
                nameItemClicked={props.nameItemClicked} />
        </div>
    )
}

export default ContentSelectedList;