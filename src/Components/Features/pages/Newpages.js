import React, { useEffect, useRef, useState } from 'react';
import './style.css'

const NewPages = ({ settingundo,
    settingredo,drawingStatus,flag,clear})=>{
   var canvas,ctx
   const [currPage,setcurrPage] = useState(1)
   const [totalpages,settotalpages] =useState(1)
  


   // useEffect to check previous storage exits and if then renders it
   useEffect(()=>{
    if(JSON.parse(localStorage.getItem("Pages"))){
        setcurrPage(1)
        settotalpages( JSON.parse(localStorage.getItem("TotalPages")))
      
      
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
   
     if(!drawingStatus && flag){
      
       if(JSON.parse(localStorage.getItem("Pages"))){
        console.log('currpage',currPage)
        var storedpages = JSON.parse(localStorage.getItem("Pages"))
  
        storedpages[currPage-1]=canvas.toDataURL()
    
        localStorage.setItem("Pages", JSON.stringify(storedpages))
       }
       else{
        localStorage.setItem("Pages", JSON.stringify([canvas.toDataURL()]));
       }
            
     }
    
   
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

   // fnx to del the page 
   const DeletePage = () => {
     console.log(currPage)
     if(currPage==1){
      NextPage()
      setcurrPage(currPage=>currPage-1)
      settotalpages(totalpages=>totalpages-1)
      const [firstelement,...rest]= JSON.parse(localStorage.getItem("Pages"))
      // console.log(firstelement,rest)
      localStorage.setItem("Pages", JSON.stringify(rest))
     }
     else{
       const TempPageNumber = currPage;
       const storedpages = JSON.parse(localStorage.getItem("Pages"));
       PrevPage()
       settotalpages(totalpages=>totalpages-1)
       storedpages.pop(TempPageNumber-1)
       localStorage.setItem("Pages", JSON.stringify(storedpages))



     }
   }
   const expandTop = ()=>{
     document.getElementsByClassName("HiddenTop")[0].style.height= "30%";
   }
   const collapsTop =  ()=> {
    document.getElementsByClassName("HiddenTop")[0].style.height= "0%";
   }
    return(
      
        <div  className='Nav'>
                <div className="HiddenTop">
                  <div className="hiddenparent">
                      {JSON.parse(localStorage.getItem("Pages")).map((page)=>{
                        return (
                        <div className="hiddenPages">

                            

                        </div>)
                      })}
                  </div>
                  <div className="closebtn" onClick={collapsTop}>
                        <div className="closebtnchild"></div>
                  </div>
                </div>
                <div className="top">
                    <div className="cnt">
                      <button className='iconsbutton1' onClick={PrevPage}>
                          <i className={`arrow ${currPage==1?'leftInactive':'left'}`}></i>
                      </button>
                      <div class="content"  onClick={expandTop}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="36" viewBox="0 0 46 36" >
                          <g fill="none" >
                            <rect width="38" height="22" x="1" y="7" stroke="#3C4043" stroke-width="2" ></rect>
                            <path fill="#5F6368" d="M8,4 L6,4 L6,0 L46,0 L46,24 L42,24 L42,22 L44,22 L44,2 L8,2 L8,4 Z" ></path>
                            <polygon fill="#80868B" points="26 33 23 36 20 33" ></polygon>
                          </g>
                        </svg>
                        <div className="text">{currPage}/{totalpages}</div>

                      </div>
                      <button   className='iconsbutton2' onClick={NextPage}>
                          <i className="arrow right"></i>
                      </button>
                    </div>
                </div>
                <div className="bottom">
                    <button>Undo</button>
                    <button>Redo</button>
                     |
                     &nbsp;
                    <button>Zoom</button>
                    &nbsp;
                     |
                     &nbsp;
                    <button>Set Background</button>
                    &nbsp;
                     |
                    &nbsp;
                    <button onClick={clear}>Clear Frame</button>

                </div>
            
        </div>
       
      
    )
} 
 


export default NewPages