import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import BulkOrderRow from "./bulkOrderRow";
import PropTypes from "prop-types";

const BulkOrderList = ({ getResponseBack }) => {
  const { bulkOrders } = useSelector((state) => state.requestState);

  return (
    <div>
      <TableUI
        tableHeader={[
          "Product Name",
          "Requested By",
          "Email",
          "Quantity",
          "UOM",
          "City",
          "Country",
          "Status",
          "Action",
          "Verification",
        ]}
        noRecord={bulkOrders?.length === 0}
      >
        {bulkOrders?.map((order, index) => {
          const isLastRow = index === bulkOrders.length - 1;
          return (
            <BulkOrderRow
              key={order._id || order.id || index}
              order={order}
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

BulkOrderList.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default BulkOrderList;