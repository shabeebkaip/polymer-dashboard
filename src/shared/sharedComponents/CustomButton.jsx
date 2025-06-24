import PropTypes from 'prop-types'

const CustomButton = ({ onClick, mode, buttonText }) => {

  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        color: 'white',
        backgroundColor: `#000`,
        padding: "10px",
        boxSizing: "border-box",
        borderRadius: "8px",
        justifyContent: "center",
        border: "1px solid #D8D8D8",
        minWidth: "110px",
        cursor: "pointer",
        alignItems: "center",
      }}
      onClick={onClick}

    >
      {buttonText ? buttonText : mode === 'add' ? 'Add' : 'Edit'}
    </div>
  )
}
CustomButton.propTypes = {
  styles: PropTypes.string, // Note: The 'styles' prop is defined in propTypes but not used in the component.
  onClick: PropTypes.func,
  mode: PropTypes.string,
  buttonText: PropTypes.string
}

export default CustomButton