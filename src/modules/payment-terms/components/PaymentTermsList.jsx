import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import PaymentTermsRow from "./paymentTermsRow";

const PaymentTermsList = () => {
  const { paymentTerms } = useSelector((state) => state.sharedState);
  console.log("PaymentTerms", paymentTerms);
  return (
    <div>
      <TableUI
        tableHeader={[
          "Name",
          "Description",
          "",
          "Actions",
        ]}
        noRecord={paymentTerms.length === 0}
      >
        {paymentTerms?.map((paymentTerms, index) => {
          const isLastRow = index === paymentTerms.length - 1;
          return (
            <PaymentTermsRow
              key={index}
              PaymentTerms={paymentTerms}
              index={index}
              isLastRow={isLastRow}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default PaymentTermsList;
