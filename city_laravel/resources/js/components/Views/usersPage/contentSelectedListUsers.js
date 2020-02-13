import React, { useState, useEffect } from 'react'

import { useRouteMatch } from 'react-router-dom';
import TittleTab from '../../Atoms/tittleTab';
import EditButton from '../../Atoms/EditButton';
import LoadingPage from '../loadingPage/loadingPage';

import { fetchApi } from '../../../function/GlobalFunctions';
import ModalDelete from '../../Organisms/modalDelete/modalDelete';


import { fetchPOST } from '../../../function/GlobalFunctions'


import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import GroupRadioButtons from '../../Molecules/groupradioButtons';
import GroupCheckedBoxLocation from '../../Molecules/groupCheckedBoxForLocation';


const ContentSelectedListUsers = ({ roles, permissions, infoLocation }) => {
    const { params, url } = useRouteMatch();
    const [isLoaded, setisLoaded] = useState(true);
    const [jsonApi, setJsonApi] = useState();
    const [error, setError] = useState(null);
    const urlFetchUpdate = `http://127.0.0.1:8000/updateUser/${params.idForFetch}`

    const [slug_Permission, setslug_Permission] = useState(null)

    const [isDisabled, setisDisabled] = useState(true)

    const [roleSelect, setroleSelect] = useState(null)
    const [locationUsers, setlocatinoUsers] = useState()
    const [checkedBox, setcheckedBox] = useState([])

    const [roleUser, setroleUser] = useState(null)

    const [initialRol, setinitialRol] = useState([])
    const [initialLocation, setinitialLocation] = useState([])


    const [isCancel, setisCancel] = useState(false)


    async function fetchData() {
        try {

            console.log("TCL: fetchData -> params.idForFetch", params.idForFetch)
            const result = await fetchApi(`http://127.0.0.1:8000/getUser/${params.idForFetch}`)
            console.log("TCL: fetchData -> result", result)
            // getIdPermission(result)
            // getIdRole(result)
            setJsonApi(result)
            setroleSelect(result.role_id)
            getSlug_role(result.role_id)

            setinitialRol(result.role_id)

            setcheckedBox(result.destiny_ids)
            setisLoaded(false)

        } catch (error) {
            setisLoaded(true)
            console.warn("Tenemos un error", error)
            setError(error)
        }
    }

    useEffect(() => {
        if (slug_Permission != undefined) {
            console.log("TCL: ModalFloatButtons -> infoLocation[slug_Permission]", infoLocation[slug_Permission])
            setlocatinoUsers(infoLocation[slug_Permission])
            // setcheckedBox([])
        }
    }, [slug_Permission])

    function getSlug_role(idRole) {
        let slug_role = roles.find(element => element.id == idRole)
        setslug_Permission(slug_role.slug_permission)
    }

    useEffect(() => {
        setisLoaded(true)
        fetchData();
    }, [params.idForFetch])


    function changeStateCancel() {
        setisCancel(!isCancel)
    }

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

    function handleClickEdit() {
        setisDisabled(!isDisabled)
    }


    function changeStateCancel() {
        setisCancel(!isCancel)
    }


    if (isLoaded) {
        return (<LoadingPage />)
    } else {
        return (
            <div className='col-6 container container-roles-page'>
                <div className='card' >
                    <div className="d-flex justify-content-between mt-1 mb-1">
                        <TittleTab tittle={'Información del Usuario'} />
                        {
                            isDisabled == true &&
                            <div className='d-flex'>
                                <EditButton iconButton={'edit'} EventHandleClick={handleClickEdit} />
                                {/* <EditButton idModal={"ModalDelete"} iconButton={'trash'} /> */}
                                <button type="button" className="btn btn-edit d-flex justify-content-center align-items-center" data-toggle="modal" data-target="#ModalDelete" >
                                    <i className={`fas fa-trash`}></i>
                                </button>
                            </div>
                        }
                        <ModalDelete modalId={'ModalDelete'} title={'Eliminar usuario'} textBody={'Seguro quiere eliminar este usuario'} urlFetch={'http://127.0.0.1:8000/destroyUser'} element={jsonApi} />
                    </div>
                    <Formik
                        initialValues={jsonApi}


                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .required('El nombre es obligatorio'),
                            username: Yup.string()
                                .required('El nombre de usuario es obligatorio'),
                            email: Yup.string()
                                .email('El correo es invalido')
                                .required('El correo es obligatorio')
                        })}

                        onSubmit={fields => {

                            async function fetchPOSTDATA() {
                                console.log("TCL: ModalFloatButtons -> field disabled={isDisabled}s", fields)
                                try {
                                    const data = await fetchPOST(`${urlFetchUpdate}`, fields, "PUT")
                                } catch (error) {
                                    console.warn(error)
                                }
                            }


                            fields.destiny_ids = [...checkedBox]
                            fields.role = roleSelect;
                            fetchPOSTDATA()
                            handleClickEdit()


                        }}

                        onReset={(initialValues, { resetForm }) => {
                            resetForm(initialValues)
                            handleClickEdit()
                            changeStateCancel()

                        }}
                        render={({ errors, status, touched }) => {

                            function getIdandSlug_Permission(slug_perrmissionCheck, idRadioButton) {
                                console.log("TCL: functiongetIdandSlug_Permission -> slug_perrmissionCheck , idRadioButton", slug_perrmissionCheck, idRadioButton)


                                setroleSelect(Number.parseInt(idRadioButton))
                                // setUser({
                                //     ...user,
                                //     role: Number.parseInt(idRadioButton)
                                // })
                                // console.log("TCL: functiongetIdandSlug_Permission -> idRadioButton", idRadioButton)
                                setslug_Permission(slug_perrmissionCheck)
                                // console.log("TCL: functiongetIdandSlug_Permission -> slug_perrmissionCheck", slug_perrmissionCheck)
                            }

                            function getIdChecked(idsCheckedButtons) {
                                console.log("TCL: getIdChecked -> idsCheckedButtons", idsCheckedButtons)
                                setcheckedBox([...idsCheckedButtons])
                            }

                            return (
                                <Form >
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre</label>
                                        <Field disabled={isDisabled} name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} placeholder="Escribir nombre" />
                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Nombre de usuario</label>
                                        <Field disabled={isDisabled} name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} placeholder="Escribir nombre de usuario" />
                                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Correo electronico</label>
                                        <Field disabled={isDisabled} name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} placeholder="Escribir correo electronico" />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>

                                    <GroupRadioButtons
                                        title={'Roles'}
                                        dataArray={roles}
                                        idRadioButtonChecked={roleSelect}
                                        checkedButton={getIdandSlug_Permission}
                                        Action={'edit'}
                                        isDisabled={isDisabled}
                                        initialValues={initialRol}
                                        changeStateCancel={changeStateCancel}
                                        isCancel={isCancel}
                                    />

                                    <GroupCheckedBoxLocation
                                        locationUsers={locationUsers}
                                        checkedBox={checkedBox}
                                        getIdChecked={getIdChecked}
                                        Action={"edit"}
                                        isDisabled={isDisabled}
                                        changeStateCancel={changeStateCancel}
                                        isCancel={isCancel}
                                    />

                                    {
                                        isDisabled == false &&
                                        <div className="modal-footer">

                                            <button type='reset' className="btn btn-cancel" >Cancelar</button>
                                            <button type="submit" className="btn btn-save mr-2" >Guardar Cambios</button>

                                        </div>
                                    }
                                </Form>
                            )

                        }
                        }
                    />
                </div>

            </div>
            // <div className='col-md-9 '>
            //     <div className='d-flex justify-content-center mt-1 mb-1'>
            //         <TittleTab tittle={'Nombre de usuario'} />
            //         {/* idModal need same at ButtonEditUser and ModalFloatButtons */}
            //         <EditButton idModal={"ModalEditUser"} iconButton={'user-edit'} />
            //         <EditButton idModal={"ModalDelete"} iconButton={'trash'} />
            //         <ModalDelete modalId={'ModalDelete'} title={'Eliminar Usuario'} textBody={'Seguro quiere eliminar este usuario'} urlFetch={'http://127.0.0.1:8000/destroyUser'} element={jsonApi} />
            //         <ModalFloatButtons idModal={"ModalEditUser"} title={'Editar Usuario'} textButton={'Guardar cambios'} userData={jsonApi} roles={roles} permissions={permissions} urlFetch={urlFetchUpdate} typeFetch={'PUT'} isCreateUser={false} />
            //     </div>
            //     <div className='col-md-12 d-flex justify-content-center  mt-5 mb-1'>
            //         <div className='col-md-10'>
            //             <DescUser titledesc={'Nombre'} desc={jsonApi.name} />
            //             <DescUser titledesc={'Nombre de usuario'} desc={jsonApi.username} />
            //             <DescUser titledesc={'Correo electronico'} desc={jsonApi.email} />
            //         </div>
            //     </div>
            //     <div className='d-flex justify-content-center col-md-12  mt-5 mb-5'>
            //         <div className='col-md-10' >
            //             {/* CheckedButton Null for not get value array */}
            //             <GroupRadioButtons title={'Roles'} dataArray={roles} checkedButton={null} Action={'show'} />
            //         </div>
            //     </div>

            // </div>
        )
    }
}
export default ContentSelectedListUsers