import React, { useCallback, useState } from "react";
import throttle from "lodash/throttle";

const ThrottleCounter = () => {
    const [count, setCount] = useState(0);

    // useCallback returns the same function instance across renders
    const increment = useCallback(
        throttle(
            () => {
                setCount((prev) => prev + 1);
            },
            3000,
            { trailing: false }
        ),
        []
    );

    return (
        <div>
            <h2>Throttle Counter</h2>
            <p>{count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};

export default ThrottleCounter;
