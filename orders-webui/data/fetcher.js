const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
    }
    return response.json();
};

export default fetcher;