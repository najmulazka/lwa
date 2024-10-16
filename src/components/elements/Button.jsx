function Button(props) {
  const { variant = 'black', textColor = 'white', variantHover = 'white', textHover = 'black', children } = props;
  return (
    <button className={`font-bold py-1 px-2 md:py-2 md:px-4 border border-2 border-black bg-${variant} text-${textColor} rounded hover:bg-${variantHover} hover:text-${textHover}`} type="button">
      {children}
    </button>
  );
}

export default Button;
