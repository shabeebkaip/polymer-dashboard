import PropTypes from "prop-types";
const Title = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-lg font-normal">{title}</h4>
      <p className="font-light">{description}</p>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Title;
