import React, { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // cancelling fetch when component unmount
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setError(null);
            setLoading(true);
            try {
                const res = await fetch(url, { signal });
                if (!res.ok) {
                    throw new Error(`Error fetching: ${res.status}`);
                }
                const data = await res.json();
                setData(data);
            } catch (error) {
                // Abort Error
                if (error.name === "AbortError") return;
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, error, loading };
};

export default useFetch;
