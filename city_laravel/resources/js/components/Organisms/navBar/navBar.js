import React, { useState, useEffect } from 'react';

import { NavLink, Link } from 'react-router-dom'


const NavBar = ({ user, permissions, isHovering }) => {
    const [isHoveringDeparment, setIsHoveringDeparment] = useState(false)

    function getPermissionToArray(urlNavBar) {
        // Find Permission
        // const found = permissions.find(element => isPermission(element, urlNavBar));
        // if (found != undefined) {
        //     if (found.slug == urlNavBar) {
        //         return true
        //     }
        // } else {
        //     return false
        // }
    }

    function isPermission(element, urlNavBar) {
        return element.slug === urlNavBar;
    }

    function handleMouseHover() {
        setIsHoveringDeparment(!isHoveringDeparment)
    }

    return (
        <nav className="navbar content-Bar">
            <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/si/home">
                <div className='d-flex align-middle'>
                    <i className="fas fa-home"></i>
                    <div className='pl-1'>Introducción</div>
                </div>
            </NavLink>
            {/* <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/si/SubirExcel">
                <div className='d-flex align-middle'>
                    <i className="fas fa-upload"></i>
                    <div className='pl-1'>Subir xlms</div>
                </div>
            </NavLink>

            <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Usuarios">
                <div className='d-flex'>
                    <i className="fas fa-user"></i>
                    <div className='pl-1'>Usuarios</div>
                </div>
            </NavLink>

            <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Roles">
                <div className='d-flex'>
                    <i className="fas fa-user-tag"></i>
                    <div className='pl-1'>Roles</div>
                </div>
            </NavLink> */}

            <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/si/Departamentos">
                <div className='d-flex align-middle'>
                    <i className="fas fa-map"></i>
                    <div className='pl-1'>Departamentos</div>
                </div>
            </NavLink>
            <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/si/Municipios">
                <div className='d-flex align-middle'>
                    <i className="fas fa-mountain"></i>
                    <div className='pl-1'>Municipios</div>
                </div>
            </NavLink>
            <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/si/Instituciones">
                <div className='d-flex align-middle'>
                    <i className="fas fa-school"></i>
                    <div className='pl-1'>Instituciones</div>
                </div>
            </NavLink>
            <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/si/Sedes">
                <div className='d-flex align-middle'>
                    <i className="fas fa-graduation-cap"></i>
                    <div className='pl-1'>Sedes</div>
                </div>
            </NavLink>
            <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/si/Grupos">
                <div className='d-flex align-middle'>
                    <i className="fas fa-users"></i>
                    <div className='pl-1'>Grupos</div>
                </div>
            </NavLink>
            <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/si/Estudiantes">
                <div className='d-flex align-middle'>
                    <i className="fas fa-id-badge"></i>
                    <div className='pl-1'>Estudiantes</div>
                </div>
            </NavLink>
            <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/si/Ayuda">
                <div className='d-flex align-middle'>
                    <i className="fas fa-question-circle"></i>
                    <div className='pl-1'>FAQ</div>
                </div>
            </NavLink>
            <Link className="nav-link align-text-bottom" to="#bannerformmodal" data-toggle="modal" data-target="#exampleModal" >
                <div className='d-flex align-middle'>
                    <i className="fas fa-sign-out-alt"></i>
                    <div className='pl-1'>Cerrar sesión</div>
                </div>
            </Link>
            {/* <a >
                <div className='d-flex align-middle'>
                    <i className="fas fa-question-circle"></i>
                    <div className='pl-1'>Cerrar sesión</div>
                </div>
            </a> */}
        </nav >
    )
}

export default NavBar;


{/* <nav className="nav flex-column"> */ }
{/* {user} */ }
{/* <NavLink className="nav-link content-Bar" activeClassName="activate-navbar" to="/si/home">
        <div className='d-flex'>
            <i className="fas fa-home"></i> {isHovering ? <div className='pl-1'>{" "}Introducción</div> : null}
            {/* <i className="fas fa-home"></i><div className={'pl-1 '+ (isHovering?'sidenav-nothovered':'sidenav-hovered' )}>Introducción</div> */}
// </div>
// </NavLink>

{/* <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Usuarios">
        <div className='d-flex'>
            <i className="fas fa-user"></i> {isHovering ? <div>Usuarios</div> : null}
        </div>
    </NavLink>

    <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Roles">
        <div className='d-flex'>
            <i className="fas fa-user-tag"></i> {isHovering ? <div>Roles</div> : null}
        </div>
    </NavLink>
    <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/SubirExcel">
        <div className='d-flex'>
            <i className="fas fa-upload"></i>  {isHovering ? <div>Subir xlms</div> : null}
        </div>
    </NavLink> */}

{/* <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Departamentos" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}>
        <div className='d-flex'>
            <i className="fas fa-map"></i> {isHovering ? <div className='pl-1'>{" "}Departamentos</div> : null}
        </div>
    </NavLink>

    <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Municipios">
        <div className='d-flex'>
            <i className="fas fa-mountain"></i> {isHovering ? <div className='pl-1'>{" "}Municipios</div> : null}
        </div>
    </NavLink>

    <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Instituciones">
        <div className='d-flex'>
            <i className="fas fa-school"></i> {isHovering ? <div className='pl-1'>{" "}Instituciones</div> : null}
        </div>
    </NavLink>

    <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Sedes">
        <div className='d-flex'>
            <i className="fas fa-graduation-cap"></i> {isHovering ? <div className='pl-1'>{" "}Sedes</div> : null}
        </div>
    </NavLink>

    <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Grupos">
        <div className='d-flex'>
            <i className="fas fa-users"></i> {isHovering ? <div className='pl-1'>{" "}Grupos</div> : null}
        </div>
    </NavLink>

    <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Estudiantes">
        <div className='d-flex'>
            <i className="fas fa-id-badge"></i> {isHovering ? <div className='pl-1'>{" "}Estudiantes</div> : null}
        </div>
    </NavLink> */}

{/* {
    getPermissionToArray("Departamentos") ?
        <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Departamentos">
            <i className="fas fa-map"></i>
        </NavLink>
        : null
}
{
    getPermissionToArray("Municipios") ?
        <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Municipios">
            <i className="fas fa-mountain"></i>
        </NavLink>
        : null
}
{
    getPermissionToArray("Instituciones") ?
        <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Instituciones">
            <i className="fas fa-school"></i>
        </NavLink>
        : null
}
{
    getPermissionToArray("Sedes") ?
        <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Sedes">
            <i className="fas fa-graduation-cap"></i>
        </NavLink>
        : null
}
{
    getPermissionToArray("Grupos") ?
        <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Grupos">
            <i className="fas fa-users"></i>
        </NavLink>
        : null
}
{
    getPermissionToArray("Estudiantes") ?
        <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Estudiantes">
            <i className="fas fa-id-badge"></i>
        </NavLink>
        : null
} */}

{/* <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Estadisticas">
    <i className="fas fa-chart-bar"></i>
</NavLink>
<NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Informes">
    <i className="fas fa-file-alt"></i>
</NavLink> */}
{/* <NavLink className="nav-link" activeClassName="activate-navbar" to="/si/Ayuda">
        <div className='d-flex'>
            <i className="fas fa-question-circle"></i> {isHovering ? <div className='pl-1'>{" "}FAQ</div> : null}
        </div>
    </NavLink>
    <button type="button" className="btn btn-logout" data-toggle="modal" data-target="#exampleModal">
        <div className='d-flex'>
            <i className="fas fa-sign-out-alt"></i> {isHovering ? <div className='pl-1'>{" "}Cerrar sesión</div> : null}
        </div>
    </button> */}
// </nav>