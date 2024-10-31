import ActionButton from "../../../shared/ActionButton";
import addIcon from "../../../assets/tools/create.svg";
import exportIcon from "../../../assets/tools/export.svg";
import importIcon from "../../../assets/tools/import.svg";
import PropTypes from "prop-types";

const Actions = ({ handleAddEmployee }) => {
  return (
    <div className="flex items-center gap-4">
      <ActionButton
        buttonText="Export"
        handleOnClick={() => {}}
        textColor="#000000"
        bgColor="#ffffff"
        icon={exportIcon}
      />
      <ActionButton
        buttonText="Import"
        handleOnClick={() => {}}
        textColor="#000000"
        bgColor="#ffffff"
        icon={importIcon}
      />
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
};
export default Actions;
