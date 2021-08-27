import React, { useState } from 'react'

import './style.css'
const Pencil = (props) => {
    
    var color = props.isActive?'#fff':'#3d4042'
    
    return (

            <button className={`${props.isActive?'isActive':'btn'}`} onClick={()=>{props.clickHandle();props.draw()}} >
                   <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"  viewBox="0 0 24 24"><path fill="none"  d="M24 0v24H0V0h24z"></path><path fill={color} d="M3 17.25V21h3.74l7.54-7.53-3.75-3.75L3 17.25zM18.37 3.3l2.34 2.33c.39.39.4 1.03.01 1.42l-5.37 5.36-3.76-3.76 2.53-2.53-.73-.73-5.66 5.66-1.4-1.4 6.37-6.36c.39-.39 1.04-.38 1.42.01l1.42 1.41 1.42-1.41c.38-.39 1.02-.39 1.41 0z"></path></svg>
            </button>

    )
}

export default Pencil

// className={[true && 'btn',isActive?'Active':'InActive']}