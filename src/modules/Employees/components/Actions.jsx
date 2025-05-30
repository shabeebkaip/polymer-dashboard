import ActionButton from "../../../shared/ActionButton";
import addIcon from "../../../assets/create.svg";
import PropTypes from "prop-types";

const Actions = ({ handleAddEmployee }) => {
  return (
    <div className="flex items-center justify-end gap-5">
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
  handleImport: PropTypes.func,
  exportFn: PropTypes.bool,
};
export default Actions;
