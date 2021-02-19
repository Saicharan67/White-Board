import React, { useEffect, useState } from 'react';
import './style.css'
const NewPages = ({ settingundo,
    settingredo,drawingStatus})=>{
   var canvas,ctx
   const [currPage,setcurrPage] = useState(1)
   const [totalpages,settotalpages] =useState(1)
   const [flag,setflag] = useState(false)

   // useEffect to check previous storage exits and if then renders it
   useEffect(()=>{
    if(JSON.parse(localStorage.getItem("Pages"))){
        setcurrPage(1)
        settotalpages( JSON.parse(localStorage.getItem("TotalPages")))
       // drawpage(1)
      
    }
   },[])


   // useEffect to listen to updates on totalpages
   useEffect(()=>{
     localStorage.setItem('TotalPages',JSON.stringify(totalpages))
   },[totalpages])


  // This effect shld certain to go to hell becoz iam gonna change this to useref
   useEffect(()=>{
    canvas = document.getElementsByClassName("canvas")[0];
    ctx  = canvas.getContext('2d')

   })

   //UseEffect for setting undo , redo lists to [] for every change in page
   useEffect(()=>{
      settingundo([])
      settingredo([])
   },[currPage])

   // UseEffect to update the page for every change
   useEffect(()=>{
  
     if(!drawingStatus && flag && JSON.parse(localStorage.getItem("Pages"))){
        console.log(currPage)
        var storedpages = JSON.parse(localStorage.getItem("Pages"))
        storedpages[currPage-1]=canvas.toDataURL()
        localStorage.setItem("Pages", JSON.stringify(storedpages))
            
     }
     if(!flag){setflag(true)}
   
   },[drawingStatus])


   // fnx to save the page 
   const savepage = () => {
    var storedpages = JSON.parse(localStorage.getItem("Pages"))
    storedpages[currPage-1]=canvas.toDataURL()
    localStorage.setItem("Pages", JSON.stringify(storedpages))
   }

  // fnx to drawpage according to page number passed
   const drawpage = (page) => {   
    var storedpages = JSON.parse(localStorage.getItem("Pages"))
    var imageObj2 = new Image();
    imageObj2.src = storedpages[page-1]
    imageObj2.onload = function() {

        ctx.clearRect(0, 0, 1900, 1000);
        ctx.drawImage(imageObj2,0,0,1900, 1000, 0, 0, 1900, 1000);
  
     }

   }

   //fnx that excutes on prev page button clicks
   const PrevPage = () => {
    if(currPage==1)return;
    savepage()
    setcurrPage(currPage-1) 
    drawpage(currPage-1)
  
  }
   
  //fnx that excutes on next page button clicks
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