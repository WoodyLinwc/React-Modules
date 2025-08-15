import React, { useState } from "react";

const AsyncCounter = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const asyncOperation = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    };

    // async/await
    const increment = async () => {
        try {
            setLoading(true);
            await asyncOperation();
            setCount((prev) => prev + 1);
        } catch (error) {
            console.log("Error incrementing: ", error);
        } finally {
            setLoading(false);
        }
    };

    const reset = async () => {
        try {
            setLoading(true);
            await asyncOperation();
            setCount(0);
        } catch (error) {
            console.log("Error resetting: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Async Counter</h2>
            <p>{count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={reset}>Reset</button>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default AsyncCounter;
