import React, { useState } from "react";

const TodoInput = ({ onAdd }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // if input value is truthy
        if (inputValue.trim()) {
            onAdd(inputValue);
            setInputValue("");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new todo..."
                />
                {/* onSubmit listens for type submit */}
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
};

export default TodoInput;
