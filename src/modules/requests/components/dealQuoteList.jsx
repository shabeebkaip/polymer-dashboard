import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import DealQuoteRow from "./dealQuoteRow";
import PropTypes from "prop-types";

const DealQuoteList = ({ getResponseBack }) => {
  const { dealQuotes } = useSelector((state) => state.requestState); // ✅ Same like bulkOrders

  return (
    <div>
      <TableUI
        tableHeader={[
          "Product Name",
          "Buyer Name",
          "Email",
          "Desired Qty",
          "Shipping Country",
          "Payment Terms",
          "Status",
          "Action",
          "Verification" // ✅ For admin toggle switch
        ]}
        noRecord={dealQuotes?.length === 0}
      >
        {dealQuotes?.map((quote, index) => {
          const isLastRow = index === dealQuotes.length - 1;
          return (
            <DealQuoteRow
              key={quote._id || index}
              quote={quote}
              index={index}
              isLastRow={isLastRow}
              getResponseBack={getResponseBack} // ✅ Pass refresh function
            />
          );
        })}
      </TableUI>
    </div>
  );
};

DealQuoteList.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default DealQuoteList;
