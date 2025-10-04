import React, { useEffect, useRef, useState } from "react";
import { calculatePhysics } from "../../utils/physics";
import "./CoasterSimulation.css";

export default function CoasterSimulation({ trackData }) {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [energy, setEnergy] = useState({ potential: 0, kinetic: 0, total: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const dt = (time - lastTime) / 1000; // convert to seconds
      lastTime = time;

      // Apply physics update
      const { newPosition, newVelocity, newEnergy } = calculatePhysics(
        position,
        velocity,
        trackData,
        dt
      );

      setPosition(newPosition);
      setVelocity(newVelocity);
      setEnergy(newEnergy);

      // --- Drawing section ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "gray";
      ctx.lineWidth = 2;

      // Draw track
      ctx.beginPath();
      for (let i = 0; i < trackData.length; i++) {
        const p = trackData[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // Draw coaster car
      const carX = trackData[Math.floor(newPosition)]?.x || 50;
      const carY = trackData[Math.floor(newPosition)]?.y || 50;
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(carX, carY, 10, 0, 2 * Math.PI);
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [trackData, position, velocity]);

  return (
    <div className="coaster-simulation">
      <canvas ref={canvasRef} width={800} height={400}></canvas>
      <div className="energy-display">
        <p>Potential Energy: {energy.potential.toFixed(2)}</p>
        <p>Kinetic Energy: {energy.kinetic.toFixed(2)}</p>
        <p>Total Energy: {energy.total.toFixed(2)}</p>
      </div>
    </div>
  );
}
