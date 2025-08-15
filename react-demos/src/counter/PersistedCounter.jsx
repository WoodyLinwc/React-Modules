import React, { useEffect, useState } from "react";

const PersistedCounter = () => {
    const [count, setCount] = useState(() => {
        // This runs ONLY on the initial render
        const saved = localStorage.getItem("counter");
        return saved ? parseInt(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem("counter", count.toString());
    }, [count]);

    const increment = () => {
        setCount((prev) => prev + 1);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div>
            <h2>Persisted Counter</h2>
            <p>{count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default PersistedCounter;
