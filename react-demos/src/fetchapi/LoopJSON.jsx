import React from "react";

// json object
const staff = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    isActive: true,
    roles: ["admin", "editor"],
};
// array of json object
const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
];

const LoopJSON = () => {
    return (
        <div>
            <div>
                <h2>Loop JSON object</h2>
                <p>
                    {"{"}Object.entries(staff).map(([key, value]) {"=>"} ...)
                </p>
                <ul>
                    {Object.entries(staff).map(([key, value]) => (
                        <li key={key}>
                            {key}:{" "}
                            {Array.isArray(value)
                                ? value.join(", ")
                                : value.toString()}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Loop Array of JSON objects</h2>
                <p>{"{"}users.map(...)</p>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name}: {user.email}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LoopJSON;
