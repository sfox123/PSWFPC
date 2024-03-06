import React, { useState } from "react";

const ConfirmDelete = ({ onCancel, onDelete }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
        <p>Are you sure you want to delete this post?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
