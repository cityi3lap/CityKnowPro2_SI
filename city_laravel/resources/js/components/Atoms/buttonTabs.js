import React from 'react'

import { NavLink, useRouteMatch } from 'react-router-dom';


const ButtonTab = ({ id, numberTab }) => {
    const { url, path } = useRouteMatch()

    return (
        <NavLink id={id} className="tabs-selected hover-2"
            activeClassName="activeTabs"
            to={`${path}/${id}`} exact>
            {id}
        </NavLink>
    )

}

export default ButtonTab;
