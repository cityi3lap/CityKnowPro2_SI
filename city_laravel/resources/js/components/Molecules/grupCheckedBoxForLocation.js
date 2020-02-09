import React, { useState, useEffect } from 'react'


const GroupCheckedBoxLocation = ({ locationUsers }) => {

    const [infoForCheckBox, setinfoForCheckBox] = useState([])
    const [infoChecked, setinfoChecked] = useState([])

    useEffect(() => {
        if (locationUsers != undefined ) {
                setinfoForCheckBox(locationUsers)
        }
    }, [locationUsers])

    return (
        <div>
            {
                infoChecked.map(
                    (item , i) => <div key={i} >
                        {item.name} - Checked
                    </div>
                )
            }
            {
                infoForCheckBox.map(
                    (item, i ) => <div key={i}>
                        {item.name}
                    </div>
                )
            }
        </div>
    )

}

export default GroupCheckedBoxLocation