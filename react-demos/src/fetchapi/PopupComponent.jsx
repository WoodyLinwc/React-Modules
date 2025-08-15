import React, { useState } from "react";
import SimpleFetch from "./SimpleFetch";

const PopupComponent = () => {
    const [activeComponent, setActiveComponent] = useState("");

    return (
        <div>
            <button onClick={() => setActiveComponent("simpleFetch")}>
                Simple Fetch
            </button>

            {activeComponent === "simpleFetch" && <SimpleFetch />}
        </div>
    );
};

export default PopupComponent;
