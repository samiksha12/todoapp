import React, { useContext, useEffect } from "react";
import { useCanvas } from "../context/CanvasContext";
import { TodoListContext } from "../context/ToDoListContext";

export default function Canvas() {
  const {
    canvasRef,
    contextRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
    color,
    stroke,
    eraseStroke
  } = useCanvas();
  const { editCanvas } = useContext(TodoListContext);

  useEffect(() => {
    prepareCanvas();
  }, []);
  useEffect(() => {
     if (editCanvas) {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const context = canvas.getContext("2d");
    const editCanvasData = editCanvas[0].name;
    const img = new Image();
    img.src = editCanvasData;
    img.onload = function () {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const width = container.clientWidth * 0.8;
      const deviceWidth = container.clientWidth;
      const aspectRatio = 1000 / 400;
      // Adjust canvas dimensions based on the aspect ratio
      let canvasHeight;
      const canvasWidth = img.width ;
      if (deviceWidth >= 600) {
        canvasHeight = width / aspectRatio;
      } else {
        canvasHeight = (width / aspectRatio) * 4;
      }
      // Set canvas dimensions
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Set canvas style dimensions
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      // Clear canvas before drawing the image
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image on the canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

    };

    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = stroke;
    contextRef.current = context;
  }
  }, [editCanvas]);
  useEffect(() => {
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = stroke;
    if (contextRef.current.globalCompositeOperation === "destination-out") {
      contextRef.current.lineWidth = eraseStroke;
    } else {
      contextRef.current.lineWidth = stroke;
    }
  }, [color, stroke, eraseStroke,contextRef.current]);
  return (
    <canvas
      onMouseDown={startDrawing}
      onTouchStart={startDrawing}
      onMouseUp={finishDrawing}
      onTouchEnd={finishDrawing}
      onMouseMove={draw}
      onTouchMove={draw}
      onMouseOut={finishDrawing}
      ref={canvasRef}
    />
  );
}
