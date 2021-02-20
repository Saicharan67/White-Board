import React, { useEffect, useRef, useState } from 'react';
import  './style.css'
import NewPages from '../Features/pages/Newpages.js'

const Board = () => {
    const Colors = ['black','blue','red','green','yellow']
    const [drawing , setdrawing] = useState(false) 
    const [color ,setcolor] = useState('black')
    const [eraserlinewidth,seteraserlinewidht]=useState('10')
    const [linewidth,setlinewidth] = useState(2)
    const [redo_list,set_redo] = useState([])
    const [undo_list,set_undo] = useState([])
    const [state,setstate] = useState('pencil')
    let  canvas ;
    let ctx ;
    const fixHeight = (canvas) =>{
        canvas.height = window.innerHeight-5;
        canvas.width = window.innerWidth-5
    }
    useEffect(()=>{
       
        canvas = document.getElementsByClassName("canvas")[0];
        ctx  = canvas.getContext('2d')
     
    })
    useEffect(()=>{
        window.addEventListener('load',()=>{
            console.log(JSON.parse(localStorage.getItem("Pages"))?JSON.parse(localStorage.getItem("Pages")).length:'notcame')
            fixHeight(canvas)
            if(JSON.parse(localStorage.getItem("Pages"))){
            var prevState = JSON.parse(localStorage.getItem("Pages"));
            var imageObj = new Image();
            imageObj.src = prevState[0]
            console.log(prevState[0],prevState[1])
            imageObj.onload = function() {
             ctx.clearRect(0, 0, 1900, 1000);
             ctx.drawImage(imageObj,0,0,1900, 1000, 0, 0, 1900, 1000);
             }
            set_redo([])
            set_undo([])
            }
            
           })
    },[])
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            fixHeight(canvas)
            window.location.reload()
        })

    },[])

    const saveState = (canvas , list ,keep_redo) => {
        keep_redo = keep_redo || false;
        if(!keep_redo) {
          set_redo([]);
        }       
        if (list){
               if (list.name=='undo'){
                  set_undo(undo_list=>[...undo_list,canvas.toDataURL()]) 
               }
               else{
                  set_redo(redo_list=>[...redo_list,canvas.toDataURL()]) 
               }
        }
        else{         
          set_undo(undo_list=>[...undo_list,canvas.toDataURL()])       
      }     
      console.log(undo_list.length,redo_list.length)
    }

    const undo = (canvas , ctx) => {
        restoreState(canvas, ctx, {name:'undo',list:undo_list}, {name:'redo',list:redo_list});
    }
   


    const redo = (canvas , ctx) => {
        restoreState(canvas, ctx,  {name:'redo',list:redo_list},{name:'undo',list:undo_list});

    }

    const restoreState = (canvas, ctx,  poping, pushing) => {

        if(poping.list.length) {
            
            saveState(canvas, pushing, true);
           
            var restore_state = poping.list.pop();
       
            var temp_list = poping.list
            if(poping.name=='undo'){
                set_undo([...temp_list]) 
            }
            else{
                set_redo([...temp_list])  
            }
            var imageObj1 = new Image();
            imageObj1.src = restore_state
            imageObj1.onload = function() {
             ctx.clearRect(0, 0, 1900, 1000);
             ctx.drawImage(imageObj1,0,0,1900, 1000, 0, 0, 1900, 1000);
            
             }

        }
    }
    const draw = (e) => {
    
        if(!drawing) return;
        canvas = document.getElementsByClassName("canvas")[0];
        ctx  = canvas.getContext('2d')
        ctx.lineWidth = state!='pencil'?eraserlinewidth:linewidth;
        ctx.lineCap = 'round'
        ctx.strokeStyle=state!='pencil'?'white':color
        ctx.lineTo(e.clientX,e.clientY)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(e.clientX,e.clientY)
     
    }

    const startDrawing = (evt) => {
       
        setdrawing(true)
        saveState(canvas);
        console.log(canvas)
        localStorage.setItem("undo_list", JSON.stringify(undo_list));
        draw(evt)
       
    
    }
    const finishDrawing = () => {
        setdrawing(false)
        ctx.beginPath()
        localStorage.setItem("Canvas", JSON.stringify([canvas.toDataURL()]));
        
    }
    
   const erase = (e) => {
    setstate('erase')
    document.getElementsByClassName("canvas")[0].style.cursor = "pointer"
   
   }
   const pencil = (e) => {
    setstate('pencil')
    document.getElementsByClassName("canvas")[0].style.cursor = "crosshair"

   }
   const rectangle = () => {
    setstate('pencil')
    let xPlace=100;
    let yPlace=130;
    document.getElementsByClassName('canvas')[0].addEventListener('click',(event)=>{
        xPlace = event.clientX
        yPlace = event.clientY
        ctx.beginPath();
        ctx.lineWidth = linewidth;
        ctx.strokeStyle = color;
        ctx.rect(xPlace, yPlace, 300, 150);
        ctx.stroke();
        ctx.beginPath();
       
      
      },{once:true})
   }
   const square = () => {
    setstate('pencil')
    let xPlace=100;
    let yPlace=130;
    document.getElementsByClassName('canvas')[0].addEventListener('click',(event)=>{
        xPlace = event.clientX
        yPlace = event.clientY
        ctx.beginPath();
        ctx.lineWidth = linewidth;
        ctx.strokeStyle = color;
        ctx.rect(xPlace, yPlace, 200, 200);
        ctx.stroke();
        ctx.beginPath();
       
      
   },{once:true})
   
   }
   const Circle = () => {
    setstate('pencil')
    let xPlace=100;
    let yPlace=130;
    document.getElementsByClassName('canvas')[0].addEventListener('click',(event)=>{
                    xPlace = event.clientX
                    yPlace = event.clientY
              
                    ctx.beginPath();
                    ctx.lineWidth = linewidth;
                    ctx.strokeStyle = color;
                    ctx.arc(xPlace, yPlace, 200, 0, 2 * Math.PI, false);
                    ctx.stroke();
                    ctx.beginPath();
                    
    },{once:true})
    
   }

   const chooseColor = (clr) => {
         setcolor(clr)     
   } 

   const setline = (e) => {     
       setlinewidth(e.target.value)  
   } 

   const seteraserline = (e) => {
       seteraserlinewidht(e.target.value)
   }

   const callundo = ()=>{
    undo(canvas, ctx);
   }

   const callredo = ()=>{
    redo(canvas, ctx);
   }

   const clearRect = () => {
    ctx.clearRect(0,0,1900,1000)
    set_redo([])
    set_undo([])
    localStorage.setItem("Canvas", JSON.stringify([canvas.toDataURL()]));
   }

   const download = () => {
    var download = document.getElementsByClassName("download")[0];
    var image = canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);   
    }
    
    return(
        
         <div className='root'>
            <div>
                <div  className='sidebar'>
                        <button className = 'eraser' onClick={erase}>
                            Earser
                        </button>
                        <a className="download" download="canvas.png">
                            <button className='eraser' type="button" onClick={download}>Download</button>
                            </a>
                        <button className = 'eraser' id="pencil" onClick={pencil}>
                            pencil
                        </button>
                        <button className = 'eraser' id="undo" onClick={callundo}>
                            undo
                        </button>
                        <button className = 'eraser' id="redo" onClick={callredo}>
                            redo
                        </button>
                        <button className = 'eraser' id="redo" onClick={clearRect}>
                            Clear
                        </button>
                        <button className = 'eraser' onClick={rectangle}>
                            rectangle
                        </button>
                        <button className = 'eraser' onClick={square}>
                            square
                        </button>
                            <button className = 'eraser' onClick={Circle}>
                            Circle
                        </button>
                   
                   
                </div>
                <NewPages settingundo={set_undo} settingredo={set_redo}  drawingStatus={drawing}/> 
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

                        <h4>Pencil Size</h4>

                        <div>
                                <input type="range" min="1" max = "10" defaultValue={linewidth} value={linewidth} onChange={setline}></input>
                        </div>

                        <h4>Eraser Size</h4>

                        <div>
                                <input type="range" min="3" max = "50" defaultValue={eraserlinewidth} value={eraserlinewidth} onChange={seteraserline}></input>
                        </div>
                
                </div>
            </div>
           
            
            
            <div>

            <canvas ref={canvas}   className="canvas"  onMouseDown={startDrawing}   onMouseUp={finishDrawing}  onMouseMove={draw}> </canvas>
     
            </div>
    
     </div>
               
               

       
    )
}

export default Board