import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center  justify-center bg-gray-900 bg-opacity-75 z-[200]">
      <div className="bg-white scale-75 mob:scale-95 tab:scale-100 rounded-md tab:rounded-lg  p-6 w-full max-w-sm lap:max-w-md text-center shadow-lg">
        <h2 className="text-base lap:text-xl font-semibold text-gray-800">Confirm Delete</h2>
        <p className="text-gray-600 text-sm lap:text-base mt-2">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-sm lap:text-base text-white px-3 py-1 lap:px-4 lap:py-2 rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-sm lap:text-base text-gray-700 px-3 py-2 lap:px-4 lap:py-2 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
