import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import QuoteRow from "./QuoteRow";
import PropTypes from "prop-types";

const QuoteList = ({ getResponseBack }) => {
  const { quotes } = useSelector((state) => state.requestState);

  return (
    <div>
      <TableUI
        tableHeader={[
          "Product Name",
          "Requested By",
          "Email",
          "Quantity",
          "UOM",
          "Status",
          "Action",
          "Verification", // Add header
        ]}
        noRecord={quotes?.length === 0}
      >
        {quotes?.map((quote, index) => {
          const isLastRow = index === quotes.length - 1;
          return (
            <QuoteRow
              isLastRow={isLastRow}
              quote={quote}
              key={index}
              index={index}
              getResponseBack={getResponseBack} // Pass handler
            />
          );
        })}
      </TableUI>
    </div>
  );
};

QuoteList.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default QuoteList;
