function ModalPopUp(props) {
  const { isOpen, toggleModal, children } = props;
  if (!isOpen) return null;

  return (
    <div className="w-full h-full z-20 fixed bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 relative w-1/2">
        {children}
        <button onClick={toggleModal} className="absolute -top-3 -right-3 bg-red-600 px-2 text-white rounded-full border-red-600 hover:bg-red-400">
          X
        </button>
      </div>
    </div>
  );
}

export default ModalPopUp;
