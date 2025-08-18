import React, { useState } from "react";

const SimpleForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Name: ${name} \nEmail: ${email}`);
        setName("");
        setEmail("");
    };

    return (
        <div>
            <h2>Simple Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SimpleForm;
