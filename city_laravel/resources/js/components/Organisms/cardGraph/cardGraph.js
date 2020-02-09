import React, { useEffect, useState } from 'react'
import TabsGraph from '../../Molecules/tabsGraph'
import GraphLine from '../graphline/graphline'

import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'

const CardGraph = ({ tabs, jsonApi, showAllData, typeGraph, limitsForyLabels }) => {
    const [tabsFilter, settabsFilter] = useState([
        { id: "General" }
    ])

    const [isTabsFilter, setisTabsFilter] = useState(false)



    const { url } = useRouteMatch()

    useEffect(() => {
        settabsFilter([{ id: "General" }])
        getTabsFilter()
    }, [jsonApi])


    function getTabsFilter() {
        if (jsonApi.message === undefined) {
            setisTabsFilter(true)
            jsonApi.map(
                (item) => settabsFilter(tabsFilter => (
                    [...tabsFilter, { id: changeCaseFirstLetter(item.name) }]
                ))
            )
        } else {
            setisTabsFilter(false)
        }
    }

    function changeCaseFirstLetter(params) {
        if (typeof params === 'string') {
            return params.charAt(0).toUpperCase() + params.slice(1)
        }
        return null
    }


    return (
        <div className="container">
            <div className="row">
                <div className="card col mb-3">
                    <div className="card-body justify-content-center">
                        {
                            isTabsFilter == true &&
                            <TabsGraph tabs={tabsFilter} />
                        }
                        <Switch>
                            <Route path={`${url}/:filterGraph`} >
                                <GraphLine jsonApi={jsonApi} showAllData={showAllData} typeGraph={typeGraph} limitsForyLabels={limitsForyLabels} />
                            </Route>
                            <Redirect from={`${url}`} to={`${url}/General`} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardGraph;