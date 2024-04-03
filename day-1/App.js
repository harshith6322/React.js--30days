import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [test, setTest] = useState({ name: "harshith" });
  const [open, setOpen] = useState(true);

  function handlePre() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
    setTest({ name: "sai" });
  }

  return (
    <div>
      <div className="close" onClick={() => setOpen((s) => !s)}>
        &times;
      </div>
      {open && (
        <div className="steps">
          <div className="numbers">
            <div className={step === 1 ? "active" : ""}>1</div>
            <div className={step === 2 ? "active" : ""}>2</div>
            <div className={step === 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            step {step}: {messages[step - 1]} {test.name}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePre}
            >
              previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              next
            </button>
            <div className="close" onClick={() => setOpen((s) => !s)}>
              &times;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
