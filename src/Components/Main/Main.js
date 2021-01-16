

import React, { useEffect, useState } from 'react';
import  './style.css'

const Board = props => {
    const Colors = ['black','blue','red','green','yellow']
    let canvas,ctx,features1
    const [drawing , setdrawing] = useState(false) 
    const [color ,setcolor] = useState('black')
    const [inputlinewidth,setinputlinewidht]=useState('3')
    const [linewidth,setlinewidth] = useState(2)
    const fixHeight = (canvas) =>{
        canvas.height = window.innerHeight-5;
        canvas.width = window.innerWidth-5
    }
   
    useEffect(()=>{
        features1 = document.getElementsByClassName("penciloptions")[0].style;
       
        canvas = document.getElementsByClassName("canvas")[0];
        ctx  = canvas.getContext('2d')
        
        window.addEventListener('load',()=>{
         fixHeight(canvas)
        })
        window.addEventListener('resize',()=>{
            fixHeight(canvas)
        })
        
    })
    
    const startDrawing = (e) => {
        features1.display = "none"
        setdrawing(true)
        draw(e)
       
    }
    const finishDrawing = () => {
        setdrawing(false)
        ctx.beginPath()
    }
    const draw = (e) => {
    
       if(!drawing) return;
       ctx.lineWidth = linewidth
       ctx.lineCap = 'round'
       ctx.strokeStyle=color
       ctx.lineTo(e.clientX,e.clientY)
       ctx.stroke()
       ctx.beginPath()
       ctx.moveTo(e.clientX,e.clientY)
    
   }
   const erase = (e) => {
    document.getElementsByClassName("canvas")[0].style.cursor = "pointer"
    setcolor('white')
    
    setlinewidth(50)
    
    
   }
   const pencil = (e) => {
    document.getElementsByClassName("canvas")[0].style.cursor = "crosshair"
    features1.display = "flex"
  
   
   
    
    
   }
   const rectangle = () => {
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";
    ctx.rect(500, 300, 290, 140);
    ctx.stroke();
    ctx.beginPath();
   }

   const chooseColor = (clr) => {
       
        setcolor(clr)
        setlinewidth(inputlinewidth)
        features1.display="none"
   } 
   const setline = (e) => {
       setinputlinewidht(e.target.value)
       setlinewidth(e.target.value)
      
   }


    
   
    
   
    return(
        
                <div className='root'>
                 <div className='sidebar'>
                   <button className = 'eraser' onClick={erase}>
                       Earser
                   </button>
                   <button className = 'eraser' onClick={pencil}>
                      pencil
                   </button>
                   <button className = 'eraser' onClick={rectangle}>
                      rectangle
                   </button>

               </div>
               <div className="penciloptions">
                 <div>
                 {Colors.map((clr)=>{
                      return(
                        <button key={clr} className = 'eraser' onClick={()=>chooseColor(clr)}>
                        {clr}
                     </button>
                      )
                  })}
                 </div>
                 <div>
                     <input type="range" min="1" max = "10" defaultValue={linewidth} value={linewidth} onChange={setline}></input>
                 </div>
               </div>
               <div>

               <canvas className="canvas"
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                >  </canvas>
               </div>
                
                

              



                </div>
               
               

       
    )
}

export default Board