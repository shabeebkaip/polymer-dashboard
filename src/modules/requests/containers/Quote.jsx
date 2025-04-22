import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getQuoteRequestApi } from "../api";
import QuoteList from "../components/QuoteList";
import QuoteModal from "../components/QuoteModal";

const Quote = () => {
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
      <div className="mt-4">
        <QuoteList />
      </div>
      <QuoteModal />
    </div>
  );
};

export default Quote;
