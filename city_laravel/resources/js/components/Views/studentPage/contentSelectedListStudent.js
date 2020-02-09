import React, { useState, useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom';

import TabsContentSelectedList from '../../Organisms/tabsContentSelectedList/tabsContentSelectedList';

// Import Page Tabs
import { fetchApi } from '../../../function/GlobalFunctions';
import LoadingPage from '../loadingPage/loadingPage';
import InfoStudent from './infoStudent';
import ListConexionDataStudent from './listConexionDataStudent';
import RecomendationStudent from './recomendationStudent';
import ButtonGenerateInform from '../../Atoms/buttonGenerateInform';
import MultipleIntelligencesStudent from './multipleIntelligenceStudent';
import LearningStylesDept from '../deparmentPage/learningStyles';
import LearningStylesStudent from './learningStylesStudent';
import ResultSubjectStudent from './resultSubjectStudent';
import ResultCompetitionsStudent from './resultCompetitionStudent';
import SelectListMovil from '../../Organisms/tabsContentSelectedList/selectListMovil';

const ContentSelectedListStudent = (props) => {
    const infoTabs = props.tabsPage;
    const { params, url } = useRouteMatch();
    const [isLoaded, setisLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [jsonApi, setJsonApi] = useState([]);
    const tabs = [
        { id: 'General' },
        { id: 'Matematicas' },
        { id: 'Lenguaje' },
        { id: 'Competencias' },
        { id: 'Ingles' },
        { id: 'Sociales' },
        { id: 'Naturales' },
    ];

    const routeFetchCompetitions = 'http://127.0.0.1:8000/student'
    const routeFetchIntelligence = 'http://127.0.0.1:8000/intelligences'
    const routeFetchStyles = 'http://127.0.0.1:8000/styles'

    const routeFetchIntelligenceCompetitions = 'http://127.0.0.1:8000/competences/intelligences'
    const routeFetchStyleCompetitions = 'http://127.0.0.1:8000/competences/styles'


    return (
        <div className="col-12 m-0">
            <TabsContentSelectedList
                namesTabs={infoTabs}
            />
            <SelectListMovil namesTabs={infoTabs} />
            <Switch>
                <Route path={`${url}/resultadosporasignatura`}>
                    <ResultSubjectStudent
                        idForFetch={params.idForFetch}
                        showAllData={props.showAllData}
                        limitsForyLabels={props.limitsForyLabels}
                        nameItemClicked={props.nameItemClicked}
                    />
                </Route>
                <Route path={`${url}/inteligenciasmultiples`} >
                    <MultipleIntelligencesStudent
                        idForFetch={params.idForFetch}
                        showAllData={props.showAllData}
                        nameItemClicked={props.nameItemClicked}
                    />
                </Route>
                <Route path={`${url}/estilosdeaprendizaje`} >
                    <LearningStylesStudent
                        idForFetch={params.idForFetch}
                        showAllData={props.showAllData}
                        nameItemClicked={props.nameItemClicked}
                    />
                </Route>
                <Route path={`${url}/resultadosporcompetencia`}>
                    <ResultCompetitionsStudent
                        idForFetch={params.idForFetch}
                        nameItemClicked={props.nameItemClicked}
                    />
                </Route>
                <Route path={`${url}/recomendaciones`}>
                    <RecomendationStudent
                        idForFetch={params.idForFetch}
                        nameItemClicked={props.nameItemClicked}
                    />
                </Route>
                <Redirect from={`${url}`} to={`${url}/inteligenciasmultiples`} />
            </Switch>
            <ButtonGenerateInform idForFetch={params.idForFetch} routeFetchCompetitions={routeFetchCompetitions} routeFetchIntelligence={routeFetchIntelligence} routeFetchStyles={routeFetchStyles} routeFetchIntelligenceCompetitions={routeFetchIntelligenceCompetitions} routeFetchStyleCompetitions={routeFetchStyleCompetitions} nameItemClicked={props.nameItemClicked}/>

        </div>
    )
}

export default ContentSelectedListStudent;