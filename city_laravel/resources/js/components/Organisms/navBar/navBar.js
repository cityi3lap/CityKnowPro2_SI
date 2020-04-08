import React, { useState, useEffect } from 'react';

import { NavLink, Link } from 'react-router-dom'


const NavBar = ({ user, permissions, isHovering }) => {
    const [isHoveringDeparment, setIsHoveringDeparment] = useState(false)

    function getPermissionToPropPermission(namePermission) {
        // Find Permission
        let permissionExist = permissions.find(element => isPermission(element, namePermission));

        if (permissionExist == undefined) {
            return false
        } else {
            return true
        }
    }

    function isPermission(element, namePermission) {
        return element.name === namePermission;
    }

    function handleMouseHover() {
        setIsHoveringDeparment(!isHoveringDeparment)
    }

    return (
        <nav className="navbar content-Bar">


            <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/home">
                <div className='d-flex align-middle'>
                    <i className="fas fa-home"></i>
                    <div className='pl-1'>Introducción</div>
                </div>
            </NavLink>
            {
                getPermissionToPropPermission("Simat") &&
                <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/SubirExcel">
                    <div className='d-flex align-middle'>
                        <i className="fas fa-upload"></i>
                        <div className='pl-1'>Carga de Simat</div>
                    </div>
                </NavLink>
            }

            {
                getPermissionToPropPermission("Creación de usuarios") &&
                <NavLink className="nav-link" activeClassName="activate-navbar" to="/Usuarios">
                    <div className='d-flex'>
                        <i className="fas fa-user"></i>
                        <div className='pl-1'>Usuarios</div>
                    </div>
                </NavLink>
            }

            {
                getPermissionToPropPermission("Creación de roles") &&

                <NavLink className="nav-link" activeClassName="activate-navbar" to="/Roles">
                    <div className='d-flex'>
                        <i className="fas fa-user-tag"></i>
                        <div className='pl-1'>Roles</div>
                    </div>
                </NavLink>
            }




            {
                getPermissionToPropPermission("Departamentos") &&

                <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/Departamentos">
                    <div className='d-flex align-middle'>
                        <i className="fas fa-map"></i>
                        <div className='pl-1'>Departamentos</div>
                    </div>
                </NavLink>
            }

            {
                getPermissionToPropPermission("Municipios") &&
                <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/Municipios">
                    <div className='d-flex align-middle'>
                        <i className="fas fa-mountain"></i>
                        <div className='pl-1'>Municipios</div>
                    </div>
                </NavLink>

            }

            {
                getPermissionToPropPermission("Instituciones") &&
                <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/Instituciones">
                    <div className='d-flex align-middle'>
                        <i className="fas fa-school"></i>
                        <div className='pl-1'>Instituciones</div>
                    </div>
                </NavLink>

            }

            {
                getPermissionToPropPermission("Sedes") &&
                <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/Sedes">
                    <div className='d-flex align-middle'>
                        <i className="fas fa-graduation-cap"></i>
                        <div className='pl-1'>Sedes</div>
                    </div>
                </NavLink>

            }

            {
                getPermissionToPropPermission("Grupos") &&
                <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/Grupos">
                    <div className='d-flex align-middle'>
                        <i className="fas fa-users"></i>
                        <div className='pl-1'>Grupos</div>
                    </div>
                </NavLink>

            }

            {
                getPermissionToPropPermission("Estudiantes") &&
                <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/Estudiantes">
                    <div className='d-flex align-middle'>
                        <i className="fas fa-id-badge"></i>
                        <div className='pl-1'>Estudiantes</div>
                    </div>
                </NavLink>

            }



            <NavLink className="nav-link align-text-bottom" activeClassName="activate-navbar" to="/Ayuda">
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
        </nav>
    )
}

export default NavBar;
