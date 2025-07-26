import TableUI from "../../../shared/TableUI";
import propTypes from "prop-types";
import ProductRow from "./ProductRow";

const ProductsList = ({ products }) => {
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <div className="rounded-xl shadow-lg border border-emerald-300 bg-white/80 backdrop-blur-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-emerald-700 tracking-tight">Products</h2>
        {/* Add any header actions here if needed */}
      </div>
      <TableUI
        tableHeader={["Product", "Chemical Name", "Industry", "Product Price", "Company logo", "Action"]}
        data={products}
        className="text-sm font-medium text-gray-700"
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
            <td colSpan={6} className="py-8 text-center text-gray-400 text-base font-semibold">
              No products available.
            </td>
          </tr>
        )}
      </TableUI>
    </div>
  );
};

ProductsList.propTypes = {
  products: propTypes.array.isRequired,
};

export default ProductsList;
