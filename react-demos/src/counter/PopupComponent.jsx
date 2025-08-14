import React from "react";
import { useState } from "react";
import SimpleCounter from "./SimpleCounter";
import AutoCounter from "./AutoCounter";
import MaxCounter from "./MaxCounter";

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

            {activeComponent === "simpleCounter" && <SimpleCounter />}
            {activeComponent === "autoCounter" && <AutoCounter />}
            {activeComponent === "maxCounter" && <MaxCounter />}
        </div>
    );
};

export default PopupComponent;
