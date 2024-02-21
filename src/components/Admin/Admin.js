import React, { useState, useRef } from "react";
import { saveAs } from "file-saver";

export default function Admin() {
  const [title, setTitle] = useState("");
  const fileInput = useRef();

  const handleFileUpload = () => {
    const file = fileInput.current.files[0];
    saveAs(file, `src/assets/upload/${file.name}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFileUpload();
    // handle your form submission logic here
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <span className="text-lg font-bold">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            ref={fileInput}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
