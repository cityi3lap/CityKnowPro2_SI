import React, { useState, useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom';

import TabsContentSelectedList from '../../Organisms/tabsContentSelectedList/tabsContentSelectedList';

// Import Page Tabs
import { fetchApi } from '../../../function/GlobalFunctions';
import LoadingPage from '../loadingPage/loadingPage';
import InfoGroup from './infoGroup';
import ListStudentGroup from './listStudentGroup';
import MultipleIntelligencesGroup from './multipleIntelligenceGroup';
import RecomendationGroup from './RecomendationGroup';
import LearningStylesGroup from './learningStyleGroup';
import ButtonGenerateInform from '../../Atoms/buttonGenerateInform';
import ResultSubjectGroup from './resultSubjectGroup';
import ResultCompetitionsGroup from './resultCompetitionGroup';
import SelectListMovil from '../../Organisms/tabsContentSelectedList/selectListMovil';
import RecomendationInstitution from '../institutionPage/recomendationInstitution';

const ContentSelectedListGroup = (props) => {
    const infoTabs = props.tabsPage;
    const { params, url } = useRouteMatch();
    const [idFetch, setIdFetch] = useState([])

    useEffect(() => {
        setIdFetch(params.idForFetch.split('-', [2]))
    }, [params.idForFetch])

    const routeFetchCompetitions = 'http://127.0.0.1:8000/grade'
    const routeFetchIntelligence = 'http://127.0.0.1:8000/intelligences/grade'
    const routeFetchStyles = 'http://127.0.0.1:8000//styles/grade'

    const routeFetchIntelligenceCompetitions = 'http://127.0.0.1:8000/competences/intelligences/grade'
    const routeFetchStyleCompetitions = 'http://127.0.0.1:8000/competences/styles/grade'

    const routeFetchVocational = 'http://127.0.0.1:8000/vocationals/grade'
    const routerFetchSubject = 'http://127.0.0.1:8000/recomendations/grade'


    return (
        <div className="col-12 m-0">
            <TabsContentSelectedList
                namesTabs={infoTabs}
            />
            <SelectListMovil namesTabs={infoTabs} />
            <Switch>
                <Route path={`${url}/resultadosporasignatura`}>
                    <ResultSubjectGroup idForFetch={`${idFetch[0]}/${idFetch[1]}`} showAllData={props.showAllData} limitsForyLabels={props.limitsForyLabels} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/inteligenciasmultiples`}  >
                    <MultipleIntelligencesGroup idForFetch={`${idFetch[0]}/${idFetch[1]}`} showAllData={props.showAllData} nameItemClicked={props.nameItemClicked} />

                </Route>
                <Route path={`${url}/estilosdeaprendizaje`}  >
                    <LearningStylesGroup idForFetch={`${idFetch[0]}/${idFetch[1]}`} showAllData={props.showAllData} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/resultadosporcompetencia`}>
                    <ResultCompetitionsGroup idForFetch={`${idFetch[0]}/${idFetch[1]}`}
                        nameItemClicked={props.nameItemClicked} />
                </Route>
                <Route path={`${url}/recomendaciones`}>
                    <RecomendationGroup idForFetch={`${idFetch[0]}/${idFetch[1]}`} nameItemClicked={props.nameItemClicked} />
                </Route>
                <Redirect from={`${url}`} to={`${url}/resultadosporasignatura`} />
            </Switch>
            <ButtonGenerateInform
                idForFetch={`${idFetch[0]}/${idFetch[1]}`}
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

export default ContentSelectedListGroup;