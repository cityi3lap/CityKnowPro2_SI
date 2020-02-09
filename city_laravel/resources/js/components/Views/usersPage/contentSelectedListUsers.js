import React, { useState, useEffect } from 'react'

import { useRouteMatch } from 'react-router-dom';
import TittleTab from '../../Atoms/tittleTab';
import DescUser from '../../Molecules/descUser';
import RadioButton from '../../Atoms/radioButton';
import GroupRadioButtons from '../../Molecules/groupradioButtons';
import GroupChecked from '../../Molecules/groupChecked';
import EditButton from '../../Atoms/EditButton';
import ModalFloatButtons from '../../Organisms/modalFloatButtons/modalFloatButtons';
import LoadingPage from '../loadingPage/loadingPage';

import { fetchApi } from '../../../function/GlobalFunctions';
import ModalDelete from '../../Organisms/modalDelete/modalDelete';

const ContentSelectedListUsers = ({ roles, permissions }) => {
    const { params, url } = useRouteMatch();
    const [isLoaded, setisLoaded] = useState(true);
    const [jsonApi, setJsonApi] = useState();
    const [error, setError] = useState(null);
    const urlFetchUpdate = `http://127.0.0.1:8000/updateUser/${params.idForFetch}`

    async function fetchData() {
        try {
            
            console.log("TCL: fetchData -> params.idForFetch", params.idForFetch)
            const result = await fetchApi(`http://127.0.0.1:8000/getUser/${params.idForFetch}`)
            console.log("TCL: fetchData -> result", result)
            // getIdPermission(result)
            // getIdRole(result)
            setJsonApi(result)
            setisLoaded(false)

        } catch (error) {
            setisLoaded(true)
            console.warn( "Tenemos un error" ,error)
            setError(error)
        }
    }


    useEffect(() => {
        setisLoaded(true)
        fetchData();
    }, [params.idForFetch])

    function getIdPermission(result) {
        permissions.map(
            item => {
                let permission = result.permissions.find(permission => permission.id === item.id);
                if (permission == undefined) {
                    item.checked = false
                } else {
                    item.checked = true
                }
            }
        )
    }
    function getIdRole(result) {
        roles.map(
            item => {
                let role = result.role_id.find(permission => permission.id === item.id);
                if (role == undefined) {
                    item.checked = false
                } else {
                    item.checked = true
                }
            }
        )
    }

    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <div className='col-md-9 '>
                <div className='d-flex justify-content-center mt-1 mb-1'>
                    <TittleTab tittle={'Nombre de usuario'} />
                    {/* idModal need same at ButtonEditUser and ModalFloatButtons */}
                    <EditButton idModal={"ModalEditUser"} iconButton={'user-edit'} />
                    <EditButton idModal={"ModalDelete"} iconButton={'trash'} />
                    <ModalDelete modalId={'ModalDelete'} title={'Eliminar Usuario'} textBody={'Seguro quiere eliminar este usuario'} urlFetch={'http://127.0.0.1:8000/destroyUser'} element={jsonApi} />
                    <ModalFloatButtons idModal={"ModalEditUser"} title={'Editar Usuario'} textButton={'Guardar cambios'} userData={jsonApi} roles={roles} permissions={permissions} urlFetch={urlFetchUpdate} typeFetch={'PUT'} isCreateUser={false} />
                </div>
                <div className='col-md-12 d-flex justify-content-center  mt-5 mb-1'>
                    <div className='col-md-10'>
                        <DescUser titledesc={'Nombre'} desc={jsonApi.name} />
                        <DescUser titledesc={'Nombre de usuario'} desc={jsonApi.username} />
                        <DescUser titledesc={'Correo electronico'} desc={jsonApi.email} />
                    </div>
                </div>
                <div className='d-flex justify-content-center col-md-12  mt-5 mb-5'>
                    <div className='col-md-10' >
                        {/* CheckedButton Null for not get value array */}
                        <GroupRadioButtons title={'Roles'} dataArray={roles} checkedButton={null} Action={'show'} />
                    </div>
                </div>

            </div>
        )
    }
}
export default ContentSelectedListUsers