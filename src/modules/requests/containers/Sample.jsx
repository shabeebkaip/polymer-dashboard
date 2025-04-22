import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getSampleRequestApi } from "../api";
import SampleList from "../components/SampleList";
import SampleModal from "../components/SampleModal";

const Sample = () => {
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
      <div className="mt-4">
        <SampleList />
      </div>
      <SampleModal />
    </div>
  );
};

export default Sample;
