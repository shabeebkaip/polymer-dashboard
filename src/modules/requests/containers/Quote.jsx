import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getQuoteRequestApi } from "../api";
import QuoteList from "../components/QuoteList";
import QuoteModal from "../components/QuoteModal";
import PageLoader from "../../../shared/PageLoader";

const Quote = () => {
  const { loader } = useSelector((state) => state.sharedState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Quote Enquiries"));
  });
  useEffect(() => {
    dispatch(getQuoteRequestApi());
  }, [dispatch]);
  return (
    <div>
      <Title
        title="Quote Enquiries"
        description="Display all the Quote Requests"
      />
      <div className="mt-4">{loader ? <PageLoader /> : <QuoteList />}</div>

      <QuoteModal />
    </div>
  );
};

export default Quote;
