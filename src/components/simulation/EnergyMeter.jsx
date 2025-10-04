import React, { useEffect, useRef } from "react";
import "./EnergyMeter.css";

export default function EnergyMeter({ position, speed }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const height = canvas.height;
    const width = canvas.width;

    // Calculate potential & kinetic energy (simple approximation)
    const potentialEnergy = Math.max(0, 1 - Math.abs(Math.sin((position / 1000) * Math.PI * 2)));
    const kineticEnergy = Math.min(1, speed / 1.0);

    ctx.clearRect(0, 0, width, height);

    // Draw bars
    ctx.fillStyle = "#007acc";
    ctx.fillRect(50, height - potentialEnergy * height, 50, potentialEnergy * height);

    ctx.fillStyle = "#ff6600";
    ctx.fillRect(150, height - kineticEnergy * height, 50, kineticEnergy * height);

    // Labels
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText("Potential", 35, height - 10);
    ctx.fillText("Kinetic", 145, height - 10);
  }, [position, speed]);

  return (
    <div className="energy-meter">
      <canvas ref={canvasRef} width={250} height={200}></canvas>
      <p>Energy Transformation in Motion</p>
    </div>
  );
}
