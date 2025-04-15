import ActionButton from "../../../shared/ActionButton";
import Title from "../../../shared/Title";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIndustriesApi } from "../api";
import { setIndustries } from "../../../slices/sharedSlice";
import IndustriesList from "../components/IndustriesList";

const Industries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getIndustriesApi({}).then((response) => {
      console.log("Industries response", response);
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
      />
      <div className="flex items-center justify-end p-1 mt-4 bg-white rounded-full shadow">
        <ActionButton
          buttonText="Add Industry"
          handleOnClick={() => {}}
          textColor="#ffffff"
          bgColor="rgb(41, 82, 255)"
          icon={"/tools/create.svg"}
        />
      </div>
      <div className="mt-4">
        <IndustriesList />
      </div>
    </div>
  );
};

export default Industries;
