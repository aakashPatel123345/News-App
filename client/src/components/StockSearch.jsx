import { useState } from "react";
import axios from 'axios'

const StockSearch = () => {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!ticker.trim()) {
            setError('Please enter a ticker symbol');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(`/api/stocks/${ticker.toUpperCase()}`);
            console.log('Stock response:', response.data);
            
            if (response.data && response.data.results) {
                setStockData(response.data.results);
            } else {
                setError('No data found for this ticker');
                setStockData(null);
            }
        } catch (err) {
            console.error('Search error:', err);
            setError(err.response?.data?.message || 'Error fetching stock data');
            setStockData(null);
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
                
            {stockData && (
                <div className="results-container">
                    <div className="results-information-grid">
                        
                        {stockData.branding?.logo_url && (
                            <div className="company_logo">
                                <img src={stockData.branding.logo_url} alt="Company logo" />
                            </div>
                        )}
                        
                        {stockData.name && (
                            <div className="company_name_container">
                                <h3>Company</h3>
                                <p>{stockData.name}</p>
                            </div>
                        )}

                        {stockData.primary_exchange && (
                            <div className="primary_exhange">
                                <h3>Primary Exchange</h3>
                                <p>{stockData.primary_exchange}</p>
                            </div>
                        )}

                        {stockData.total_employees && (
                            <div className="total_employees-data-container">
                                <h3>Total Employees</h3>
                                <p>{stockData.total_employees.toLocaleString()}</p>
                            </div>
                        )}
                        
                    </div>
                </div>
            )}

            {!stockData && !loading && !error && (
                <h3>Nothing being searched at the moment.</h3>
            )}
        </div>
    )
};

export default StockSearch;