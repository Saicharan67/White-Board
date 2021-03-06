import React, { useEffect, useState } from 'react';
import './style.css'
import NewPages from '../Features/pages/Newpages.js'
import { IoTabletLandscapeOutline ,IoSquareOutline,IoArrowRedo,IoArrowUndo} from 'react-icons/io5';
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
            console.log(JSON.parse(localStorage.getItem("Pages")) ? JSON.parse(localStorage.getItem("Pages")).length : 'notcame')
           
            if (JSON.parse(localStorage.getItem("Pages"))) {
                var prevState = JSON.parse(localStorage.getItem("Pages"));
                var imageObj = new Image();
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
        window.addEventListener('keydown', function (event) {
            if (event.key == 'z' && event.ctrlKey) {
                console.log('came')
                undo(canvas, ctx)
            }
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
        console.log(undo_list.length, redo_list.length)
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
    const rectangle = () => {
        setstate('pencil')
        let xPlace = 100;
        let yPlace = 130;
        document.getElementsByClassName('canvas')[0].addEventListener('click', (event) => {
            xPlace = event.clientX-canvas.offsetLeft
            yPlace = event.clientY-canvas.offsetTop
            ctx.beginPath();
            ctx.lineWidth = linewidth;
            ctx.strokeStyle = color;
            ctx.rect(xPlace, yPlace, 300, 150);
            ctx.stroke();
            ctx.beginPath();


        }, { once: true })
    }
    const square = () => {
        setstate('pencil')
        let xPlace = 100;
        let yPlace = 130;
        document.getElementsByClassName('canvas')[0].addEventListener('click', (event) => {
            xPlace = event.clientX-canvas.offsetLeft
            yPlace = event.clientY-canvas.offsetTop
            ctx.beginPath();
            ctx.lineWidth = linewidth;
            ctx.strokeStyle = color;
            ctx.rect(xPlace, yPlace, 200, 200);
            ctx.stroke();
            ctx.beginPath();


        }, { once: true })

    }
    const Circle = () => {
        setstate('pencil')
        let xPlace = 100;
        let yPlace = 130;
        document.getElementsByClassName('canvas')[0].addEventListener('click', (event) => {
            xPlace = event.clientX-canvas.offsetLeft
            yPlace = event.clientY-canvas.offsetTop

            ctx.beginPath();
            ctx.lineWidth = linewidth;
            ctx.strokeStyle = color;
            ctx.arc(xPlace, yPlace, 200, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.beginPath();

        }, { once: true })

    }
    const insertText = () => {
        setdrawing(false)
        var mouseX = 0
        var mouseY = 0;
        var startingX = 0;

        document.addEventListener("click", function (e) {
            mouseX = e.clientX;
            startingX = mouseX
            mouseY = e.clientY;

            return false

        }, false)

        document.addEventListener("keydown", (e) => {
            ctx.font = "30px Times New Roman"
            if (e.key == "Enter") {
                mouseX = startingX;
                mouseY += 20
            }
            else if (e.keyCode === 8) {
                undo(canvas, ctx)
                mouseX -= ctx.measureText(e.key).width;
            } else {
                ctx.fillText(e.key, mouseX, mouseY)
                saveState(canvas)
                mouseX += ctx.measureText(e.key).width;
            }

        }, false)
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

        <div className='root'>
            <div>
                <div className='sidebar'>
                    <button className='eraser' onClick={erase}>
                    <i  className="fa fa-eraser fa-2x"></i>
                    </button>
                    <a className="download" download="canvas.png">
                        <button className='eraser' type="button" onClick={download}> <i  className="fa fa-download fa-2x"></i></button>
                    </a>
                    <button className='eraser' id="pencil" onClick={pencil}>
                        <i  className="fa fa-pencil fa-2x"></i>
                    </button>
                    <button className='eraser' id="undo" onClick={insertText}>
                    <i  className="fa fa-font fa-2x"></i>
                    </button>
                    <button className='eraser' id="undo" onClick={callundo}>
                    <IoArrowUndo style={{fontSize:'1.5rem'}}/>
                    </button>
                    <button className='eraser' id="redo" onClick={callredo}>
                    <IoArrowRedo style={{fontSize:'1.5rem'}}/>
                    </button>
                    <button className='eraser' id="redo" onClick={clearRect}>
                        Clear
                    </button>
                    <button className='eraser' onClick={rectangle}>
                    <IoTabletLandscapeOutline style={{fontSize:'1.5rem'}}/>
                    </button>
                    <button className='eraser' onClick={square}>
                   <IoSquareOutline style={{fontSize:'1.5rem'}}/>
                    </button>
                    <button className='eraser' onClick={Circle}>
                    <i  className="fa fa-circle fa-2x"></i>
                    </button>


                </div>
                <NewPages settingundo={set_undo} settingredo={set_redo} drawingStatus={drawing} flag={flag} />
                <div className="penciloptions">
                    {/* <div>
                                {Colors.map((clr)=>{
                                    return(
                                        <button key={clr} className = 'eraser' onClick={()=>chooseColor(clr)}>
                                        {clr}
                                    </button>
                                    )
                                })}
                        </div> */}
                    {/* <div className="inputrange">
                           <h4>Pencil Size</h4>

                            <div>
                                    <input type="range" min="1" max = "10" defaultValue={linewidth} value={linewidth} onChange={setline}></input>
                            </div>
                        </div>

                        <div className="inputrange">
                            <h4>Eraser Size</h4>

                            <div>
                                    <input type="range" min="3" max = "50" defaultValue={eraserlinewidth} value={eraserlinewidth} onChange={seteraserline}></input>
                            </div>
                        </div> */}
                </div>
            </div>



            <div className="test">

                <canvas ref={canvas} height={window.innerHeight * 0.85} width={window.innerWidth * 0.85} className="canvas" onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw}> </canvas>

            </div>

        </div>




    )
}

export default Board