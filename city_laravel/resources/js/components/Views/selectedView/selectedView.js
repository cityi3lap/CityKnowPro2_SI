import React from 'react'

const SelectedView = (props) => {
    return (
        <div className="content-selected-view d-flex align-items-center justify-content-end  col-lg-12
         "> 
            <div className="col-md-4">
                <div className="tittle-selected-view">Por favor...</div>
                <div className="message-selected-view">{props.text}</div>
            </div>
            <div className="col-md-3">
                <img src="../img/know.png" className="img-fluid" alt="Responsive image">
                </img>
            </div>
        </div>
    )
}

export default SelectedView
