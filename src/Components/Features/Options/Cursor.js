import React, { useState } from 'react'

import './style.css'

const Cursor = (props) => {
       
    var color = props.isActive?'#fff':'#3d4042'

    return (

            <button className={`${props.isActive?'isActive':'btn'}`}  onClick={()=>{props.clickHandle()}} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path fill="none" d="M24 0v24H0V0h24z" ></path><polygon fill={color} points="12.926 12 17.5 20 15 21.5 10.405 13.595 6 18 6 2 19 12" ></polygon></svg>
            </button>

    )
}

export default Cursor

