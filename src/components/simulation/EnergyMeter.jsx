import React from "react";
import "./EnergyMeter.css";

export default function EnergyMeter({ energy }) {
  const { potential, kinetic, total } = energy;

  return (
    <div className="energy-meter">
      <h3>Energy Tracker</h3>
      <div className="bars">
        <div className="bar-container">
          <label>Potential Energy</label>
          <div className="bar">
            <div
              className="fill potential"
              style={{ width: `${(potential / total) * 100}%` }}
            />
          </div>
          <span>{potential.toFixed(1)} J</span>
        </div>

        <div className="bar-container">
          <label>Kinetic Energy</label>
          <div className="bar">
            <div
              className="fill kinetic"
              style={{ width: `${(kinetic / total) * 100}%` }}
            />
          </div>
          <span>{kinetic.toFixed(1)} J</span>
        </div>

        <div className="bar-container">
          <label>Total Energy</label>
          <div className="bar">
            <div className="fill total" style={{ width: "100%" }} />
          </div>
          <span>{total.toFixed(1)} J</span>
        </div>
      </div>
    </div>
  );
}
