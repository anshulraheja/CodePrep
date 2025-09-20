import { useState } from 'react';

function MultiStepper({ steps, defaultActive, unmountOnHide, setDefaultActive }) {
  const TOTAL_STEPS = steps.length;

  const [currentStep, setCurrentStep] = useState(defaultActive);

  const handlePrevButton = () => {


  };

  const handleNextButton = () => {};

  return (
    <div>
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
        return (
          <span>
            <button>Step{index + 1}</button>
          </span>
        );
      })}

      <div>
        <button onClick={handlePrevButton} disabled={currentStep === 1}>Prev</button>
        <button onClick={handleNextButton} disabled={currentStep === TOTAL_STEPS-1}>Next</button>
      </div>
    </div>
  );
}

export default MultiStepper;
