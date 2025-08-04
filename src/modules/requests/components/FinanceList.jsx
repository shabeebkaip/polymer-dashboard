import PropTypes from "prop-types";
import TableUI from "../../../shared/TableUI";
import FinanceRow from "./FinanceRow";

const FinanceList = ({ finances, getResponseBack }) => {
  return (
    <div>
      <TableUI
        tableHeader={[
          "User Name",
          "Product",
          "EMI Duration",
          "Quantity",
          //   "Notes",
          "Requested On",
          "Status",
          "View",
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

FinanceList.propTypes = {
  finances: PropTypes.arrayOf(PropTypes.object),
  getResponseBack: PropTypes.func,
};

FinanceList.defaultProps = {
  finances: [],
  getResponseBack: () => {},
};

export default FinanceList;
