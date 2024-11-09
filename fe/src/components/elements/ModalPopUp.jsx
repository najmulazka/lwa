function ModalPopUp(props) {
  const { isOpen, toggleModal } = props;
  if (!isOpen) return null;

  return (
    <div className="w-full h-full z-50 fixed bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg">Content</div>
      <button onClick={toggleModal}>Close</button>
    </div>
  );
}

export default ModalPopUp;
