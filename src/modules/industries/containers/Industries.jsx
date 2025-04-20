import ActionButton from "../../../shared/ActionButton";
import Title from "../../../shared/Title";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIndustriesApi } from "../api";
import {
  setIndustries,
  setIndustryCrud,
  setIndustryModal,
  setLoader,
  setMode,
} from "../../../slices/sharedSlice";
import IndustriesList from "../components/IndustriesList";
import PageLoader from "../../../shared/PageLoader";
import AddEditIndustries from "../components/AddEditIndustries";

const Industries = () => {
  const { loader } = useSelector((state) => state.sharedState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoader(true));
    getIndustriesApi({}).then((response) => {
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setIndustries(response.data));
      }
    });
  }, [dispatch]);
  return (
    <div>
      <Title
        title="Industries"
        description="Displaying all the categories under Industries"
        actions={
          <div className="flex items-center justify-between ">
            <ActionButton
              buttonText="Add Industry"
              handleOnClick={() => {
                dispatch(setIndustryModal(true));
                dispatch(setMode("add"));
                dispatch(setIndustryCrud({}));
              }}
              textColor="#ffffff"
              bgColor="rgb(41, 82, 255)"
              icon={"/tools/create.svg"}
            />
          </div>
        }
      />
      <div className="mt-4">{loader ? <PageLoader /> : <IndustriesList />}</div>
      <AddEditIndustries getResponseBack={() => {}} />
    </div>
  );
};

export default Industries;
