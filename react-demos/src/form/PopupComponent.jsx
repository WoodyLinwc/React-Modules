import React, { useState } from "react";
import SimpleForm from "./SimpleForm";
import Accordion from "./Accordion";

const PopupComponent = () => {
    const [activeComponent, setActiveComponent] = useState("");
    return (
        <div>
            <button onClick={() => setActiveComponent("simpleForm")}>
                Simple Form
            </button>

            <button onClick={() => setActiveComponent("accordion")}>
                Accordion
            </button>

            {activeComponent === "simpleForm" && <SimpleForm />}
            {activeComponent === "accordion" && (
                <div>
                    <Accordion title="Section 1">
                        <p>Section 1 content</p>
                    </Accordion>
                    <Accordion title="Section 2">
                        <p>Section 2 content</p>
                    </Accordion>
                </div>
            )}
        </div>
    );
};

export default PopupComponent;
