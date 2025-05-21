// import { Button, CircularProgress } from "@mui/material";
// import PropTypes from "prop-types";

// const DialogActionButtons = ({ closeModal, mode, handleSave, loader }) => {
//   return (
//     <>
//       {mode === "view" ? (
//         <Button onClick={() => closeModal()} color="primary" variant="outlined">
//           Close
//         </Button>
//       ) : (
//         <>
//           <Button
//             onClick={() => {
//               handleSave();
//             }}
//             color="primary"
//             variant="contained"
//           >
//             {loader ? (
//               <CircularProgress size="30px" style={{ color: "#ffffff" }} />
//             ) : (
//               "Save"
//             )}
//           </Button>
//           <Button
//             onClick={() => closeModal()}
//             color="error"
//             variant="contained"
//           >
//             Cancel
//           </Button>
//         </>
//       )}
//     </>
//   );
// };

// DialogActionButtons.propTypes = {
//   closeModal: PropTypes.func.isRequired,
//   mode: PropTypes.string.isRequired,
//   handleSave: PropTypes.func.isRequired,
//   loader: PropTypes.bool.isRequired,
// };

// export default DialogActionButtons;  

import PropTypes from "prop-types";

const DialogActionButtons = ({ closeModal, mode, handleSave, loader }) => {
  return (
    <>
      {mode === "view" ? (
        <button onClick={() => closeModal()} className="btn outlined">
          Close
        </button>
      ) : (
        <>
          <button onClick={() => handleSave()} className="btn filled">
            {loader ? (
              <span className="shimmer shimmer-btn" />
            ) : (
              "Save"
            )}
          </button>
          <button onClick={() => closeModal()} className="btn error">
            Cancel
          </button>
        </>
      )}

      <style>{`
        .btn {
          padding: 8px 16px;
          margin-right: 10px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }
        .filled {
          background-color: #1976d2;
          color: white;
          border: none;
        }
        .outlined {
          background: white;
          border: 1px solid #1976d2;
          color: #1976d2;
        }
        .error {
          background-color: #d32f2f;
          color: white;
          border: none;
        }
        .shimmer {
          background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
          background-size: 800px 104px;
          animation: shimmer 1.2s infinite linear;
        }
        .shimmer-btn {
          display: inline-block;
          width: 60px;
          height: 20px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

DialogActionButtons.propTypes = {
  closeModal: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
};

export default DialogActionButtons;

