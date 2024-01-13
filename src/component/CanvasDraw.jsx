import React, { useRef, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import Canvas from "./Canvas";
import { useCanvas } from "../context/CanvasContext";

function CanvasDraw() {
  const { clearCanvas, startErasing,resumeDrawing } = useCanvas();
  const [currentColor, setCurrentColor] = useState("#000000");
  const [stroke, setStroke] = useState(1);
  const [eraseStroke,setEraseStroke]=useState(5);

  const popoverColor = (
    <Popover id="top-popover" title="Color Selection">
      <div className="d-flex m-3">
        <div className="color-box m-2">
          <input
            id="color-pallete"
            type="color"
            onChange={(e)=>{setCurrentColor(e.target.value)}}
            value={currentColor}
          />
        </div>
        <div className="stroke-width m-2">
          <input
            id="stroke-range"
            type="range"
            className="form-range range-slider"
            min={1}
            max={10}
            onChange={(e)=>{setStroke(e.target.value)}}
            value={stroke}
          />
        </div>
      </div>
    </Popover>
  );
  const popoverEraser = (
    <Popover id="top-popover" title="Eraser Width">
      <div className="d-flex m-3">
        <div className="stroke-width m-2">
          <input
            id="stroke-range"
            type="range"
            className="form-range range-slider"
            min={5}
            max={20}
            step={2}
            onChange={(e)=>{setEraseStroke(e.target.value)}}
            value={eraseStroke}
          />
        </div>
      </div>
    </Popover>
  );

  return (
    <div className="container-md m-3 d-flex justify-content-between rounded border border-1">
      <div
        className="container-md"
        style={{ overflowY: "auto", maxHeight: "300px"}}
      >
        <Canvas color={currentColor} strokeWidth={stroke} eraseWidth={eraseStroke}/>
      </div>

      <div className="d-flex flex-column justify-content-around">
        <div className="d-flex justify-content-between">
          <div className="position-relative me-5" title="Current color">
            <span style={{ position: "absolute",zIndex:'100' }}>
              <i className="fa-solid fa-pen" onClick={()=>resumeDrawing(stroke)}></i>
            </span>
            <span
              className="color-display"
              style={{
                borderBottom: `${stroke}px solid ${currentColor}`,
                padding: `${stroke}px`,
              }}
            ></span>
          </div>
          <div>
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="top"
              overlay={popoverColor}
            >
              <span>
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </OverlayTrigger>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <span>
              <i
                className="fa-solid fa-eraser"
                title="Eraser"
                onClick={()=>{startErasing(eraseStroke)}}
              ></i>
            </span>
          </div>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="bottom"
            overlay={popoverEraser}
          >
            <span>
                <i className="fa-solid fa-chevron-down"></i>
              </span>
          </OverlayTrigger>
        </div>
        <div>
          <span>
            <i
              className="fa-solid fa-circle-xmark"
              title="Clear"
              onClick={()=>clearCanvas(stroke,currentColor)}
            ></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CanvasDraw;
