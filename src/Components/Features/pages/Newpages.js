import React, { useEffect, useState } from 'react';
import './style.css'
const NewPages = ({ settingundo,
    settingredo,drawingStatus})=>{
   var canvas,ctx
   const [currPage,setcurrPage] = useState(1)
   const [totalpages,settotalpages] =useState(1)
   

   useEffect(()=>{
    canvas = document.getElementsByClassName("canvas")[0];
    ctx  = canvas.getContext('2d')
    
    
   })
   useEffect(()=>{
     settingundo([])
     settingredo([])
     if(!drawingStatus && currPage==totalpages){
        var storedpages = JSON.parse(localStorage.getItem("Pages"))
        storedpages[currPage-1]=canvas.toDataURL()
        localStorage.setItem("Pages", JSON.stringify(storedpages))
            
     }
   },[currPage,drawingStatus])

   const savepage = () => {
    var storedpages = JSON.parse(localStorage.getItem("Pages"))
    storedpages[currPage-1]=canvas.toDataURL()
    localStorage.setItem("Pages", JSON.stringify(storedpages))
    
   }


   const drawpage = (page) => {

   
    var storedpages = JSON.parse(localStorage.getItem("Pages"))
    var imageObj2 = new Image();
    imageObj2.src = storedpages[page-1]
    imageObj2.onload = function() {

        ctx.clearRect(0, 0, 1900, 1000);
        ctx.drawImage(imageObj2,0,0,1900, 1000, 0, 0, 1900, 1000);
        
     }

   }
   const PrevPage = () => {
    if(currPage==1)return;
    savepage()
    setcurrPage(currPage-1) 
    drawpage(currPage-1)
  
  }

   const NextPage = () => {
       if (currPage==totalpages){
           if(totalpages==1){
           
            localStorage.setItem("Pages", JSON.stringify([canvas.toDataURL()]));
            setcurrPage(currPage+1)
            settotalpages(totalpages+1)
            ctx.clearRect(0, 0, 1900, 1000);
           }
          else{
            savepage()
            ctx.clearRect(0, 0, 1900, 1000);
            setcurrPage(currPage+1)
            settotalpages(totalpages+1)
            
          }
       }
       else{
           savepage()
           setcurrPage(currPage+1)
          
            drawpage(currPage+1)
      
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