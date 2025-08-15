import React from "react";
import useFetch from "../hooks/useFetch";

const HookFetch = () => {
    const { data, error, loading } = useFetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    if (loading) return <p>Loading</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Hook Fetch</h2>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Street</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(({ id, name, address }) => (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>
                                {address.street}, {address.city}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HookFetch;
