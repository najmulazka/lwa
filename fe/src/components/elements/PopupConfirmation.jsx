function PopupConfirmation(props) {
  const { type, onConfirm, onCancel } = props;

  return (
    <div className="w-full h-screen fixed z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to {type === 'delete' ? 'delete this data?' : 'Logout?'}</h2>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg">
            No
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupConfirmation;
