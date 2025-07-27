import { useState } from "react";
import axios from 'axios'

const StockSearch = () => {
    const [ticker, setTicker] = useState('');
    const [data, setData] = useState(null)

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/stocks/${ticker}`);
            console.log(response.data)
            setData(response.data.results);
        } catch (err) {
            console.error(err)
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch()
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
                value = {ticker}
                onKeyDown={handleKeyPress}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="Enter ticker symbol: (e.g. AAPL, MSFT, GOOGL)"
                className="search-box-input" />

                <button className="search-button"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>


                
            {data && (
                <div className="results-container">
                    <div className="results-information-grid">
                        
                        {data.branding.logo_url && (
                            <div className="company_logo">
                                <img src={data.branding.logo_url} alt="" />
                            </div>
                        )}
                        
                        {data.name && (
                            <div className="company_name_container">
                                <h3>Company</h3>
                                <p>{data.name}</p>
                            </div>
                        )}

                        {data.primary_exchange &&  (
                            <div className="primary_exhange">
                                <h3>Primary Exchange</h3>
                                <p>{data.primary_exchange}</p>
                            </div>
                        )}
                        


                        {data.total_employees && (
                            <div className="total_employees-data-container">
                                <h3>Total Employees</h3>
                                <p>{data.total_employees}</p>
                            </div>
                        )}
                        
                    </div>
                </div>
            )}

            {!data && (
                <h3>Nothing being searched at the moment.</h3>
            )}
        </div>
    )
};

export default StockSearch;