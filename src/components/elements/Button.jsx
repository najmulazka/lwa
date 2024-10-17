function Button(props) {
  const { variant, textColor, variantHover, textHover, children } = props;
  return (
    <button className={`font-bold py-1 w-36 md:py-2 md:w-48 border border-2 border-black bg-${variant} text-${textColor} rounded hover:bg-${variantHover} hover:text-${textHover}`} type="button">
      {children}
    </button>
  );
}

export default Button;
