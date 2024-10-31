import loader from "../assets/page-loader.gif";

const PageLoader = () => {
  return (
    <div className="page-loader">
      <span>
        <img src={loader} alt="" />
      </span>
    </div>
  );
};

export default PageLoader;
