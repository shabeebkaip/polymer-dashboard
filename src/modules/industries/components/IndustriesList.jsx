import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import IndustryRow from "./IndustryRow";

const IndustriesList = () => {
  const { industries } = useSelector((state) => state.sharedState);
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
        noRecord={industries.length === 0}
      >
        {industries?.map((industry, index) => {
          const isLastRow = index === industries.length - 1;
          return (
            <IndustryRow
              key={index}
              industry={industry}
              index={index}
              isLastRow={isLastRow}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default IndustriesList;
