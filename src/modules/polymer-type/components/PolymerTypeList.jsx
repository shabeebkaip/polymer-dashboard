import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import PolymerTypeRow from "./PolymerTypeRow";

const PolymerTypeList = () => {
  const { polymerType } = useSelector((state) => state.sharedState);
  console.log("polymerType", polymerType);
  return (
    <div>
      <TableUI
        tableHeader={[
          "Name",
          "Description",
          "",
          "Actions",
        ]}
        noRecord={polymerType.length === 0}
      >
        {polymerType?.map((polymerType, index) => {
          const isLastRow = index === polymerType.length - 1;
          return (
            <PolymerTypeRow
              key={index}
              polymerType={polymerType}
              index={index}
              isLastRow={isLastRow}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default PolymerTypeList;
