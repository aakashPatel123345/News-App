import axios from 'axios';

export const getNewsData = async (req, res) => {
    const { companyName } = req.params;
    const apiKey = process.env.NEWS_API_KEY;

    console.log("Attempting to get news for company:", companyName);

    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                apiKey: apiKey,
                q: `"${companyName}"`,
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: 10,
                page: 1
            },
            timeout: 10000
        });

        if (response.data && response.data.articles && response.data.articles.length > 0) {
            console.log(`Found ${response.data.articles.length} articles for ${companyName}`);
            res.status(200).json({
                companyName: companyName,
                articles: response.data.articles
            });
        } else {
            console.log("No news articles found for company:", companyName);
            res.status(404).json({ 
                message: 'No news articles found for this company',
                companyName: companyName
            });
        }

    } catch (error) {
        console.error("Error calling News API", error)
        res.status(500).json({ message: 'Error fetching news data', error: error.message })
    }
}