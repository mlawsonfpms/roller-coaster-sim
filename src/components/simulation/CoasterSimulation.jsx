import React, { useRef, useEffect, useState } from "react";
import "./CoasterSimulation.css";

export default function CoasterSimulation() {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(0.1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const drawTrack = () => {
      ctx.beginPath();
      ctx.moveTo(0, 300);
      ctx.bezierCurveTo(150, 100, 350, 100, 500, 300);
      ctx.bezierCurveTo(650, 500, 850, 500, 1000, 300);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    const drawCoaster = () => {
      const x = position % 1000;
      const y = 300 - Math.sin((x / 1000) * Math.PI * 2) * 150;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawTrack();
      drawCoaster();
      if (!paused) setPosition((prev) => prev + speed);
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, paused, speed]);

  return (
    <div className="coaster-simulation">
      <canvas ref={canvasRef} width={1000} height={600}></canvas>
      <div className="controls">
        <button onClick={() => setPaused(!paused)}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button onClick={() => setSpeed((s) => Math.max(0.05, s - 0.05))}>
          Slow Down
        </button>
        <button onClick={() => setSpeed((s) => Math.min(1, s + 0.05))}>
          Speed Up
        </button>
      </div>
    </div>
  );
}
