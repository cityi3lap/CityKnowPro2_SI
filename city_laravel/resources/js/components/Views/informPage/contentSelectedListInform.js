import React, { useState, useEffect } from 'react'
import TabsContentSelectedList from '../../Organisms/tabsContentSelectedList/tabsContentSelectedList'

import { Route, Switch, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom';

import LoadingPage from '../loadingPage/loadingPage';

import { fetchApi } from '../../../function/GlobalFunctions'
import CompetitionInform from './competitionInform';
import MultipleInteligentInform from './multipleInteligentInform';
import ButtonGenerateInform from '../../Atoms/buttonGenerateInform';

const ContentSelectedListInform = ({ tabsPage, linkFetchForTittle }) => {
    const { params, url } = useRouteMatch();
    const [titlePage, setTitlePage] = useState('')
    const [dataForList, setDataForList] = useState([]);
    const [isLoaded, setisLoaded] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchData();
    }, [params.idForFetch])


    async function fetchData() {
        try {
            const result = await fetchApi(linkFetchForTittle)
            result.Department.map(
                (item) => {
                    if (item.id == params.idForFetch) {
                        setTitlePage(item.name)
                    }
                }
            )
            setisLoaded(false)
        } catch (error) {
            console.warn(error)
            setError(error)
            setisLoaded(true)
        }
    }

    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <div className='col-md-9'>
                <TabsContentSelectedList
                    namesTabs={tabsPage}
                />
                <div className='tab-page col-md-12'>
                    <Switch>
                        <Route path={`${url}/informeporcompetencia`}>
                            <CompetitionInform titlePage={titlePage} idForFetch={params.idForFetch} />
                        </Route>
                        <Route path={`${url}/informeporinteligenciamultiple`}>
                            <MultipleInteligentInform titlePage={titlePage} />
                        </Route>
                        <Redirect from={`${url}`} to={`${url}/informeporcompetencia`} />
                    </Switch>
                </div>
                <ButtonGenerateInform idForFetch = {params.idForFetch}  />
            </div>
        )
    }
}

export default ContentSelectedListInform