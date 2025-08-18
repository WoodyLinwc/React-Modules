import React, { useEffect, useState } from "react";

const SimpleFetch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = "https://jsonplaceholder.typicode.com/users";

    useEffect(() => {
        const fetchData = async (url) => {
            setError(null);
            setLoading(true);

            try {
                const res = await fetch(url);
                if (!res.ok) {
                    // throw error
                    throw new Error(`Error fetching data: ${res.status}`);
                }
                const data = await res.json();
                setData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(url);
    }, [url]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Simple Fetch</h2>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {/* ? prevent null */}
                    {data?.map(({ id, name, email }) => (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SimpleFetch;
