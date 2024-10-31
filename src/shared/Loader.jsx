const Loader = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div
      style={{
        border: "2px solid #f3f3f3",
        borderRadius: "50%",
        borderTop: "8px solid #3498db",
        width: "50px",
        height: "50px",
        animation: "spin 2s linear infinite",
      }}
    />
    <style>{`
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default Loader;
