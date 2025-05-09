import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import PackagingTypeRow from "./GradeRow";

const PackagingTypeList = () => {
  const { grade } = useSelector((state) => state.sharedState);
  console.log("grade", grade);
  return (
    <div>
      <TableUI
        tableHeader={[
          "Name",
          "Description",
          "",
          "Actions",
        ]}
        noRecord={grade.length === 0}
      >
        {grade?.map((grade, index) => {
          const isLastRow = index === grade.length - 1;
          return (
            <PackagingTypeRow
              key={index}
              grade={grade}
              index={index}
              isLastRow={isLastRow}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default PackagingTypeList;
