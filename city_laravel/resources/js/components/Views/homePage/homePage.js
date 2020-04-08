import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    useRouteMatch,
    useLocation,
    useHistory,
} from "react-router-dom";

// Importar Componentes
import NavBar from "../../Organisms/navBar/navBar";
import NavBarM from "../../Organisms/navBar/navBarMovil";
import IntroPage from "../introPage/introPage";
import TownsPage from "../townsPage/townsPage";
import DeparmentPage from "../deparmentPage/deparmentPage";
import InstitutionPage from "../institutionPage/institutionPage";
import HeadquaterPage from "../headquaterPage/headquaterPage";
import GroupPage from "../groupPage/groupPage";
import StudentPage from "../studentPage/studentPage";
import StatisticPage from "../statisticPage/statisticPage";
import InformPage from "../informPage/informPage";
import HelpPage from "../helpPage/helpPage";

import { fetchApi } from "../../../function/GlobalFunctions";
import LoadingPage from "../loadingPage/loadingPage";
import UsersPage from "../usersPage/usersPage";
import RolesPage from "../rolesPage/rolesPage";
import UploadXlsxtoJson from "../uploadXlsxtoJson/uploadXlsxtoJson";

const HomePage = ({ dataUser }) => {
    const [userName, setUserName] = useState(null);
    const [name, setName] = useState("");
    const [idUser, setIdUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [isLoaded, setisLoaded] = useState(true);
    const [isLoadedAllData, setisLoadedAllData] = useState(true);
    const [error, setError] = useState(null);
    const [infoForSelectList, setInfoForSelectList] = useState(null);
    const [result12, setResult2] = useState(null);
    const [isHovering, setIsHovering] = useState(false);

    const [institutionForInfoUser, setInstitutionForInfoUser] = useState([]);
    const [gradeForInfoUser, setGradeForInfoUser] = useState([]);
    const [towns, setTowns] = useState([]);

    // const [url, seturl] = useState()
    const [performances, setperformances] = useState();

    // const url = "/city/si";

    const url = '';

    const limitsForyLabels = {
        yLabels: {
            0: "Bajo",
            20: "Básico",
            40: "Medio",
            60: "Alto",
            80: "Superior",
            100: "Perfecto",
        },
        min: 0,
        max: 110,
    };

    useEffect(() => {
        console.log("HomePage -> dataUser", dataUser);
        setUserName(dataUser.username);
        setName(dataUser.name);
        setIdUser(dataUser.id);
        console.log("HomePage -> url", url);
    }, [dataUser]);


    useEffect(() => {
        setisLoaded(true);
        if (idUser != null) {
            fetchData();
        }
    }, [idUser]);

    async function fetchData() {
        try {
            // let permissions = await fetchApi(`http://127.0.0.1:8000/permissions/${userName}`)
            // setPermissions(permissions)
            let infoUser = await fetchApi(
                `http://127.0.0.1:8000/infoUser/${idUser}`
            );

            let performanceResult = await fetchApi(
                `http://127.0.0.1:8000/performances`
            );
            getPerformaceData(performanceResult);

            setInfoForSelectList(infoUser);
            setisLoaded(false);
        } catch (error) {
            console.warn(error);
            setisLoaded(true);
            setError(error);
        }
    }

    async function logout() {
        let performanceResult = await fetchApi(`http://127.0.0.1:8000/logout`);
        console.log(performanceResult);
    }

    function handleMouseHover() {
        setIsHovering(!isHovering);
    }

    function setIsOpen(e) {
        setIsHovering(!isHovering);
    }

    function getPerformaceData(performanceResult) {
        let auxPerformance = {
            yLabels: {},
            min: 0,
            max: 110,
        };
        performanceResult.map(
            (performan) =>
                (auxPerformance.yLabels[performan.min] = performan.name)
        );
        setperformances(auxPerformance);
    }

    function getPermissionToPropPermission(namePermission) {
        // Find Permission
        let permissionExist = infoForSelectList.user_permissions.find(
            (element) => isPermission(element, namePermission)
        );

        if (permissionExist == undefined) {
            return false;
        } else {
            return true;
        }
    }

    function isPermission(element, namePermission) {
        return element.name === namePermission;
    }

    if (isLoaded) {
        return <LoadingPage />;
    } else {
        let toSendHqs = infoForSelectList.hq_grades[0]
            ? infoForSelectList.hq_grades
            : infoForSelectList.headquarters;
        return (
            <div>
                <div>
                    <div className="content-BarM  d-none d-md-block d-lg-none  	d-block d-sm-none  d-sm-block d-md-none">
                        <NavBarM
                            user={name}
                            permissions={infoForSelectList.user_permissions}
                            setIsHoveringDeparment={setIsOpen}
                        />
                    </div>
                </div>

                <div className="d-flex ">
                    <div className="d-none d-xl-block	d-none d-lg-block d-xl-none">
                        <div
                            onMouseEnter={handleMouseHover}
                            onMouseLeave={handleMouseHover}
                        >
                            <NavBar
                                user={name}
                                permissions={infoForSelectList.user_permissions}
                                isHovering={isHovering}
                            />
                        </div>
                    </div>

                    <div className="content-Page">
                        <Switch>
                            <Route
                                exact
                                path={`${url}/home`}
                                component={IntroPage}
                            />

                            {getPermissionToPropPermission(
                                "Creación de usuarios"
                            ) && (
                                <Route path={`${url}/Usuarios`}>
                                    <UsersPage
                                        infoUsers={infoForSelectList.users}
                                        infoRols={infoForSelectList.roles}
                                        isHovering={isHovering}
                                        infoPermissions={
                                            infoForSelectList.permissions
                                        }
                                        Allinfo={infoForSelectList}
                                    />
                                </Route>
                            )}
                            {getPermissionToPropPermission(
                                "Creación de roles"
                            ) && (
                                <Route path={`${url}/Roles`}>
                                    <RolesPage
                                        infoForSelectList={
                                            infoForSelectList.roles
                                        }
                                        isHovering={isHovering}
                                        infoPermissions={
                                            infoForSelectList.permissions
                                        }
                                    />
                                </Route>
                            )}

                            {getPermissionToPropPermission("Simat") && (
                                <Route path={`${url}/SubirExcel`}>
                                    <UploadXlsxtoJson />
                                </Route>
                            )}

                            {getPermissionToPropPermission("Departamentos") && (
                                <Route path={`${url}/Departamentos`}>
                                    <DeparmentPage
                                        infoForSelectList={
                                            infoForSelectList.departments
                                        }
                                        isHovering={isHovering}
                                        limitsForyLabels={performances}
                                    />
                                </Route>
                            )}
                            {getPermissionToPropPermission("Municipios") && (
                                <Route path={`${url}/Municipios`}>
                                    <TownsPage
                                        infoForSelectList={
                                            infoForSelectList.towns
                                        }
                                        isHovering={isHovering}
                                        limitsForyLabels={performances}
                                    />
                                </Route>
                            )}

                            {getPermissionToPropPermission("Instituciones") && (
                                <Route path={`${url}/Instituciones`}>
                                    <InstitutionPage
                                        infoForSelectList={
                                            infoForSelectList.institutions
                                        }
                                        isHovering={isHovering}
                                        limitsForyLabels={performances}
                                    />
                                </Route>
                            )}

                            {getPermissionToPropPermission("Sedes") && (
                                <Route path={`${url}/Sedes`}>
                                    <HeadquaterPage
                                        infoForSelectList={
                                            infoForSelectList.headquarters
                                        }
                                        isHovering={isHovering}
                                        limitsForyLabels={performances}
                                    />
                                </Route>
                            )}

                            {getPermissionToPropPermission("Grupos") && (
                                <Route path={`${url}/Grupos`}>
                                    <GroupPage
                                        infoGrade={infoForSelectList.hq_grades}
                                        isHovering={isHovering}
                                        limitsForyLabels={performances}
                                        headquarters_hq={toSendHqs}
                                    />
                                </Route>
                            )}

                            {getPermissionToPropPermission("Estudiantes") && (
                                <Route path={`${url}/Estudiantes`}>
                                    <StudentPage
                                        infoForSelectList={
                                            infoForSelectList.game_users
                                        }
                                        isHovering={isHovering}
                                        limitsForyLabels={performances}
                                        headquarters={
                                            infoForSelectList.headquarters
                                        }
                                    />
                                </Route>
                            )}

                            {/* <Route path=${url}"/city/si/Estadisticas">
                                <StatisticPage infoForSelectList={infoForSelectList.Statistics} />
                            </Route>

                            <Route path=${url}"/city/si/Informes">
                                <InformPage infoForSelectList={infoForSelectList.Informs} />
                            </Route> */}

                            <Route path={`${url}/Ayuda`} component={HelpPage} />
                            <Redirect
                                from={`/`}
                                to={`/home`}
                            />
                        </Switch>
                    </div>
                </div>

                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body  ">
                                    <h5
                                        className="modal-title"
                                        id="exampleModalLabel"
                                    >
                                        Cerrar sesión de City Know Pro{" "}
                                    </h5>
                                </div>
                                <div className="modal-footer d-flex justify-content-between ">
                                    <button
                                        type="button"
                                        className="btn btn-modal-close"
                                        data-dismiss="modal"
                                    >
                                        Cancelar
                                    </button>
                                    <a
                                        className="btn-modal-logout"
                                        href="city/si/logout"
                                    >
                                        {" "}
                                        Cerrar sesión{" "}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default HomePage;

// if (document.getElementById("HomePage")) {
//     const el = document.getElementById("HomePage");
//     const props = Object.assign({}, el.dataset);
//     ReactDOM.render(<HomePage {dataUser} />, el);
// }
