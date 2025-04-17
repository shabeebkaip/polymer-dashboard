import PropTypes from "prop-types";
const Title = ({ title, description, actions }) => {
  return (
    <div className="flex items-center justify-between w-full ">
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-normal">{title}</h4>
        <p className="font-light">{description}</p>
      </div>
      <div>{actions}</div>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.node,
};

export default Title;
