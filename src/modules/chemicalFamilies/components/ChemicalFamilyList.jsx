import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import ChemicalFamilyRow from "./ChemicalFamilyRow";

const ChemicalFamiliesList = () => {
  const { chemicalFamilies } = useSelector((state) => state.sharedState);
  console.log("chemicalFamilies", chemicalFamilies);
  return (
    <div>
      <TableUI
        tableHeader={[
          "Name",
          "background Image",
          "Actions",
        ]}
        noRecord={chemicalFamilies.length === 0}
      >
        {chemicalFamilies?.map((chemicalFamily, index) => {
          const isLastRow = index === chemicalFamilies.length - 1;
          return (
            <ChemicalFamilyRow
              key={index}
              chemicalFamily={chemicalFamily}
              index={index}
              isLastRow={isLastRow}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default ChemicalFamiliesList;
