// import { useSelector } from "react-redux";
// import TableUI from "../../../shared/TableUI";
// import SampleRow from "./SampleRow";
// import PropTypes from "prop-types";

// const SampleList = ({ getResponseBack }) => {
//   const { samples } = useSelector((state) => state.requestState);

//   return (
//     <div>
//       <TableUI
//         tableHeader={[
//           "Product Name",
//           "Requested By",
//           "Email",
//           "Quantity",
//           "UOM",
//           "Status",
//           "Action",
//           "Verification",
//         ]}
//         noRecord={samples?.length === 0}
//       >
//         {samples?.map((sample, index) => {
//           const isLastRow = index === samples.length - 1;
//           return (
//             <SampleRow
//               isLastRow={isLastRow}
//               sample={sample}
//               key={index}
//               index={index}
//               getResponseBack={getResponseBack}
//             />
//           );
//         })}
//       </TableUI>
//     </div>
//   );
// };

// SampleList.propTypes = {
//   getResponseBack: PropTypes.func.isRequired,
// };

// export default SampleList;

import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import SampleRow from "./SampleRow";

const SampleList = () => {
  const { samples } = useSelector((state) => state.requestState); 
  console.log("Samples", samples);

  return (
    <div>
      <TableUI
        tableHeader={[
          "Product Name",
          "Requested By",
          "Email",
          "Quantity",
          "UOM",
          "Status",
          "Action",
        ]}
        noRecord={samples?.length === 0}
      >
        {samples?.map((sample, index) => {
          const isLastRow = index === samples.length - 1;
          return (
            <SampleRow
              isLastRow={isLastRow}
              sample={sample}
              key={index}
              index={index}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default SampleList;