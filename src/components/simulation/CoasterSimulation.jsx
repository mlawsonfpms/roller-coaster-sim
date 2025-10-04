import React, { useState } from "react";
import "./TrackDesigner.css";

export default function TrackDesigner({ onTrackUpdate }) {
  const [points, setPoints] = useState([
    { x: 50, y: 200 },
    { x: 150, y: 250 },
    { x: 250, y: 180 },
    { x: 350, y: 300 },
    { x: 450, y: 220 },
    { x: 550, y: 260 },
    { x: 650, y: 200 },
  ]);

  const handleDrag = (index, e) => {
    const rect = e.target.ownerSVGElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoints = [...points];
    newPoints[index] = { x, y };
    setPoints(newPoints);
    onTrackUpdate(newPoints);
  };

  return (
    <div className="track-designer">
      <svg width="700" height="400" style={{ border: "1px solid #555" }}>
        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#1e90ff"
          strokeWidth="3"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="6"
            fill="#ff6f00"
            onMouseDown={(e) => {
              e.preventDefault();
              const moveHandler = (moveEvent) => handleDrag(i, moveEvent);
              const upHandler = () => {
                window.removeEventListener("mousemove", moveHandler);
                window.removeEventListener("mouseup", upHandler);
              };
              window.addEventListener("mousemove", moveHandler);
              window.addEventListener("mouseup", upHandler);
            }}
          />
        ))}
      </svg>
    </div>
  );
}
