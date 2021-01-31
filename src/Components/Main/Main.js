

import React, { useEffect, useState } from 'react';
import  './style.css'
import $ from 'jquery'
const Board = props => {
    const Colors = ['black','blue','red','green','yellow']
    let canvas,ctx,features1
    const [drawing , setdrawing] = useState(false) 
    const [color ,setcolor] = useState('black')
    const [eraserlinewidth,seteraserlinewidht]=useState('10')
    const [linewidth,setlinewidth] = useState(2)
   
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
        })
        window.addEventListener('resize',()=>{
            fixHeight(canvas)
        })

        
            // var tool;
            // var canvas = document.getElementsByClassName("canvas")[0];
            // var ctx = canvas.getContext('2d');
            
            // var history = {
            //   redo_list: [],
            //   undo_list: [],
            //   saveState: function(canvas, list, keep_redo) {
            //     keep_redo = keep_redo || false;
            //     if(!keep_redo) {
            //       this.redo_list = [];
            //     }
                
            //     (list || this.undo_list).push(canvas.toDataURL());   
            //   },
            //   undo: function(canvas, ctx) {
            //     this.restoreState(canvas, ctx, this.undo_list, this.redo_list);
            //   },
            //   redo: function(canvas, ctx) {
            //     this.restoreState(canvas, ctx, this.redo_list, this.undo_list);
            //   },
            //   restoreState: function(canvas, ctx,  pop, push) {
            //     if(pop.length) {
            //       this.saveState(canvas, push, true);
            //       var restore_state = pop.pop();
            //       var img = new Element('img', {'src':restore_state});
            //       img.onload = function() {
            //         ctx.clearRect(0, 0, 600, 400);
            //         ctx.drawImage(img, 0, 0, 600, 400, 0, 0, 600, 400);  
            //       }
            //     }
            //   }
            // }
            
            // var pencil = {
            //   options: {
            //     stroke_color: ['00', '00', '00'],
            //     dim: 4
            //   },
            //   init: function(canvas, ctx) {
            //     this.canvas = canvas;
            //     this.canvas_coords = this.canvas.getCoordinates();
            //     this.ctx = ctx;
            //     this.ctx.strokeColor = this.options.stroke_color;
            //     this.drawing = false;
            //     this.addCanvasEvents();
            //   },
            //   addCanvasEvents: function() {
            //     this.canvas.addEvent('mousedown', this.start.bind(this));
            //     this.canvas.addEvent('mousemove', this.stroke.bind(this));
            //     this.canvas.addEvent('mouseup', this.stop.bind(this));
            //     this.canvas.addEvent('mouseout', this.stop.bind(this));
            //   },
            //   start: function(evt) {
            //     var x = evt.page.x - this.canvas_coords.left;
            //     var y = evt.page.y - this.canvas_coords.top;
            //     this.ctx.beginPath();
            //     this.ctx.moveTo(x, y);
            //     history.saveState(this.canvas);
            //     this.drawing = true;
            //   },
            //   stroke: function(evt) {
            //     if(this.drawing) {
            //       var x = evt.page.x - this.canvas_coords.left;
            //       var y = evt.page.y - this.canvas_coords.top;
            //       this.ctx.lineTo(x, y);
            //       this.ctx.stroke();
                  
            //     }
            //   },
            //   stop: function(evt) {
            //     if(this.drawing) this.drawing = false;
            //   }
            // };
            
            // document.getElementById('pencil').addEventListener('click', function() {
            //   pencil.init(canvas, ctx);
            // });
            
            // document.getElementById('undo').addEventListener('click', function() {
            //   history.undo(canvas, ctx);
            // });
            
            // document.getElementById('redo').addEventListener('click', function() {
            //   history.redo(canvas, ctx);
            // });
          
            
          
    })
    
    const startDrawing = (e) => {
       
        setdrawing(true)
        draw(e)
       
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
                   <button className = 'eraser' id="undo" >
                      undo
                   </button>
                   <button className = 'eraser' id="redo">
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