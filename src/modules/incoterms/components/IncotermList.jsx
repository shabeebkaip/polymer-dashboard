import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import IncotermRow from "./IncotermRow";

const IncotermList = () => {
  const { incoterms } = useSelector((state) => state.sharedState);
  console.log("incoterm", incoterms);
  return (
    <div>
      <TableUI
        tableHeader={[
          "Name",
          "Description",
          "",
          "Actions",
        ]}
        noRecord={incoterms.length === 0}
      >
        {incoterms?.map((incoterms, index) => {
          const isLastRow = index === incoterms.length - 1;
          return (
            <IncotermRow
              key={index}
              incoterm={incoterms}
              index={index}
              isLastRow={isLastRow}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default IncotermList;
