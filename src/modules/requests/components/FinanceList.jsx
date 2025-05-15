import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import FinanceRow from "./FinanceRow";

const FinanceList = ({finances, getResponseBack}) => {
  

  return (
    <div>
      <TableUI
        tableHeader={[
          "User Name",
          "Product",
          "EMI Duration",
          "Quantity",
          "Total Price",
        //   "Notes",
          "Requested On",
          "Status",
          "View",
          "Verification",
          
        ]}
        noRecord={finances?.length === 0}
      >
        {finances?.map((finance, index) => {
          const isLastRow = index === finances.length - 1;
          return (
            <FinanceRow
              isLastRow={isLastRow}
              finance={finance}
              key={index}
              index={index}
              getResponseBack={getResponseBack}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default FinanceList;
