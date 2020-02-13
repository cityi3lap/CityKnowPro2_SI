import React , { useState } from 'react'

const InputSearch = (props) => {
    const [searchString , setSearchString] = useState('') 

    const handleChange = (e) => {
        // Sent value to parent component
        props.onChange(e.target.value)
    }
    return (
        <div className="input-group input-Search">
            <input type="text" className="form-control inputFilter" onChange={handleChange} placeholder={props.placeHolder} ></input>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-search" type="button" id="button-addon2">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    )
}

export default InputSearch  