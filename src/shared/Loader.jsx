// const Loader = () => (
//   <div className="flex items-center justify-center w-full h-full">
//     <div
//       style={{
//         border: "2px solid #f3f3f3",
//         borderRadius: "50%",
//         borderTop: "8px solid #3498db",
//         width: "50px",
//         height: "50px",
//         animation: "spin 2s linear infinite",
//       }}
//     />
//     <style>{`
//       @keyframes spin {
//         0% {
//           transform: rotate(0deg);
//         }
//         100% {
//           transform: rotate(360deg);
//         }
//       }
//     `}</style>
//   </div>
// );

// export default Loader;  

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="shimmer shimmer-box" />
      <style>{`
        .loader-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .shimmer {
          background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
          background-size: 800px 104px;
          animation: shimmer 1.2s infinite linear;
        }
        .shimmer-box {
          width: 300px;
          height: 100px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default Loader;

