import React, { useState, useEffect, useLayoutEffect } from 'react'
import { object } from 'yup'
import InputSearch from '../Atoms/inputSearch'
import ReactPaginate from 'react-paginate'


const GroupCheckedBoxLocation = ({ locationUsers, checkedBox, Action, getIdChecked, isDisabled, isCancel , changeStateCancel }) => {

    const [infoForCheckBox, setinfoForCheckBox] = useState([])
    const [infoChecked, setinfoChecked] = useState([])
    const [textForFilter, setTextForFilter] = useState("")

    const [filter, setFilter] = useState([])

    const [elements, setelements] = useState([])

    const [pageCount, setpageCount] = useState()
    const [offset, setoffset] = useState(null)
    const [perPage, setperPage] = useState(10)
    const [currentPage, setcurrentPage] = useState(0)


    const [hiddenPagination, sethiddenPagination] = useState(false)

    useLayoutEffect(() => {
        if (isCancel) {
            // console.log("TCL: GroupChecked -> isCancel", isCancel)
            addOptionChecked(locationUsers, checkedBox)
            changeStateCancel()
        }
    }, [isCancel])

    useEffect(() => {
        if (locationUsers != undefined && checkedBox != undefined) {
            addOptionChecked(locationUsers, checkedBox)
            setpageCount(Math.ceil(locationUsers.length / perPage))
            changeTextForFilter()
        }
    }, [locationUsers, checkedBox])

    useEffect(() => {
        changeTextForFilter()
    }, [infoForCheckBox, textForFilter])

    useEffect(() => {
        setElementsForCurrentPage()
    }, [offset, perPage])

    useEffect(() => {
        let selectedPage = 0;
        let offset = selectedPage * perPage;
        setcurrentPage(selectedPage)
        setoffset(offset)
        setElementsForCurrentPage();
    }, [filter])

    function changeTextForFilter() {
        if (textForFilter !== "") {
            setFilter(
                infoForCheckBox.filter(function (i) {
                    if (i.name.toLowerCase().match(textForFilter.toLowerCase()) || i.checked == true) {
                        return true;
                    }
                })
            )
        } else {
            setFilter(infoForCheckBox)
        }
    }

    function setElementsForCurrentPage() {

        let prevElements = filter.slice(offset, offset + perPage)
        // // console.log("TCL: setElementsForCurrentPage -> filter", filter)
        // console.log("TCL: setElementsForCurrentPage -> filter", filter)
        // // console.log("TCL: setElementsForCurrentPage -> offset", offset)
        setelements(prevElements)
        if (filter.length < perPage) {
            sethiddenPagination(false)
        } else {
            sethiddenPagination(true)
        }

    }

    function addOptionChecked(allData, dataForCheck) {
        let auxInfoGroupCheckbox = allData
        let auxInfoForCheckBox = []
        let auxInfoChecked = []
        auxInfoGroupCheckbox.map(
            item => {
                let checkBoxExist = dataForCheck.find(itemCheck =>
                    itemCheck === item.id);

                if (checkBoxExist == undefined) {
                    auxInfoForCheckBox.push({
                        id: `${item.id}-${item.name}-${Action}`,
                        name: item.name,
                        checked: false
                    })
                } else {
                    auxInfoForCheckBox.push({
                        id: `${item.id}-${item.name}-${Action}`,
                        name: item.name,
                        checked: true
                    })
                }
                setinfoForCheckBox(auxInfoForCheckBox)
                // setinfoChecked(auxInfoChecked)
            }
        )

    }

    function handleChecked(e) {
        let clicketId = e.target.id.split('-')[0]

        const index = infoForCheckBox.findIndex(dataArray =>
            Number.parseInt(dataArray.id.split('-')[0]) === Number.parseInt(clicketId))

        let arrayData = [...infoForCheckBox]
        if (index >= 0) {
            arrayData[index].checked = e.target.checked
            setinfoForCheckBox(arrayData)
        }
        getIdPermisison(arrayData)

    }

    function getIdPermisison(dataArray) {
        let idPermisisons = []
        dataArray.map(
            item => {
                if (item.checked) {
                    idPermisisons.push(Number.parseInt(item.id.split('-')[0])
                    )
                }
            }
        )
        getIdChecked(idPermisisons)
    }

    function getPropsFromInputSearch(e) {
        console.log("TCL: getPropsFromInputSearch -> e", e)
        setTextForFilter(e)
    }


    function handlePageClick(data) {
        let selectedPage = data.selected;
        // // console.log("TCL: handlePageClick -> selectedPage", selectedPage)
        let offset = selectedPage * perPage;
        // // console.log("TCL: handlePageClick -> offset", offset)
        setcurrentPage(selectedPage)
        setoffset(offset)
        // setElementsForCurrentPage();
    }


    return (
        <div>
            {
                elements.length > 0 &&
                <InputSearch placeHolder={"Ingrese su busqueda"} onChange={getPropsFromInputSearch} />
            }
            {
                elements.map(
                    (item, i) =>
                        <div key={i} className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={item.id}
                                onChange={handleChecked}
                                checked={item.checked}
                                disabled={isDisabled}
                            />
                            <label className="label-group custom-control-label" htmlFor={item.id}>{item.name}</label>
                        </div>
                )
            }
            {
                hiddenPagination &&
                <ReactPaginate
                    previousLabel={" Anterior"}
                    nextLabel={"Siguiente "}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    forcePage={currentPage}
                    containerClassName={"pagination"}
                    previousLinkClassName={"previous_page"}
                    nextLinkClassName={"next_page"}
                    disabledClassName={"disabled"}
                    activeClassName={"active"}
                />
            }
        </div>
    )


}

export default GroupCheckedBoxLocation

