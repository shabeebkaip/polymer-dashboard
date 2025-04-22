import moment from "moment";
import PropTypes from "prop-types";

const LabelValue = ({ label, value, type }) => {
  return (
    <div className="flex flex-col ">
      <span className="font-bold">{label}</span>
      {type === "date" ? (
        <span>{moment(value)?.format("DD MMM YYYY hh:mm A")}</span>
      ) : (
        <span className="capitalize">{value}</span>
      )}
    </div>
  );
};

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default LabelValue;
