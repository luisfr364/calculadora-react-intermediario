// src/App.jsx
import React from "react";
import Calculadora from "./components/Calculadora/Calculadora";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <h1>Calculadora React</h1>
      <Calculadora />
    </div>
  );
}

export default App;
