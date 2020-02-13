import React from 'react'

import ButtonTab from '../Atoms/buttonTabs'

const TabsGraph = ({ tabs }) => {
    const numberTab = 0;

    return (
        <div className="row justify-content-around d-none d-xl-flex m-auto p-3">
            {
                tabs.map(
                    (tab, i) =>
                        <ButtonTab key={i} id={tab.id} numberTab={numberTab + i} />
                )
            }
        </div>
    )
}

export default TabsGraph;