import { useState } from 'react';
import './MultiStepper.css';

/**
 This component needs to be changed
 It should only accepts component and render the UI for moving from one step to another
 Moving decision should depend on component level
 If something glbal needs to be saved then maintain a context or redux

 */
// Types
interface Step {
    id: string;
    title: string;
    component: React.ComponentType<any>;
}

interface MultiStepperComponentProps {
    steps: Step[];
    onNext: (data) => void;
    onPrevious: (data) => void;
    onSubmit: (data) => void;
}

// Main Component
const MultiStepper = (props: MultiStepperComponentProps) => {
    const { steps, onNext, onPrevious, onSubmit } = props;

    const [selectedStep, setSelectedStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});

    const updateFormData = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleStepChange = (index: number) => {
        setSelectedStep(index);
    };

    const handlePreviousClick = async () => {
        await onPrevious?.(formData);

        setSelectedStep((prev) => Math.max(prev - 1, 0));
    };

    const handleNextClick = async () => {
        await onNext?.(formData);

        setSelectedStep((prev) => Math.min(prev + 1, steps.length));
    };

    if (!steps?.length) {
        return <div>No steps available</div>;
    }

    const CurrentStep = steps[selectedStep].component;

    return (
        <div>
            <div className="step-container">
                {steps.map((step, index: number) => {
                    return (
                        <button
                            key={index}
                            className={`btn ${selectedStep === index ? 'selected-btn' : ''}`}
                            onClick={() => handleStepChange(index)}
                            aria-current={selectedStep === index ? 'step' : undefined}
                        >
                            {step?.title}
                        </button>
                    );
                })}
            </div>
            <div>
                <CurrentStep data={formData} onChange={updateFormData} />
            </div>
            <div>
                {selectedStep > 0 && <button onClick={handlePreviousClick}>Prev</button>}
                {selectedStep < steps.length - 1 && <button onClick={handleNextClick}>Next</button>}
            </div>
        </div>
    );
};
export default MultiStepper;
