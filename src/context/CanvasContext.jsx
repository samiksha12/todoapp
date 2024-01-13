import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext({
  canvasRef: {},
  contextRef: {},
  prepareCanvas: () => {},
  startDrawing: () => {},
  finishDrawing: () => {},
  clearCanvas: () => {},
  draw: () => {},
  startErasing: () => {},
  resumeDrawing: () => {},
  getDataUrl:()=>{}
});

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    canvas.width = container.clientWidth * 0.9;
    canvas.height = 1000;
    canvas.style.width = `${container.clientWidth * 0.9}px`;
    canvas.style.height = "1000px";
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.globalCompositeOperation = "source-over";
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    nativeEvent.preventDefault();
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  const startErasing = (eraseStroke) => {
    contextRef.current.globalCompositeOperation = "destination-out";
    contextRef.current.lineWidth = eraseStroke;
  };
  const resumeDrawing = (stroke) => {
    contextRef.current.globalCompositeOperation = "source-over";
    contextRef.current.lineWidth = stroke;
  };
  const clearCanvas = (stroke, color) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.globalCompositeOperation = "source-over";
    context.lineWidth = stroke;
    context.strokeStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  

  const getDataUrl = (originalCanvas) => {
    const originalContext = originalCanvas.getContext("2d");
    const imageData = originalContext.getImageData(
      0,
      0,
      originalCanvas.width,
      originalCanvas.height
    );

    let minY = originalCanvas.height;
    let maxY = 0;

    for (let y = 0; y < originalCanvas.height; y++) {
      for (let x = 0; x < originalCanvas.width; x++) {
        const alpha = imageData.data[(y * originalCanvas.width + x) * 4 + 3];
        if (alpha > 0) {
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
    }

    const visibleHeight = maxY - minY + 1;

    const visibleCanvas = document.createElement("canvas");
    visibleCanvas.width = originalCanvas.width;
    visibleCanvas.height = visibleHeight;

    const visibleContext = visibleCanvas.getContext("2d");
    visibleContext.drawImage(
      originalCanvas,
      0,
      minY,
      originalCanvas.width,
      visibleHeight,
      0,
      0,
      originalCanvas.width,
      visibleHeight
    );

    const visibleCanvasData = visibleCanvas.toDataURL();
    return visibleCanvasData;
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        startErasing,
        resumeDrawing,
        getDataUrl
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
