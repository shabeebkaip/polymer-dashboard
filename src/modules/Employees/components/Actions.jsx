import ActionButton from "../../../shared/ActionButton";
import addIcon from "../../../assets/tools/create.svg";
import exportIcon from "../../../assets/tools/export.svg";
import importIcon from "../../../assets/tools/import.svg";
import PropTypes from "prop-types";

const Actions = ({ handleAddEmployee, handleExport, handleImport, fileInputRef }) => {
  return (
    <div className="flex items-center gap-5">
      <ActionButton
        buttonText="Export"
        handleOnClick={() => {
          handleExport();
        }}
        textColor="#000000"
        bgColor="#ffffff"
        icon={exportIcon}
      />
      {
        <div className="relative cursor-pointer">
          <ActionButton
            buttonText="Import"
            handleOnClick={() => {}}
            textColor="#000000"
            bgColor="#ffffff"
            icon={importIcon}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            className="absolute top-0 w-32 h-10 opacity-0 cursor-pointer " // Hidden file input
          />
        </div>
      }
      <ActionButton
        buttonText="Add Employee"
        handleOnClick={() => handleAddEmployee()}
        textColor="#ffffff"
        bgColor="rgb(41, 82, 255)"
        icon={addIcon}
      />
    </div>
  );
};
Actions.propTypes = {
  handleAddEmployee: PropTypes.func,
  handleExport: PropTypes.func,
};
export default Actions;
