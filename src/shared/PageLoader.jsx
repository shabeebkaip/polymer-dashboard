const PageLoader = () => {
  return (
    <div className="table-shimmer-container">
      {[...Array(8)].map((_, rowIndex) => (
        <div className="table-row-shimmer" key={rowIndex}>
          <div className="shimmer shimmer-cell wide" /> 
          <div className="shimmer shimmer-cell wide" /> 
          <div className="shimmer shimmer-cell medium" /> 
          <div className="shimmer shimmer-cell short" /> 
          <div className="shimmer shimmer-cell short" /> 
          <div className="shimmer shimmer-action" /> 
        </div>
      ))}

      <style>{`
        .table-shimmer-container {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .table-row-shimmer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background-color: #f9f9f9;
          padding: 1rem;
          border-radius: 10px;
        }

        .shimmer {
          background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
          background-size: 800px 104px;
          animation: shimmer 1.2s infinite linear;
          border-radius: 6px;
        }

        .shimmer-cell {
          height: 20px;
        }

        .shimmer-cell.wide {
          width: 180px;
        }

        .shimmer-cell.medium {
          width: 130px;
        }

        .shimmer-cell.short {
          width: 60px;
        }

        .shimmer-logo {
          width: 40px;
          height: 40px;
          border-radius: 8px;
        }

        .shimmer-action {
          width: 40px;
          height: 20px;
        }

        @keyframes shimmer {
          0% {
            background-position: -800px 0;
          }
          100% {
            background-position: 800px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;