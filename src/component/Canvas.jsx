import React, { useContext, useEffect } from "react";
import { useCanvas } from "../context/CanvasContext";
import { TodoListContext } from "../context/ToDoListContext";

export default function Canvas({ color, strokeWidth, eraseWidth }) {
  const {
    canvasRef,
    contextRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();
  const {editCanvas} = useContext(TodoListContext);

  useEffect(() => {
    prepareCanvas();
  }, []);
  useEffect(()=>{
    if(editCanvas){
    const editCanvasData = editCanvas[0].name;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = editCanvasData;
    img.onload = function() {
      context.drawImage(img, 0, 0);
    };
    contextRef.current = context;
  }
  },[editCanvas])
  useEffect(() => {
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = strokeWidth;
    if (contextRef.current.globalCompositeOperation === "destination-out") {
      contextRef.current.lineWidth = eraseWidth;
    } else {
      contextRef.current.lineWidth = strokeWidth;
    }
  }, [color, strokeWidth, eraseWidth]);
  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onMouseOut={finishDrawing}
      ref={canvasRef}
    />
  );
}
