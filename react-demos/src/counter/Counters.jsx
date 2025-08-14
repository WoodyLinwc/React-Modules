import React, { useState } from "react";

const initialCounters = {
    "Counter 1": 0,
    counter2: 0,
};

const Counters = () => {
    const [counts, setCounts] = useState(initialCounters);

    const increment = (counter) => {
        setCounts((prev) => ({
            ...prev,
            [counter]: prev[counter] + 1,
        }));
    };

    const resetAll = () => {
        setCounts(initialCounters);
    };

    const reset = (counter) => {
        setCounts((prev) => ({
            ...prev,
            [counter]: 0,
        }));
    };

    return (
        <div>
            <h2>Counters</h2>
            <button onClick={resetAll}>Reset All</button>
            {Object.entries(counts).map(([counter, count]) => (
                <div key={counter}>
                    <p>
                        {counter} : {count}
                    </p>
                    <button onClick={() => increment(counter)}>
                        Increment
                    </button>
                    <button onClick={() => reset(counter)}>Reset</button>
                </div>
            ))}
        </div>
    );
};

export default Counters;
