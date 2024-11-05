import PropTypes from 'prop-types';

function Button(props) {
  const { variant, textColor, variantHover, textHover, children } = props;
  return (
    <button className={`font-bold py-1 w-36 md:py-2 md:w-48 border border-2 border-black bg-${variant} text-${textColor} rounded hover:bg-${variantHover} hover:text-${textHover}`} type="button">
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

// Optional
// Button.defaultProps = {
//   variant: 'white',
//   textColor: 'black',
//   variantHover: 'black',
//   textHover: 'white',
// };

export default Button;
