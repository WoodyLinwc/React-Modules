import React, { useState } from "react";
import SimpleForm from "./SimpleForm";

const PopupComponent = () => {
    const [activeComponent, setActiveComponent] = useState("");
    return (
        <div>
            <button onClick={() => setActiveComponent("simpleForm")}>
                Simple Form
            </button>

            {activeComponent === "simpleForm" && <SimpleForm />}
        </div>
    );
};

export default PopupComponent;
