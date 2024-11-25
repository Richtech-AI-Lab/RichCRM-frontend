import React, { useState } from 'react';

const OneDriveSearch = ({ getToken }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!query.trim()) {
            setError("Please enter a search term.");
            return;
        }

        setError(null);
        setLoading(true);
        setResults([]);

        try {
            const accessToken = await getToken(); // Retrieve your access token
            const searchUrl = `https://graph.microsoft.com/v1.0/me/drive/root/search(q='${encodeURIComponent(query)}')`;


            // const payload = {
            //     requests: [
            //         {
            //             entityTypes: ["driveItem"], // Modify if needed
            //             query: {
            //                 queryString: query.trim()
            //             }
            //         }
            //     ]
            // };

            const response = await fetch(searchUrl, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setError(`Error: ${errorResponse.error.message}`);
                setLoading(false);
                return;
            }

            const data = await response.json();
            setResults(data.value || []);
        } catch (err) {
            setError("Failed to perform search. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search files or folders..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>

            {loading && <div className="loading">Searching...</div>}

            {error && <div className="error-message">{error}</div>}

            <div className="search-results">
                {results.length === 0 && !loading && <p>No results found.</p>}
                {results.map((result) => (
                    <div key={result.id} className="result-item">
                        <a
                            href={result.webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {result.name}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OneDriveSearch;
