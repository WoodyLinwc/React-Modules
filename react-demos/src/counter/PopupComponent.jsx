import React from "react";
import { useState } from "react";
import SimpleCounter from "./SimpleCounter";
import AutoCounter from "./AutoCounter";
import MaxCounter from "./MaxCounter";
import Counters from "./Counters";
import PersistedCounter from "./PersistedCounter";
import AsyncCounter from "./AsyncCounter";
import ThrottleCounter from "./ThrottleCounter";
import SizeCounter from "./SizeCounter";

const PopupComponent = () => {
    const [activeComponent, setActiveComponent] = useState("");
    return (
        <div>
            <button onClick={() => setActiveComponent("simpleCounter")}>
                Simple Counter
            </button>

            <button onClick={() => setActiveComponent("autoCounter")}>
                Auto Counter
            </button>

            <button onClick={() => setActiveComponent("maxCounter")}>
                Max Counter
            </button>

            <button onClick={() => setActiveComponent("counters")}>
                Counters
            </button>

            <button onClick={() => setActiveComponent("persistedCounter")}>
                Persisted Counter
            </button>

            <button onClick={() => setActiveComponent("asyncCounter")}>
                Async Counter
            </button>

            <button onClick={() => setActiveComponent("throttleCounter")}>
                Throttle Counter
            </button>

            <button onClick={() => setActiveComponent("sizeCounter")}>
                Size Counter
            </button>

            {activeComponent === "simpleCounter" && <SimpleCounter />}
            {activeComponent === "autoCounter" && <AutoCounter />}
            {activeComponent === "maxCounter" && <MaxCounter />}
            {activeComponent === "counters" && <Counters />}
            {activeComponent === "persistedCounter" && <PersistedCounter />}
            {activeComponent === "asyncCounter" && <AsyncCounter />}
            {activeComponent === "throttleCounter" && <ThrottleCounter />}
            {activeComponent === "sizeCounter" && <SizeCounter />}
        </div>
    );
};

export default PopupComponent;
