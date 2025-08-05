const StockNews = ({ newsData, loading }) => {

    if (loading) {
        return (
            <div className="news-loading">
                <div className="loading-spinner"></div>
                <p>Loading news...</p>
            </div>
        );
    }

    if (!newsData || newsData.length === 0) {
        return null;
    }

    // Limit to 9 articles for 3x3 grid
    const limitedNews = newsData.slice(0, 9);

    return (
        <div className="news-section">
            <div className="news-header">
                <h2>Latest News</h2>
                <p>Recent articles about this company</p>
            </div>
            
            <div className="news-grid">
                {limitedNews.map((article, index) => (
                    <div key={index} className="news-card">
                        {article.urlToImage && (
                            <div className="news-image">
                                <img 
                                    src={article.urlToImage} 
                                    alt={article.title}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                        
                        <div className="news-content">
                            <h3 className="news-title">
                                <a 
                                    href={article.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    {article.title}
                                </a>
                            </h3>
                            
                            {article.description && (
                                <p className="news-description">
                                    {article.description.length > 120 
                                        ? `${article.description.substring(0, 120)}...` 
                                        : article.description
                                    }
                                </p>
                            )}
                            
                            <div className="news-meta">
                                {article.source?.name && (
                                    <span className="news-source">{article.source.name}</span>
                                )}
                                {article.publishedAt && (
                                    <span className="news-date">
                                        {new Date(article.publishedAt).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockNews;