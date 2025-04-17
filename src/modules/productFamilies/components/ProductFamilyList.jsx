import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import ProductFamilyRow from "./ProductFamilyRow";

const ProductFamilyList = () => {
  const { productFamilies } = useSelector((state) => state.sharedState);
  console.log("productFamilies", productFamilies);
  return (
    <div>
      <TableUI
        tableHeader={[
          "Name",
          "Description",
          "background Image",
          "Icon",
          "Actions",
        ]}
        noRecord={productFamilies.length === 0}
      >
        {productFamilies?.map((productFamily, index) => {
          const isLastRow = index === productFamilies.length - 1;
          return (
            <ProductFamilyRow
              key={index}
              productFamily={productFamily}
              index={index}
              isLastRow={isLastRow}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default ProductFamilyList;
