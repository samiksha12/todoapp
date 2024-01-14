import React, { useContext, useEffect, useRef, useState } from "react";

const CanvasContext = React.createContext({
  canvasRef: {},
  contextRef: {},
  color:{},
  stroke:{},
  eraseStroke:{},
  prepareCanvas: () => {},
  startDrawing: () => {},
  finishDrawing: () => {},
  clearCanvas: () => {},
  draw: () => {},
  eraser: () => {},
  pen: () => {},
  setPenStroke:()=>{},
  setPenColor:()=>{},
  setEraserWidth:()=>{}
});

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState("pen");
  const [color,setColor] = useState("#000000");
  const [stroke,setStroke]=useState(5);
  const [eraseStroke,setEraseStroke] = useState(5);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const lastX = useRef(null);
  const lastY = useRef(null);
  const mouseX = useRef(null);
  const mouseY = useRef(null);

 

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const context = canvas.getContext("2d");
    const aspectRatio = 1000 / 400; // Desired aspect ratio

    const resizeCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const width = container.clientWidth * 0.8;
      const deviceWidth = container.clientWidth;
      let height;
      if (deviceWidth >= 600) {
        height = width / aspectRatio;
      } else {
        height = (width / aspectRatio) * 4;
      }

      // Set canvas dimensions
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;

      // Set canvas style dimensions
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.scale(devicePixelRatio, devicePixelRatio);
    };

    // Initial resize
    resizeCanvas();

    // Update canvas dimensions on window resize
    window.addEventListener("resize", resizeCanvas);
    context.strokeStyle = color;
    context.lineWidth = stroke;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.globalCompositeOperation = "source-over";
    contextRef.current = context;
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    let rect = canvas.getBoundingClientRect();
    if (e.nativeEvent.touches && e.nativeEvent.touches.length > 0) {
      mouseX.current = parseInt(
        e.nativeEvent.touches[0].clientX - canvas.offsetLeft
      );
      mouseY.current = parseInt(
        e.nativeEvent.touches[0].clientY - canvas.offsetTop
      );
    } else {
      mouseX.current = parseInt(e.clientX - rect.left );
      mouseY.current = parseInt(e.clientY - rect.top );
    }
    lastX.current = mouseX.current;
    lastY.current = mouseY.current;
    setIsDrawing(true);
  };

  const finishDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    let rect = canvas.getBoundingClientRect();
    if (e.nativeEvent.touches && e.nativeEvent.touches.length > 0) {
      mouseX.current = parseInt(
        e.nativeEvent.touches[0].clientX - canvas.offsetLeft
      );
      mouseY.current = parseInt(
        e.nativeEvent.touches[0].clientY - canvas.offsetTop
      );
    } else {
      mouseX.current = parseInt(e.clientX - rect.left );
      mouseY.current = parseInt(e.clientY - rect.top );
    }
    setIsDrawing(false);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let rect = canvas.getBoundingClientRect();
    if (e.nativeEvent.touches && e.nativeEvent.touches.length > 0) {
      mouseX.current = parseInt(
        e.nativeEvent.touches[0].clientX - canvas.offsetLeft
      );
      mouseY.current = parseInt(
        e.nativeEvent.touches[0].clientY - canvas.offsetTop
      );
    } else {
      mouseX.current = parseInt(e.clientX - rect.left );
      mouseY.current = parseInt(e.clientY - rect.top );
    }
    context.beginPath();
    if (mode === "pen") {
      context.globalCompositeOperation = "source-over";
      context.moveTo(lastX.current, lastY.current);
      context.lineTo(mouseX.current, mouseY.current);
      context.stroke();
    } else {
      context.globalCompositeOperation = "destination-out";
      context.arc(lastX.current, lastY.current, 8, 0, Math.PI * 2, false);
      context.fill();
    }
    lastX.current = mouseX.current;
    lastY.current = mouseY.current;
  };

  const eraser = (eraseStroke) => {
    setMode("eraser");
    setEraseStroke(eraseStroke);
    contextRef.current.lineWidth = eraseStroke;
  };
  const pen = (stroke) => {
    setMode("pen");
    setStroke(stroke);
    contextRef.current.lineWidth = stroke;
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    contextRef.current = context;
    setMode("pen");
  };

  const setPenColor=(penColor)=>{
    setColor(penColor);
  }
  const setPenStroke=(penStroke)=>{
    setStroke(penStroke);
  }
  const setEraserWidth = (eraser)=>{
    setEraseStroke(eraser);
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        color,
        stroke,
        eraseStroke,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        eraser,
        pen,
        setEraserWidth,
        setPenColor,
        setPenStroke
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
