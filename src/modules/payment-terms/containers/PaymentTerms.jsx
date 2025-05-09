import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModal,
  setLoader,
  setMode,
  setPageTitle,
  setPaymentTermsCrud,
  setPaymentTermsModal,
} from "../../../slices/sharedSlice";
import { deletePaymentTermsApi, getPaymentTermsApi } from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import PaymentTermsList from "../components/PaymentTermsList";
import PageLoader from "../../../shared/PageLoader";
import AddEditPaymentTerms from "../components/AddEditPaymentTerms";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";

const PaymentTerms = () => {
  const dispatch = useDispatch();
  const { loader, PaymentTermsModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchProducts = useCallback(() => {
    dispatch(getPaymentTermsApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Payment Terms"));
    fetchProducts();
  }, [dispatch, fetchProducts]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    deletePaymentTermsApi(deleteId)
      .then((response) => {
        if (response.success) {
          dispatch(setDeleteModal(false));
          enqueueSnackbar(response?.message, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting Payment Terms:", error);
      })
      .finally(() => {
        dispatch(setLoader(false));
        fetchProducts();
      });
  };

  return (
    <div>
      <Title
        title="Payment Terms"
        description="Displaying all the Payment Terms"
        actions={
          <div className="flex items-center justify-between ">
            <ActionButton
              buttonText="Add Payment Terms"
              handleOnClick={() => {
                dispatch(setPaymentTermsModal(true));
                dispatch(setPaymentTermsCrud({}));
                dispatch(setMode("add"));
              }}
              textColor="#ffffff"
              bgColor="rgb(41, 82, 255)"
              icon={"/tools/create.svg"}
            />
          </div>
        }
      ></Title>
      {loader ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
          <PaymentTermsList />
        </div>
      )}
      <AddEditPaymentTerms
        open={PaymentTermsModal}
        mode="add"
        getResponseBack={() => fetchProducts()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default PaymentTerms;
