import React from "react";
import { useState } from "react";

const SimpleCounter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount((prev) => prev + 1);
    };

    const decrement = () => {
        setCount((prev) => prev - 1);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div>
            <h2>Simple Counter</h2>
            <p>{count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default SimpleCounter;
