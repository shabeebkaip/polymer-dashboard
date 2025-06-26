import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import ShippingMethodRow from "./shippingMethodRow";

const ShippingMethodList = () => {
  const { shippingMethod } = useSelector((state) => state.sharedState);

  return (
    <div>
      <TableUI
        tableHeader={["Name", "Description", "", "Actions"]}
        noRecord={shippingMethod.length === 0}
      >
        {shippingMethod?.map((item, index) => (
          <ShippingMethodRow
            key={index}
            shippingMethod={item}
            index={index}
            isLastRow={index === shippingMethod.length - 1}
          />
        ))}
      </TableUI>
    </div>
  );
};

export default ShippingMethodList;
