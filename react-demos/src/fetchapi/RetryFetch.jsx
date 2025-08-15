import React, { useEffect, useState } from "react";

const RetryFetch = ({ maxRetry = 3, delay = 2000 }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = "https://jsonplaceholder.typicode.com/users";

    useEffect(() => {
        // cancelling the fetch when the component unmounts.
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async (attempt = 0) => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(url, { signal });
                if (!res.ok) {
                    throw new Error(`Error Fetching ${res.status}`);
                }
                const data = await res.json();

                setData(data);
                setLoading(false);
            } catch (error) {
                // check error name
                if (error.name === "AbortError") return;

                if (attempt < maxRetry) {
                    setTimeout(() => {
                        fetchData(attempt + 1);
                    }, delay);
                } else {
                    setError(error.message);
                    setLoading(false);
                }
            }
        };

        fetchData();

        // clean up
        return () => {
            controller.abort();
        };
    }, [url, maxRetry, delay]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Retry Fetch</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
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

export default RetryFetch;
