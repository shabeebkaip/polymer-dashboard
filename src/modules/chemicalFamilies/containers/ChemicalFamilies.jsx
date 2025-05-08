import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setChemicalFamilyCrud,
    setChemicalFamilyModal,
    setDeleteModal,
    setLoader,
    setMode,
    setPageTitle,
} from "../../../slices/sharedSlice";
import { deleteChemicalFamilyApi, getChemicalFamiliesApi } from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import PageLoader from "../../../shared/PageLoader";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import ChemicalFamiliesList from "../components/ChemicalFamilyList";
import AddEditChemicalFamily from "../components/AddEditChemicalFamily";

const ChemicalFamilies = () => {
    const dispatch = useDispatch();
    const { loader, chemicalFamilyModal, deleteId } = useSelector(
        (state) => state.sharedState
    );

    const fetchChemicals = useCallback(() => {
        dispatch(getChemicalFamiliesApi());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setLoader(true));
        dispatch(setPageTitle("Chemical Families"));
        fetchChemicals();
    }, [dispatch, fetchChemicals]);

    const handleDelete = () => {
        dispatch(setLoader(true));
        deleteChemicalFamilyApi(deleteId)
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
                console.error("Error deleting Chemical family:", error);
            })
            .finally(() => {
                dispatch(setLoader(false));
                fetchChemicals();
            });
    };

    return (
        <div>
            <Title
                title="Chemical Families"
                description="Displaying all the Chemical Families"
                actions={
                    <div className="flex items-center justify-between ">
                        <ActionButton
                            buttonText="Add Chemical Family"
                            handleOnClick={() => {
                                dispatch(setChemicalFamilyModal(true));
                                dispatch(setChemicalFamilyCrud({}));
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
                    <ChemicalFamiliesList />
                </div>
            )}
            <AddEditChemicalFamily
                open={chemicalFamilyModal}
                mode="add"
                getResponseBack={() => fetchChemicals()}
            />
            <DeleteModal handleDelete={handleDelete} />
        </div>
    );
};

export default ChemicalFamilies;
