// This file containes the controller for getting stock data from the polygon API
import axios from 'axios';

export const getStockData = async (req, res) => {
    const { ticker } = req.params;
    const apiKey = process.env.POLYGON_API_KEY;

    // Add this debug line
    console.log("API Key exists:", !!apiKey);
    console.log("Attempting to getStockData with ticker: " + ticker);

    try {
        const response = await axios.get(`https://api.polygon.io/v3/reference/tickers/${ticker.toUpperCase()}`, {
            params: {
                apikey: apiKey
            },
        });
        if (response.data && response.data.results) {
            res.status(200).json(response.data);
        } else {
            res.status(404).json({ message: 'Ticker not found' });
        }
    } catch (error) {
        console.error("Error calling Polygon API:", error);
        res.status(500).json({ message: 'Error fetching stock data', error: error.message });
    }
}