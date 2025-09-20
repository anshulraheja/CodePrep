import { useState } from 'react';
import MultiStepper from './MultiStepper';

function Step1() {
  return <h1>Step 1</h1>;
}
function Step2() {
  return <h1>Step 1</h1>;
}
function Step3() {
  return <h1>Step 1</h1>;
}

function MultiStepperComponent() {
  const [defaultActive, setDefaultActive] = useState(2);
  return (
    <MultiStepper
      steps={[<Step1 />, <Step2 />, <Step3 />]}
      defaultActive={defaultActive}
      unmountOnHide={false}
      setDefaultActive={setDefaultActive}
    />
  );
}

export default MultiStepperComponent;
