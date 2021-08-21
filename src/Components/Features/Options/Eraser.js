import React from 'react'

import './style.css'

const Eraser = (props) => {
    const isActive = true

    return (

            <button className="btn" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" ><path fill="none" d="M24 0v24H0V0h24z" ></path><path d="M17.26 18l-2 2h6.7v-2h-4.7zm4.15-6.67L13.04 20H4.73l-2.15-2.14c-.78-.78-.78-2.03 0-2.82L13.62 3.58c.78-.77 2.06-.77 2.84 0l4.95 4.93c.79.78.79 2.04 0 2.82z" ></path></svg>
            </button>

    )
}

export default Eraser

// className={[true && 'btn',isActive?'Active':'InActive']}