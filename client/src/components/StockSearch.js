import { useState } from "react";
import axios from 'axios'

const StockSearch = () => {
    const [ticker, setTicker] = useState('');
    const [data, setData] = useState(null)

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/stocks/${ticker}`);
            setData(response.data)
        } catch (err) {
            console.error(err)
        }
    };

    return (
    <div className="p-4">
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter stock ticker"
        className="border p-2"
      />
      <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white p-2">Search</button>
      <pre className="mt-4 bg-gray-100 p-4">{data && JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default StockSearch;