import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getSampleRequestApi } from "../api";

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
    </div>
  );
};

export default Sample;
