import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import PhysicalFormRow from "./PhysicalFormRow";

const PhysicalFormList = () => {
  const { physicalForm } = useSelector((state) => state.sharedState);
  return (
    <div>
      <TableUI
        tableHeader={[
          "Name",
          "Description",
          "",
          "Actions",
        ]}
        noRecord={physicalForm.length === 0}
      >
        {physicalForm?.map((physicalForm, index) => {
          const isLastRow = index === physicalForm.length - 1;
          return (
            <PhysicalFormRow
              key={index}
              physicalForm={physicalForm}
              index={index}
              isLastRow={isLastRow}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default PhysicalFormList;
