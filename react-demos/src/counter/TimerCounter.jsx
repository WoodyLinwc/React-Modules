import React, { useEffect, useState } from "react";

const TimerCounter = ({ start = 3, delay = 1000 }) => {
    const [count, setCount] = useState(start);
    const [auto, setAuto] = useState(false);

    const decrement = () => {
        setCount((prev) => prev - 1);
    };

    const restart = () => {
        setCount(start);
    };

    useEffect(() => {
        if (!auto || count === 0) return;

        const interval = setInterval(() => {
            decrement();
        }, delay);

        return () => {
            clearInterval(interval);
        };
    }, [auto, count]);

    return (
        <div>
            <h2>Timer Counter</h2>
            <p>{count}</p>
            <button onClick={() => setAuto(!auto)}>
                {auto ? "Stop" : "Resume"}
            </button>
            <button onClick={restart}>Restart</button>
        </div>
    );
};

export default TimerCounter;
