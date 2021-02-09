import React, { useEffect, useState } from 'react';
import  './style.css'

const Board = props => {
    const Colors = ['black','blue','red','green','yellow']
    let canvas,ctx,features1,history
    const [drawing , setdrawing] = useState(false) 
    const [color ,setcolor] = useState('black')
    const [eraserlinewidth,seteraserlinewidht]=useState('10')
    const [linewidth,setlinewidth] = useState(2)
    const  [redo_list,set_redo] = useState([])
    const  [undo_list,set_undo] = useState([])
    const [state,setstate] = useState('pencil')
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
         set_redo([])
         set_undo([])
        })
        window.addEventListener('resize',()=>{
            fixHeight(canvas)
        })
         history = {
           
            saveState: function(canvas, list, keep_redo) {
              keep_redo = keep_redo || false;
              if(!keep_redo) {
                set_redo([]);
              }
              
              
            
              set_undo(undo_list=>[...undo_list,canvas.toDataURL()])  // this line has changed check before u suck
              console.log('savestate',undo_list,undo_list.length)  
            },
            undo: function(canvas, ctx) {
                console.log('undo calling',this.undo_list,this.redo_list)
              this.restoreState(canvas, ctx, undo_list, redo_list);
            },
            redo: function(canvas, ctx) {
              this.restoreState(canvas, ctx, redo_list, undo_list);
            },
            restoreState: function(canvas, ctx,  po, pus) {
               
              if(po.length) {
                console.log('coming')
                this.saveState(canvas, pus, true);
                var restore_state = po.pop();
                //var img = React.createElement('img', {'src':restore_state});
                const YourComponent = ({restore_state}) => <img src={restore_state} alt="foo" />
                // img.onload = function() {
                //   ctx.clearRect();
                //   //ctx.drawImage(img, 0, 0, 1200, 900, 0, 0, 1200, 900);  
                // }
             
                ctx.drawImage(YourComponent(), 0, 0, 1200, 900, 0, 0, 1200, 900);
              }
            }
        }
          
    })
    
    const startDrawing = (evt) => {
       
        setdrawing(true)
        history.saveState(canvas);
        console.log(canvas)
        draw(evt)
        
       
       
         
       
    }
    const finishDrawing = () => {
        setdrawing(false)
        ctx.beginPath()
    }
    const draw = (e) => {
    
       if(!drawing) return;
      
       ctx.lineWidth = state!='pencil'?eraserlinewidth:linewidth;
       ctx.lineCap = 'round'
       ctx.strokeStyle=state!='pencil'?'white':color
       ctx.lineTo(e.clientX,e.clientY)
       ctx.stroke()
       ctx.beginPath()
       ctx.moveTo(e.clientX,e.clientY)
    
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
                    console.log(xPlace,yPlace)
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

    
   
    
   
    return(
        
         <div className='root'>
           
            <div>
                <div  className='sidebar'>
                   <button className = 'eraser' onClick={erase}>
                       Earser
                   </button>
                   <button className = 'eraser' id="pencil" onClick={pencil}>
                      pencil
                   </button>
                   <button className = 'eraser' id="undo" onClick={()=>{
                       history.undo(canvas, ctx);
                   }}>
                      undo
                   </button>
                   <button className = 'eraser' id="redo" onClick={()=>{
                        history.redo(canvas, ctx);
                   }}>
                      redo
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