import React, { useState, useEffect } from "react";

import { NavLink, Link } from "react-router-dom";
import "./navBar.css";

const NavBarM = ({ user, permissions, setIsHoveringDeparment }) => {
    const [isHovering, setIsHovering] = useState(false)

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
        setIsHovering(!isHovering)
        setIsHoveringDeparment(!isHovering);
    }

    // useEffect(() => {

    // }, [isHovering])

    return (
        <nav className="nav flex-column">
            <div className="d-lg-none d-xl-block d-xl-none">
                <nav className="navbar navbar-light light-blue lighten-4">
                    <button
                        className="navbar-toggler toggler-example"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent1"
                        aria-controls="navbarSupportedContent1"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="dark-blue-text">
                            <i className="fas fa-bars fa-1x"></i>
                        </span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent1"

                        data-toggle="collapse" data-target="#navbarSupportedContent1"
                    >
                        <ul className="navbar-nav mr-auto">
                            <NavLink
                                className="nav-link"
                                to="/home"
                                activeClassName="activate-navbar"

                            >
                                <div className="d-flex">
                                    <i className="fas icon fa-home"></i>{" "}
                                    <div>Introducción</div>
                                </div>
                            </NavLink>


                            {
                                getPermissionToPropPermission("Simat") &&
                                <NavLink
                                    className="nav-link"
                                    to="/SubirExcel"
                                    activeClassName="activate-navbar"

                                >
                                    <div className="d-flex">
                                        <i className="fas icon fa-upload"></i>{" "}
                                        <div>Carga de Simat</div>
                                    </div>
                                </NavLink>
                            }

                            {
                                getPermissionToPropPermission("Creación de usuarios") &&
                                <NavLink
                                    className="nav-link"
                                    to="/Usuarios"
                                    activeClassName="activate-navbar"

                                >
                                    <div className="d-flex">
                                        <i className="fas icon fa-user"></i>{" "}
                                        <div>Usuarios</div>
                                    </div>
                                </NavLink>
                            }

                            {
                                getPermissionToPropPermission("Creación de roles") &&
                                <NavLink
                                    className="nav-link"
                                    to="/Roles"
                                    activeClassName="activate-navbar"
                                >
                                    <div className="d-flex">
                                        <i className="fas icon fa-user-tag"></i>{" "}
                                        <div>Roles</div>
                                    </div>
                                </NavLink>
                            }

                            {
                                getPermissionToPropPermission("Departamentos") &&
                                <NavLink
                                    className="nav-link"
                                    activeClassName="activate-navbar"
                                    to="/Departamentos"
                                    onClick={handleMouseHover}
                                >
                                    <div className="d-flex">
                                        <i className="fas icon fa-map"></i>{" "}
                                        <div>Departamentos</div>
                                    </div>
                                </NavLink>
                            }

                            {
                                getPermissionToPropPermission("Municipios") &&
                                <NavLink
                                    className="nav-link"
                                    activeClassName="activate-navbar"
                                    to="/Municipios"
                                    onClick={handleMouseHover}
                                >
                                    <div className="d-flex">
                                        <i className="fas icon fa-mountain"></i>{" "}
                                        <div>Municipios</div>
                                    </div>
                                </NavLink>
                            }

                            {
                                getPermissionToPropPermission("Instituciones") &&
                                <NavLink className="nav-link"
                                    activeClassName="activate-navbar"
                                    to="/Instituciones"
                                    onClick={handleMouseHover}
                                >
                                    <div className='d-flex'>
                                        <i className="fas icon fa-school"></i>{" "}<div>Instituciones</div>
                                    </div>
                                </NavLink>
                            }

                            {
                                getPermissionToPropPermission("Sedes") &&
                                <NavLink className="nav-link" activeClassName="activate-navbar" to="/Sedes"
                                    onClick={handleMouseHover}>
                                    <div className='d-flex'>
                                        <i className="fas icon fa-graduation-cap"></i>{" "}<div>Sedes</div>
                                    </div>
                                </NavLink>
                            }

                            {
                                getPermissionToPropPermission("Grupos") &&
                                <NavLink className="nav-link" activeClassName="activate-navbar" to="/Grupos"
                                    onClick={handleMouseHover}>
                                    <div className='d-flex'>
                                        <i className="fas icon fa-users"></i>{" "}<div>Grupos</div>
                                    </div>
                                </NavLink>
                            }

                            {
                                getPermissionToPropPermission("Estudiantes") &&
                                <NavLink className="nav-link" activeClassName="activate-navbar" to="/Estudiantes"
                                    onClick={handleMouseHover}>
                                    <div className='d-flex'>
                                        <i className="fas icon fa-id-badge"></i>{" "}<div>Estudiantes</div>
                                    </div>
                                </NavLink>
                            }

                            <NavLink className="nav-link" activeClassName="activate-navbar" to="/Ayuda">
                                <div className='d-flex'>
                                    <i className="fas icon fa-question-circle"></i>{" "}<div>FAQ</div>
                                </div>
                            </NavLink>

                            <Link className="nav-link align-text-bottom" to="/city#bannerformmodal" data-toggle="modal" data-target="#exampleModal" >
                                <div className='d-flex align-middle'>
                                    <div className='d-flex'>
                                        <i className="fas  icon fa-sign-out-alt"></i>{" "}<div>Cerrar sesión</div>
                                    </div>
                                </div>
                            </Link>



                        </ul>
                    </div>
                </nav>
            </div>
        </nav>
    );
};

export default NavBarM;
