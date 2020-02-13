import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

// Importar Componentes
import NavBar from '../../Organisms/navBar/navBar';
import NavBarM from '../../Organisms/navBar/navBarMovil'
import IntroPage from '../introPage/introPage'
import TownsPage from '../townsPage/townsPage'
import DeparmentPage from '../deparmentPage/deparmentPage'
import InstitutionPage from '../institutionPage/institutionPage'
import HeadquaterPage from '../headquaterPage/headquaterPage'
import GroupPage from '../groupPage/groupPage'
import StudentPage from '../studentPage/studentPage'
import StatisticPage from '../statisticPage/statisticPage'
import InformPage from '../informPage/informPage'
import HelpPage from '../helpPage/helpPage'

import { fetchApi } from '../../../function/GlobalFunctions';
import LoadingPage from '../loadingPage/loadingPage';
import UsersPage from '../usersPage/usersPage';
import RolesPage from '../rolesPage/rolesPage';
import UploadXlsxtoJson from '../uploadXlsxtoJson/uploadXlsxtoJson';


const HomePage = (props) => {
    const [userName, setUserName] = useState(null)
    const [name, setName] = useState('')
    const [idUser, setIdUser] = useState(null)
    const [permissions, setPermissions] = useState([])
    const [isLoaded, setisLoaded] = useState(true);
    const [isLoadedAllData, setisLoadedAllData] = useState(true);
    const [error, setError] = useState(null);
    const [infoForSelectList, setInfoForSelectList] = useState(null);
    const [result12, setResult2] = useState(null);
    const [isHovering, setIsHovering] = useState(false)

    const [institutionForInfoUser, setInstitutionForInfoUser] = useState([])
    const [gradeForInfoUser, setGradeForInfoUser] = useState([])
    const [towns, setTowns] = useState([])

    const limitsForyLabels = {
        yLabels : {
            0: 'Bajo', 20: 'Básico', 40: 'Medio', 60: 'Alto', 80: 'Superior', 100: 'Perfecto'
          },
        min : 0,
        max : 100
    }

    useEffect(() => {
        setUserName({ ...props }.username)
        setName({ ...props }.name)
        setIdUser({ ...props }.id)
    }, [{ ...props }])

    useEffect(() => {
        setisLoaded(true)
        if (idUser != null) {
            fetchData()
        }
    }, [idUser])

    async function fetchData() {
        try {
            // let permissions = await fetchApi(`http://127.0.0.1:8000/permissions/${userName}`)
            // setPermissions(permissions)
            console.log('Voy por el Fetch')
            let infoUser = await fetchApi(`http://127.0.0.1:8000/infoUser/${idUser}`)
            console.log("TCL: fetchData -> infoUser", infoUser)
            console.log('pase Fetch')
            console.log('Voy por Grados')
            // getInstitutions(infoUser.institutions)
            // getGrade(infoUser.headquarters, infoUser.grades)
            console.log(' Grados')

            setInfoForSelectList(infoUser)
            setisLoaded(false)
        } catch (error) {
            console.warn(error)
            setisLoaded(true)
            setError(error)
        }
    }

    function handleMouseHover() {
        setIsHovering(!isHovering)
    }

    function setIsOpen(e) {
        setIsHovering(!isHovering)
    }


    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <BrowserRouter>
                <div>
                    <div className="content-BarM  d-none d-md-block d-lg-none  	d-block d-sm-none  d-sm-block d-md-none" >
                        <NavBarM user={name} permissions={permissions} setIsHoveringDeparment={setIsOpen} />
                    </div>
                </div>

                <div className="d-flex ">
                    <div className="d-none d-xl-block	d-none d-lg-block d-xl-none">
                        <div onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}>
                            <NavBar user={name} permissions={permissions} isHovering={isHovering} />
                        </div>
                    </div>


                    <div className="content-Page">
                        <Switch>
                            <Route exact path="/si/home" component={IntroPage} />

                            <Route path="/si/Usuarios">
                                <UsersPage infoUsers={infoForSelectList.users} infoRols={infoForSelectList.roles} isHovering={isHovering} infoPermissions={infoForSelectList.permissions}
                                Allinfo={infoForSelectList}
                                />
                            </Route>

                            <Route path="/si/Roles">
                                <RolesPage infoForSelectList={infoForSelectList.roles} isHovering={isHovering} infoPermissions={infoForSelectList.permissions} />
                            </Route>

                            <Route path="/si/SubirExcel">
                                <UploadXlsxtoJson />
                            </Route> 

                            <Route path="/si/Departamentos">
                                <DeparmentPage infoForSelectList={infoForSelectList.departments} isHovering={isHovering} limitsForyLabels={limitsForyLabels} />
                            </Route>

                            <Route path="/si/Municipios">
                                <TownsPage infoForSelectList={infoForSelectList.towns} isHovering={isHovering} limitsForyLabels={limitsForyLabels} />
                            </Route>

                            <Route path="/si/Instituciones">
                                <InstitutionPage infoForSelectList={infoForSelectList.institutions} isHovering={isHovering} limitsForyLabels={limitsForyLabels} />
                            </Route>

                            <Route path="/si/Sedes">
                                <HeadquaterPage infoForSelectList={infoForSelectList.headquarters} isHovering={isHovering} limitsForyLabels={limitsForyLabels} />
                            </Route>

                            <Route path="/si/Grupos">
                                <GroupPage infoGrade={infoForSelectList.hq_grades} isHovering={isHovering} limitsForyLabels={limitsForyLabels} />
                            </Route>

                            <Route path="/si/Estudiantes">
                                <StudentPage infoForSelectList={infoForSelectList.game_users} isHovering={isHovering} limitsForyLabels={limitsForyLabels} />
                            </Route>

                            {/* <Route path="/si/Estadisticas">
                                <StatisticPage infoForSelectList={infoForSelectList.Statistics} />
                            </Route>

                            <Route path="/si/Informes">
                                <InformPage infoForSelectList={infoForSelectList.Informs} />
                            </Route> */}

                            <Route path="/si/Ayuda" component={HelpPage} />
                        </Switch>

                    </div>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-body  ">
                                    <h5 className="modal-title" id="exampleModalLabel">Cerrar sesión de City Know Pro </h5>

                                </div>
                                <div className="modal-footer d-flex justify-content-between ">
                                    <button type="button" className="btn btn-modal-close" data-dismiss="modal">Cancelar</button>
                                    <a className="btn-modal-logout" href="/si/logout"> Cerrar sesión </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }

}

export default HomePage

if (document.getElementById('HomePage')) {
    const el = document.getElementById('HomePage')
    const props = Object.assign({}, el.dataset)
    ReactDOM.render(<HomePage {...props} />, el)
}