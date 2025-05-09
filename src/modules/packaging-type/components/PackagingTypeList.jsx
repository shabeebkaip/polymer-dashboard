import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import PackagingTypeRow from "./PackagingTypeRow";

const PackagingTypeList = () => {
  const { packagingType } = useSelector((state) => state.sharedState);
  console.log("packagingType", packagingType);
  return (
    <div>
      <TableUI
        tableHeader={[
          "Name",
          "Description",
          "",
          "Actions",
        ]}
        noRecord={packagingType.length === 0}
      >
        {packagingType?.map((packagingType, index) => {
          const isLastRow = index === packagingType.length - 1;
          return (
            <PackagingTypeRow
              key={index}
              packagingType={packagingType}
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
