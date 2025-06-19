import TableUI from "../../../shared/TableUI";
import BestDealRow from "./BestDealRow";
import PropTypes from "prop-types";

const BestDealList = ({ bestDeals, getResponseBack }) => {
  return (
    <div>
      <TableUI
        tableHeader={[
          "Product Name",
          "Offer Price",
          "Seller Name",
          "Seller Email",
          "Status",
          "Action",
          "Verification",
        ]}
        noRecord={bestDeals?.length === 0}
      >
        {bestDeals?.map((deal, index) => {
          const isLastRow = index === bestDeals.length - 1;
          return (
            <BestDealRow
              key={deal._id || index}
              deal={deal}
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

BestDealList.propTypes = {
  bestDeals: PropTypes.array.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default BestDealList;
