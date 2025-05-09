import ActionButton from "../../../shared/ActionButton";
import Title from "../../../shared/Title";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteIndustryApi, getIndustriesApi } from "../api";
import {
  setDeleteModal,
  setIndustryCrud,
  setIndustryModal,
  setLoader,
  setMode,
  setPageTitle,
} from "../../../slices/sharedSlice";
import IndustriesList from "../components/IndustriesList";
import PageLoader from "../../../shared/PageLoader";
import AddEditIndustries from "../components/AddEditIndustries";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";

const Industries = () => {
  const { loader, deleteId } = useSelector((state) => state.sharedState);
  const dispatch = useDispatch();
  const fetchIndustries = useCallback(() => {
    dispatch(setPageTitle("Industries"));
    dispatch(getIndustriesApi());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    deleteIndustryApi(deleteId)
      .then((response) => {
        if (response.success) {
          dispatch(setDeleteModal(false));
          fetchIndustries();
          enqueueSnackbar(response?.message, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        } else {
          enqueueSnackbar(response?.message, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      })
      .catch(() => {
        dispatch(setLoader(false));
        enqueueSnackbar("Error deleting industry", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    fetchIndustries();
  }, [fetchIndustries]);
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
      <AddEditIndustries getResponseBack={fetchIndustries} />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default Industries;
