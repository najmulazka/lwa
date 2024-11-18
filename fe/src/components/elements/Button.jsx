import PropTypes from 'prop-types';

function Button(props) {
  const { variant, textColor, variantHover, textHover, children } = props;
  return (
    <button className={`font-semibold py-1 md:py-2 md:px-4 px-2 text-xs md:text-base border border-2 border-black bg-${variant} text-${textColor} rounded hover:bg-${variantHover} hover:text-${textHover}`} type="button">
      {children}
    </button>
  );
}

// Validation
Button.propTypes = {
  variant: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  variantHover: PropTypes.string.isRequired,
  textHover: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
