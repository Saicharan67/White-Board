import React, { useEffect, useState } from 'react';
import './style.css'
const NewPages = (props)=>{
   var ctx
   const canvas = props.canvas
   const [currPage,setcurrPage] = useState(1)
   const [currURL,setcurrURL] = useState('')
   const [totalpages,settotalpages] =useState(1)
   

   useEffect(()=>{
       ctx = canvas.getContext('2d')
   })
   const PrevPage = () => {
     if(currPage==1)return;
     setcurrPage(currPage-1)
   }

   const NextPage = () => {
       if (currPage==totalpages){
           if(totalpages==1){
            localStorage.setItem("Pages", JSON.stringify([canvas.toDataURL()]));
           }
           var storedpages = JSON.parse(localStorage.getItem("Pages"))
           localStorage.setItem("Pages", JSON.stringify([...storedpages , canvas.toDataURL()]))

           setcurrPage(currPage+1)
           settotalpages(settotalpages+1)
           ctx.clearRect(0, 0, 1300, 900);



       }
       else{
           setcurrPage(setcurrPage+1)
       }

   }









    return(
        <div className='page'>
            <button className='eraser' onClick={PrevPage}>prev</button>
            <div className='pagebox'>
                <span>{currPage}/{totalpages}</span>

            </div>
            <button className='eraser' onClick={NextPage}>next</button>
       </div>
    )
}
 


export default NewPages