import TableUI from "../../../shared/TableUI";
import propTypes from "prop-types";
import ProductRow from "./ProductRow";

const ProductsList = ({ products }) => {
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <TableUI
      tableHeader={["Product", "Chemical Name", "Industry", "Product Price", "Company logo", "Action"]}
      data={products}
    >
      {hasProducts ? (
        products.map((product, index) => {
          const isLastRow = index === products.length - 1;
          return (
            <ProductRow
              product={product}
              key={index}
              index={index}
              isLastRow={isLastRow}
            />
          );
        })
      ) : (
        <tr>
          <td colSpan={6} className="text-center py-6 text-gray-500">
            No products available.
          </td>
        </tr>
      )}
    </TableUI>
  );
};

ProductsList.propTypes = {
  products: propTypes.array.isRequired,
};

export default ProductsList;
