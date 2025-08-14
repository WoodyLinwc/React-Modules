import React from "react";
import { useState } from "react";
import SimpleCounter from "./SimpleCounter";
import AutoCounter from "./AutoCounter";
import MaxCounter from "./MaxCounter";
import Counters from "./Counters";

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

            {activeComponent === "simpleCounter" && <SimpleCounter />}
            {activeComponent === "autoCounter" && <AutoCounter />}
            {activeComponent === "maxCounter" && <MaxCounter />}
            {activeComponent === "counters" && <Counters />}
        </div>
    );
};

export default PopupComponent;
