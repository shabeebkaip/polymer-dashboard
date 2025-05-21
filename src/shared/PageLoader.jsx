// import loader from "../assets/page-loader.gif";

// const PageLoader = () => {
//   return (
//     <div className="page-loader">
//       <span>
//         <img src={loader} alt="" />
//       </span>
//     </div>
//   );
// };

// export default PageLoader;

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="shimmer shimmer-page" />
      <style>{`
        .page-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .shimmer {
          background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
          background-size: 800px 104px;
          animation: shimmer 1.2s infinite linear;
        }
        .shimmer-page {
          width: 80%;
          max-width: 600px;
          height: 300px;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;

