import TableUI from "../../../shared/TableUI";
import SupplierOfferRow from "./supplierOfferRow";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SupplierOfferList = ({ getResponseBack }) => {
  const { supplierOffers } = useSelector((state) => state.requestState);

  return (
    <div>
      <TableUI
        tableHeader={[
          "Product Name",
          "Price/Unit",
          "Available Qty",
          "Delivery (Days)",
          "Incoterm & Packaging",
          "Message",
          "Supplier Name",
          "Supplier Email",
          "Status",
          "Action"
        ]}
        noRecord={supplierOffers?.length === 0}
      >
        {supplierOffers?.map((offer, index) => {
          const isLastRow = index === supplierOffers.length - 1;
          return (
            <SupplierOfferRow
              key={offer._id || index}
              offer={offer}
              index={index}
              isLastRow={isLastRow}
              getResponseBack={getResponseBack}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

SupplierOfferList.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default SupplierOfferList;
