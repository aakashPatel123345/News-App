import { useState } from "react";
import axios from 'axios'

import StockNews from './StockNews';
import StockResults from './StockResults';

const StockSearch = () => {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState(null);
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!ticker.trim()) {
            setError('Please enter a ticker symbol');
            return;
        }

        setLoading(true);
        setError(null);
        setStockData(null);
        setNewsData(null);
        
        try {
            // Fetch stock data first
            const stockResponse = await axios.get(`/api/stocks/${ticker.toUpperCase()}`);
            console.log('Stock response:', stockResponse.data);
            
            if (stockResponse.data && stockResponse.data.results) {
                const stockResult = stockResponse.data.results;
                setStockData(stockResult);
                
                // Fetch news data using the company name from stock data
                if (stockResult.name) {
                    try {
                        const newsResponse = await axios.get(`/api/news/${stockResult.name}`);
                        console.log('News response:', newsResponse.data);

                        if (newsResponse.data && newsResponse.data.articles) {
                            setNewsData(newsResponse.data.articles);
                        }
                    } catch (newsErr) {
                        console.error('News error:', newsErr);
                        // Don't set error for news - it's optional
                    }
                }
            } else {
                setError('No data found for this ticker');
            }
        } catch (err) {
            console.error('Search error:', err);
            setError(err.response?.data?.message || 'Error fetching stock data');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }

    // Return UI
    return (
        <div className="main-container">
            <div className="header">
                <h1 className="stock-search-header">
                    Search for stocks using ticker symbol
                </h1>
            </div>

            <div className="search-box-container">
                <input 
                    type="text" 
                    value={ticker}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Enter ticker symbol: (e.g. AAPL, MSFT, GOOGL)"
                    className="search-box-input" 
                />

                <button 
                    className="search-button"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            {/* Stock Results */}
            <StockResults stockData={stockData} />

            {/* News Section */}
            <StockNews newsData={newsData} loading={loading} />

            {!stockData && !loading && !error && (
                <h3>Nothing being searched at the moment.</h3>
            )}
        </div>
    )
};

export default StockSearch;