import PropTypes from "prop-types";

const ActionButton = ({
  handleOnClick,
  textColor = "#fff",
  bgColor = "#10B981",
  borderColor = "#10B981",
  icon,
  buttonText,
  className = "",
}) => {
  return (
    <button
      onClick={handleOnClick}
      className={`flex items-center gap-2 justify-center px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${className}`}
      style={{
        color: textColor,
        backgroundColor: bgColor,
        border: `1.5px solid ${borderColor}`,
        minWidth: "110px",
        cursor: "pointer",
      }}
    >
      {typeof icon === "string" ? (
        <img src={icon} alt={buttonText} style={{ height: 20, width: 20 }} />
      ) : (
        icon
      )}
      <span className="font-medium tracking-tight">{buttonText}</span>
    </button>
  );
};

ActionButton.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ActionButton;
