import React from "react";
import ClockApp from "./ClockApp"; // Die Uhr und Lernspiel-Komponente

const App = () => {
  return (
    <div className="app">
      <h1>Uhrzeit Lernspiel</h1>
      <ClockApp />
    </div>
  );
};

export default App;
