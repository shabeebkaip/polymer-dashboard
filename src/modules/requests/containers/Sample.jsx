import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getSampleRequestApi } from "../api";
import SampleList from "../components/SampleList";
import SampleModal from "../components/SampleModal";
import PageLoader from "../../../shared/PageLoader";

const Sample = () => {
  const { loader } = useSelector((state) => state.sharedState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Sample Enquiries"));
  });
  useEffect(() => {
    dispatch(getSampleRequestApi());
  }, [dispatch]);
  return (
    <div>
      <Title
        title="Sample Enquiries"
        description="Display all the Sample Requests"
      />
      <div className="mt-4">{loader ? <PageLoader /> : <SampleList />}</div>
      <SampleModal />
    </div>
  );
};

export default Sample;
