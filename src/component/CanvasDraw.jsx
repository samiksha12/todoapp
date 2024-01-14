import React, { useRef, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import Canvas from "./Canvas";
import { useCanvas } from "../context/CanvasContext";

function CanvasDraw() {
  const { clearCanvas,eraser,pen,color,stroke,eraseStroke,setPenColor,setPenStroke,setEraserWidth } = useCanvas();


  const popoverColor = (
    <Popover id="top-popover" title="Color Selection">
      <div className="text-center">Pen size</div>
      <div className="d-flex m-3">
        <div className="color-box m-2">
          <input
            id="color-pallete"
            type="color"
            onChange={(e)=>{setPenColor(e.target.value)}}
            value={color}
          />
        </div>
        <div className="stroke-width m-2">
          <input
            id="stroke-range"
            type="range"
            className="form-range range-slider"
            min={5}
            max={15}
            onChange={(e)=>{setPenStroke(e.target.value)}}
            value={stroke}
          />
        </div>
      </div>
    </Popover>
  );
  const popoverEraser = (
    <Popover id="top-popover" title="Eraser Width">
      <div className="text-center">Eraser size</div>
      <div className="d-flex m-3">
        <div className="stroke-width m-2">
          <input
            id="stroke-range"
            type="range"
            className="form-range range-slider"
            min={5}
            max={20}
            step={2}
            onChange={(e)=>{setEraserWidth(e.target.value)}}
            value={eraseStroke}
          />
        </div>
      </div>
    </Popover>
  );

  return (
    <div className="container-md d-flex flex-sm-column flex-column justify-content-between rounded border border-1">
      <div
        className="container-md"
        style={{ overflowY: "auto", maxHeight: "500px"}}
      >
        <Canvas/>
      </div>

      <div className="d-flex flex-sm-row justify-content-around">
        <div className="d-flex justify-content-between">
          <div className="position-relative me-5" title="Current color">
            <span style={{ position: "absolute",zIndex:'100' }}>
              <i className="fa-solid fa-pen" onClick={()=>pen(stroke)}></i>
            </span>
            <span
              className="color-display"
              style={{
                borderBottom: `${stroke}px solid ${color}`,
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
                onClick={()=>eraser(eraseStroke)}
              ></i>
            </span>
          </div>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
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
              onClick={clearCanvas}
            ></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CanvasDraw;
