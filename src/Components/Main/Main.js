import { render } from "@testing-library/react"

import  './style.css'

const Board = props => {
    
   
    const fixHeight = (canvas) =>{
        canvas.height = window.innerHeight-5;
        canvas.width = window.innerWidth-5
    }
   window.addEventListener('load', ()=>{
       const canvas = document.querySelector('.canvas')
       const ctx = canvas.getContext("2d");
       fixHeight(canvas)
   })
   
   window.addEventListener('resize',()=>{
    const canvas = document.querySelector('.canvas')
    canvas.height = window.innerHeight-5;
    canvas.width = window.innerWidth-5
   })

   let drawing = false
   const startDrawing = (e) => {
          drawing = true
          draw(e)
         
   }
   const finishDrawing = () => {
        const canvas = document.querySelector('.canvas')
        const ctx = canvas.getContext("2d");
       drawing = false
       ctx.beginPath()
   }
   const draw = (e) => {
    const canvas = document.querySelector('.canvas')
    const ctx = canvas.getContext("2d");
       if(!drawing) return;
       ctx.lineWidth = 2
       ctx.lineCap = 'round'
       ctx.lineTo(e.clientX,e.clientY)
       ctx.stroke()
       ctx.beginPath();
       ctx.moveTo(e.clientX,e.clientY)

   }
    return(
        <canvas className='canvas'
        onMouseMove={draw}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing} 
        >

        </canvas>
    )
}

export default Board