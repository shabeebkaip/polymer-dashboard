import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import DealQuoteRow from "./dealQuoteRow";
import PropTypes from "prop-types";

const DealQuoteList = ({ getResponseBack }) => {
  const { dealQuotes } = useSelector((state) => state.requestState);

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
          "Action"
          // ❌ Removed "Verification"
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
              getResponseBack={getResponseBack}
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
