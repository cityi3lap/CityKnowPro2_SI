import React, { useState, useEffect } from 'react'
import ListSearch from '../../Organisms/listSearch/listSearch'
import ContentPageRoles from './contentPageRoles'
import ButtonFloatOpenModals from '../../Atoms/buttonFloatOpenModals'
import ModalRoleCreateandEdit from '../../Organisms/modalRoleCreateandEdit/modalRoleCreateandEdit'

import { fetchApi } from '../../../function/GlobalFunctions';
import LoadingPage from '../loadingPage/loadingPage'


const RolesPage = ({ infoForSelectList, isHovering, infoPermissions }) => {

    const titleListSearch = 'Roles'
    const messageSelectedView = 'Selecciona un Rol '
    const placeHolder = 'Ingrese el Rol'
    const routeForFetchListSearch = 'http://127.0.0.1:8000/roles/all'
    const roleData = {
        'name': '',
        'desc': '',
        'permissions': []
    }
    const [isLoadedPermission, setisLoadedPermission] = useState(true);
    const [error, setError] = useState(null);
    const [jsonPermissions, setJsonPermissions] = useState([]);
    const [jsonRoles, setjsonRoles] = useState([])

    const [objectPermissions, setobjectPermissions] = useState()

    async function getAllPermissions() {
        try {
            let result = await fetchApi(`http://127.0.0.1:8000/permissions/all`)
            setJsonPermissions(result)
            setisLoadedPermission(false)
        } catch (error) {
            setisLoadedPermission(true)
            setError(error)
        }
    }

    useEffect(() => {
        setjsonRoles(infoForSelectList)
    }, [infoForSelectList])


    useEffect(() => {
        setobjectPermissions(infoPermissions)
    }, [infoPermissions])

    return (
        <div className='contentDepartment d-flex'>
            <ListSearch tittle={titleListSearch} placeHolder={placeHolder} routeForFetchListSearch={routeForFetchListSearch} isInput={true} isData={true} infoForSelectList={jsonRoles} isHovering={isHovering} />
            <ContentPageRoles messageSelectedView={messageSelectedView} infoPermissions={infoPermissions} />
            <ButtonFloatOpenModals idModal={"ModalCreateRole"} />
            <ModalRoleCreateandEdit idModal={"ModalCreateRole"} title={'Crear Rol'} textButton={'Crear Rol'} urlFetch={'http://127.0.0.1:8000/createRole'} typeFetch={'POST'} roleData={roleData} groupPermissions={objectPermissions} addExtentionIdChecked={'create'} />
        </div>
    )
}


export default RolesPage