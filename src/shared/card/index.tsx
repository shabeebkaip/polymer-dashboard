import PropTypes from "prop-types";

function Card(props) {
  const { extra, children, ...rest } = props;
  return (
    <div
      className={`z-5 relative flex flex-col rounded-[20px] bg-[#F7F7F7] bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  variant: PropTypes.string,
  extra: PropTypes.string,
  children: PropTypes.node,
};

export default Card;