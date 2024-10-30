import Proptypes from "prop-types";

const ActionButton = ({
  handleOnClick,
  textColor,
  bgColor,
  icon,
  buttonText,
}) => {
  return (
    <div>
      <button
        onClick={handleOnClick}
        style={{
          display: "flex",
          gap: "5px",
          color: `${textColor}`,
          backgroundColor: `${bgColor}`,
          padding: "10px",
          boxSizing: "border-box",
          borderRadius: "20px",
          justifyContent: "center",
          border: "1px solid #D8D8D8",
          minWidth: "110px",
          cursor: "pointer",
          alignItems: "center",
        }}
      >
        <img
          src={icon}
          alt={buttonText}
          style={{ height: "20px", width: "20px" }}
        />
        <div style={{ fontWeight: "400", fontSize: "14px" }}>{buttonText}</div>
      </button>
    </div>
  );
};

ActionButton.propTypes = {
  handleOnClick: Proptypes.func.isRequired,
  textColor: Proptypes.string.isRequired,
  bgColor: Proptypes.string.isRequired,
  icon: Proptypes.string.isRequired,
  buttonText: Proptypes.string.isRequired,
};

export default ActionButton;
