import React, { useState } from "react";

const MaxCounter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        if (count >= 3) {
            alert("count cannot be bigger than 3");
        } else {
            setCount((prev) => prev + 1);
        }
    };

    const decrement = () => {
        setCount((prev) => prev - 1);
    };

    return (
        <div>
            <h2>Max Counter</h2>
            <p>{count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement} disabled={count <= 0}>
                Decrement
            </button>
        </div>
    );
};

export default MaxCounter;
