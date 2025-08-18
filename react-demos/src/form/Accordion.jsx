import React, { useState } from "react";

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                {title} {isOpen ? "▲" : "▼"}
            </button>
            {isOpen && <div>{children}</div>}
        </div>
    );
};

export default Accordion;
