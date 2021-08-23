import React, { useEffect, useState } from 'react';
import './style.css'
import NewPages from '../Features/pages/Newpages.js'
import Pencil from '../Features/Options/Pencil';
import Eraser from '../Features/Options/Eraser';
import Photo from '../Features/Options/Photo';

const Board = () => {
    const Colors = ['black', 'blue', 'red', 'green', 'yellow']
    const [drawing, setdrawing] = useState(false)
    const [color, setcolor] = useState('black')
    const [eraserlinewidth, seteraserlinewidht] = useState('10')
    const [linewidth, setlinewidth] = useState(2)
    const [redo_list, set_redo] = useState([])
    const [undo_list, set_undo] = useState([])
    const [flag, setflag] = useState(0)
    const [state, setstate] = useState('pencil')
    let canvas;
    let ctx;

    useEffect(() => {

        canvas = document.getElementsByClassName("canvas")[0];
        ctx = canvas.getContext('2d')

    })
    useEffect(() => {
        window.addEventListener('load', () => {
            
           
            if (JSON.parse(localStorage.getItem("Pages"))) {
                var prevState = JSON.parse(localStorage.getItem("Pages"));
                var imageObj = new Image(1900,1000);
                imageObj.src = prevState[0]
                console.log(prevState[0])
                imageObj.onload = function () {
                    ctx.clearRect(0, 0, 1900, 1000);
                    ctx.drawImage(imageObj, 0, 0, 1900, 1000, 0, 0, 1900, 1000);
                }
                set_redo([])
                set_undo([])
                setflag(1)
            }

        })
        window.addEventListener('resize', () => {
          
            window.location.reload()
        })

    }, [])


    const saveState = (canvas, list, keep_redo) => {
        keep_redo = keep_redo || false;
        if (!keep_redo) {
            set_redo([]);
        }
        if (list) {
            if (list.name == 'undo') {
                set_undo(undo_list => [...undo_list, canvas.toDataURL()])
            }
            else {
                set_redo(redo_list => [...redo_list, canvas.toDataURL()])
            }
        }
        else {
            set_undo(undo_list => [...undo_list, canvas.toDataURL()])
        }
        
    }

    const undo = (canvas, ctx) => {

        restoreState(canvas, ctx, { name: 'undo', list: undo_list }, { name: 'redo', list: redo_list });

    }



    const redo = (canvas, ctx) => {
        restoreState(canvas, ctx, { name: 'redo', list: redo_list }, { name: 'undo', list: undo_list });

    }

    const restoreState = (canvas, ctx, poping, pushing) => {

        if (poping.list.length) {

            saveState(canvas, pushing, true);

            var restore_state = poping.list.pop();

            var temp_list = poping.list
            if (poping.name == 'undo') {
                set_undo([...temp_list])
            }
            else {
                set_redo([...temp_list])
            }
            var imageObj1 = new Image();
            imageObj1.src = restore_state
            imageObj1.onload = function () {
                ctx.clearRect(0, 0, 1900, 1000);
                ctx.drawImage(imageObj1, 0, 0, 1900, 1000, 0, 0, 1900, 1000);

            }

        }
    }
    const draw = (e) => {

        if (!drawing) return;
        canvas = document.getElementsByClassName("canvas")[0];
        ctx = canvas.getContext('2d')
        ctx.lineWidth = state != 'pencil' ? eraserlinewidth : linewidth;
        ctx.lineCap = 'round'
        ctx.strokeStyle = state != 'pencil' ? 'white' : color
        var left = e.clientX-canvas.offsetLeft
        var top = e.clientY-canvas.offsetTop;
        
        ctx.lineTo(left, top)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(left, top)

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

    }

    const erase = (e) => {
        setstate('erase')
        document.getElementsByClassName("canvas")[0].style.cursor = "pointer"

    }
    const pencil = (e) => {
        setstate('pencil')
        document.getElementsByClassName("canvas")[0].style.cursor = "crosshair"

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

    const callundo = () => {
        undo(canvas, ctx);
    }

    const callredo = () => {
        redo(canvas, ctx);
    }

    const clearRect = () => {
        ctx.clearRect(0, 0, 1900, 1000)
        set_redo([])
        set_undo([])

        //localStorage.setItem("Canvas", JSON.stringify([canvas.toDataURL()]));
    }

    const download = () => {
        var download = document.getElementsByClassName("download")[0];
        var image = canvas.toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
    }

    return (

        <div className="container">
            <div className="Navbar">
                <NewPages settingundo={set_undo} settingredo={set_redo} drawingStatus={drawing} flag={flag} clear={clearRect}/>
            </div>
            <div className="test">

                <canvas ref={canvas} height={window.innerHeight * 0.8} width={window.innerWidth * 0.75} className="canvas" onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw}> </canvas>

            </div>

            <div className="options">
                <div className="Box">
                    <Pencil/>
                    <Eraser/>
                    <Photo/>
                </div>

            </div>

        </div>




    )
}

export default Board