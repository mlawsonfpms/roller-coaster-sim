import React from "react";
import "./EnergyMeter.css";

const EnergyMeter = ({ potential, kinetic }) => {
  const total = potential + kinetic;
  const pPercent = (potential / total) * 100;
  const kPercent = (kinetic / total) * 100;

  return (
    <div className="energy-meter">
      <h2>Energy Meter</h2>
      <div className="bar-container">
        <div className="bar potential" style={{ width: `${pPercent}%` }}></div>
        <div className="bar kinetic" style={{ width: `${kPercent}%` }}></div>
      </div>
      <p>Potential: {potential.toFixed(1)} | Kinetic: {kinetic.toFixed(1)}</p>
    </div>
  );
};

export default EnergyMeter;
