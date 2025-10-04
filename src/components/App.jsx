import React from "react";
import "./App.css";
import CoasterSimulation from "./simulation/CoasterSimulation";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Roller Coaster Physics Simulator</h1>
        <p>Observe the transfer of potential and kinetic energy as your coaster moves!</p>
      </header>
      <main>
        <CoasterSimulation />
      </main>
      <footer>
        <p>
          Created by FPMS Science — Explore Motion, Forces, and Energy 🚀
        </p>
      </footer>
    </div>
  );
}

export default App;
