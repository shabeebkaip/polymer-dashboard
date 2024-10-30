import ActionButton from "../../../shared/ActionButton";
import addIcon from "../../../assets/tools/create.svg";
import exportIcon from "../../../assets/tools/export.svg";
import importIcon from "../../../assets/tools/import.svg";

const Actions = () => {
  const handleAddEmployee = () => {};
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

export default Actions;
