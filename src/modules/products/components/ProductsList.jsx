import TableUI from "../../../shared/TableUI";
import propTypes from "prop-types";
import ProductRow from "./ProductRow";

const ProductsList = ({ products }) => {
  return (
    <TableUI
      tableHeader={["Product", "Chemical Name", "Industry", "Product Family", "Action"]}
      data={products}
    >
      {products?.map((product, index) => {
        const isLastRow = index === products.length - 1;
        return (
          <ProductRow
            product={product}
            key={index}
            index={index}
            isLastRow={isLastRow}
          />
        );
      })}
    </TableUI>
  );
};
ProductsList.propTypes = {
  products: propTypes.array.isRequired,
};

export default ProductsList;
