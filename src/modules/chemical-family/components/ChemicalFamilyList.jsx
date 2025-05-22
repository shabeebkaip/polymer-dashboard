import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import ChemicalFamilyRow from "./ChemicalFamilyRow";
import PageLoader from "../../../shared/PageLoader";

const ChemicalFamilyList = () => {
  const { chemicalFamily } = useSelector((state) => state.sharedState);
  return (
    <div>
      <TableUI
        tableHeader={[
          "Name",
          "Description",
          "",
          "Actions",
        ]}
        noRecord={chemicalFamily.length === 0}
      >
        {!chemicalFamily ? (
          <tr>
            <td colSpan={4}>
              <PageLoader />
            </td>
          </tr>
        ) : (
          chemicalFamily.map((chemicalFamily, index) => {
            const isLastRow = index === chemicalFamily.length - 1;
            return (
              <ChemicalFamilyRow
                key={index}
                chemicalFamily={chemicalFamily}
                index={index}
                isLastRow={isLastRow}
              />
            );
          })
        )}
      </TableUI>
    </div>
  );
};

export default ChemicalFamilyList;
