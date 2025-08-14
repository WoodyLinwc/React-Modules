import React, { useEffect, useState } from "react";

const AutoCounter = () => {
    const [count, setCount] = useState(0);
    const [auto, setAuto] = useState(false);

    const increment = () => {
        setCount((prev) => prev + 1);
    };

    const toggle = () => {
        setAuto(!auto);
    };

    const reset = () => {
        setCount(0);
    };

    useEffect(() => {
        if (!auto) return;

        const interval = setInterval(() => {
            increment();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [auto]);

    return (
        <div>
            <h2>Auto Counter</h2>
            <p>{count}</p>
            <button onClick={toggle}>{auto ? "Stop" : "Resume"}</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default AutoCounter;
