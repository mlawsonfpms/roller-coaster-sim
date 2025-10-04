import React, { useEffect, useRef, useState } from "react";
import TrackDesigner from "./TrackDesigner";
import EnergyMeter from "./EnergyMeter";
import { calculatePhysics } from "../../utils/physics";
import "./CoasterSimulation.css";

export default function CoasterSimulation() {
  const canvasRef = useRef(null);
  const [trackData, setTrackData] = useState([]);
  const [position, setPosition] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [energy, setEnergy] = useState({
    potential: 0,
    kinetic: 0,
    total: 0,
  });
  const [running, setRunning] = useState(false);

  // update track points from designer
  const handleTrackUpdate = (points) => {
    setTrackData(points);
    setPosition(0);
    setVelocity(0);
  };

  useEffect(() => {
    if (!running || trackData.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let lastTime = performance.now();
    let animationId;

    const animate = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const { newPosition, newVelocity, newEnergy } = calculatePhysics(
        position,
        velocity,
        trackData,
        dt
      );

      setPosition(newPosition);
      setVelocity(newVelocity);
      setEnergy(newEnergy);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 2;

      // draw track
      ctx.beginPath();
      for (let i = 0; i < trackData.length; i++) {
        const p = trackData[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // draw coaster car
      const carIndex = Math.floor(newPosition);
      if (trackData[carIndex]) {
        const car = trackData[carIndex];
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(car.x, car.y, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [running, trackData, position, velocity]);

  const handleStart = () => {
    if (trackData.length < 2) return;
    setRunning(true);
  };

  const handleReset = () => {
    setRunning(false);
    setPosition(0);
    setVelocity(0);
    setEnergy({ potential: 0, kinetic: 0, total: 0 });
  };

  return (
    <div className="coaster-simulation">
      <TrackDesigner onTrackUpdate={handleTrackUpdate} />
      <div className="controls">
        <button onClick={handleStart} disabled={running}>
          ▶ Start
        </button>
        <button onClick={handleReset}>⏹ Reset</button>
      </div>
      <canvas ref={canvasRef} width={700} height={400}></canvas>
      <EnergyMeter energy={energy} />
    </div>
  );
}
