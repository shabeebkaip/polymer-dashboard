import PropTypes from "prop-types";
const Title = ({ title, description, actions }) => {
  return (
    <div className="flex items-center justify-between w-full py-2 px-1 md:px-2 lg:px-0">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-gray-500 text-sm font-normal leading-snug max-w-xl">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.node,
};

export default Title;
