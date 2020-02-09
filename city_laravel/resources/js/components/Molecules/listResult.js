import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'

import ReactDOM from 'react-dom'

import ItemResult from '../Atoms/itemResult'

import ReactPaginate from 'react-paginate'


const ListResult = (props) => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState([])
    const [textForFilter, setTextForFilter] = useState('')

    const [pageCount, setpageCount] = useState()

    //  Paginate vars, perPage is the number of data items you want on a single page. 
    //  data array holds all the items. currentPage is the current page selected, 
    //  initially you may want to set it to 0 i.e. 
    //  the first page.elements stores the items to be displayed on the current page and offset helps us select those items.
    const [offset, setoffset] = useState(null)
    const [perPage, setperPage] = useState(null)
    const [currentPage, setcurrentPage] = useState(0)
    const [elements, setelements] = useState([])

    const [hiddenPagination, sethiddenPagination] = useState(false)

    useEffect(() => {
        setData(props.items)
        setFilter(props.items)
        setpageCount(Math.ceil(props.items.length / perPage))
    }, [props.items])


    useEffect(() => {
        let selectedPage = 0;
        let offset = selectedPage * perPage;
        setcurrentPage(selectedPage)
        setoffset(offset)
        setElementsForCurrentPage();
    }, [filter])


    useEffect(() => {
        setTextForFilter(props.textForFilter)
        if (props.textForFilter !== "") {
            setFilter(
                data.filter(function (i) {
                    return i.name.toLowerCase().match(props.textForFilter);
                })
            )
        } else {
            setFilter(props.items)
        }

    }, [props.textForFilter])

    useEffect(() => {
        setElementsForCurrentPage()
        // console.log("TCL: ListResult -> perPage", perPage)
        // console.log("TCL: ListResult -> elements.length", elements.length)


    }, [offset, perPage])

    useEffect(() => {
        let heighWindows = window.innerHeight;
        // // console.log("TCL: UseEffect -> props.heighComponent", props.heighComponent)
        let elementsPerPage = Math.floor(heighWindows * (15 / 768))
        setperPage(elementsPerPage)
    }, [props.heighComponent])

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

    function handleClick(e) {
        console.log("TCL: handleClick -> e", e.target.name)
        props.handleMouseHover(true)
        props.handleClickItem(e.target.name)
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
        <div className='list-result'>

            {
                elements.map(
                    (item, i) => <div key={i} onClick={handleClick} >
                        <ItemResult name={item.name} itemid={item.id} />
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

export default ListResult;