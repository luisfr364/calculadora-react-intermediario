// src/components/Calculadora/Calculadora.jsx
import React, { useState } from "react";
import styles from "./Calculadora.module.css";

export default function Calculadora() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const result = calculate(prevValue, inputValue, operation);
      setDisplay(String(result));
      setPrevValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (prev, next, operation) => {
    switch (operation) {
      case "+":
        return prev + next;
      case "-":
        return prev - next;
      case "×":
        return prev * next;
      case "÷":
        return prev / next;
      default:
        return next;
    }
  };

  const handleEquals = () => {
    if (prevValue === null || operation === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = calculate(prevValue, inputValue, operation);

    setDisplay(String(result));
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  return (
    <div className={styles.calculadora}>
      <div className={styles.display}>{display}</div>
      <div className={styles.buttons}>
        <button onClick={clearDisplay} className={styles.buttonSpecial}>
          C
        </button>
        <button
          onClick={() => performOperation("÷")}
          className={styles.buttonOperator}
        >
          ÷
        </button>
        <button
          onClick={() => performOperation("×")}
          className={styles.buttonOperator}
        >
          ×
        </button>
        <button
          onClick={() => performOperation("-")}
          className={styles.buttonOperator}
        >
          −
        </button>

        <button onClick={() => inputDigit(7)}>7</button>
        <button onClick={() => inputDigit(8)}>8</button>
        <button onClick={() => inputDigit(9)}>9</button>
        <button
          onClick={() => performOperation("+")}
          className={`${styles.buttonOperator} ${styles.buttonTall}`}
        >
          +
        </button>

        <button onClick={() => inputDigit(4)}>4</button>
        <button onClick={() => inputDigit(5)}>5</button>
        <button onClick={() => inputDigit(6)}>6</button>

        <button onClick={() => inputDigit(1)}>1</button>
        <button onClick={() => inputDigit(2)}>2</button>
        <button onClick={() => inputDigit(3)}>3</button>
        <button onClick={handleEquals} className={styles.buttonEqual}>
          =
        </button>

        <button onClick={() => inputDigit(0)} className={styles.buttonZero}>
          0
        </button>
        <button onClick={inputDot}>.</button>
      </div>
    </div>
  );
}
