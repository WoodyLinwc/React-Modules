import React, { useState } from "react";

const SizeCounter = () => {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);

    const increment = () => {
        setCount((prev) => prev + step);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div>
            <h2>Size Counter</h2>
            <input
                type="number"
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
            />
            <p>{count}</p>

            <button onClick={increment}>Increment</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default SizeCounter;
