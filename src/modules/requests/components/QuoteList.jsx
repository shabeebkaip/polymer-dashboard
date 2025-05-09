import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import QuoteRow from "./QuoteRow";

const QuoteList = () => {
  const { quotes } = useSelector((state) => state.requestState);
  console.log("Quotes", quotes);
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
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default QuoteList;
