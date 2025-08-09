const StockResults = ({ stockData }) => {
  if (!stockData) return null;

  return (
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

        {typeof stockData.total_employees === 'number' && (
          <div className="total_employees-data-container">
            <h3>Total Employees</h3>
            <p>{stockData.total_employees.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockResults;