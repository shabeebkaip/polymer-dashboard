import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import { getSupplierOffersApi } from "../api";
import SupplierOfferList from "../components/supplierOfferList";
import Title from "../../../shared/Title";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";
import SupplierOfferModal from "../components/SupplierOfferModal";

const SupplierOffer = () => {
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchOffers = (query = {}) => {
    setLoading(true);
    dispatch(getSupplierOffersApi(query))
      .then((res) => {
        if (res?.success) {
          setPagination({
            total: res.total,
            currentPage: res.page,
            totalPages: res.totalPages,
          });
        }
      })
      .catch((err) => console.error("Fetch supplier offers error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    dispatch(setPageTitle("Supplier Offer Requests"));
    fetchOffers({ page: 1 });
  }, [dispatch]);

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        title="Supplier Offer Requests"
        description="Display all the offers submitted by suppliers"
      />
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="mt-4">
            <SupplierOfferList getResponseBack={() => fetchOffers()} />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchOffers({ page })}
          />
        </>
        
      )}
      <SupplierOfferModal/>
    </div>
  );
};

export default SupplierOffer;
