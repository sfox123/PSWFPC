import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaPlus, FaMinus } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc } from "firebase/firestore";
import { v4 } from "uuid";

import AdminHeader from "./AdminHeader";

const NewPost = ({ imgDB, db }) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);
  const [images, setImages] = useState([]);
  const [bulkImages, setBulkImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const resetFunc = () => {
    setTitle("");
    setSubTitle("");
    setParagraph("");
    setKeyValuePairs([{ key: "", value: "" }]);
    setImages([]);
    setBulkImages([]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImages(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const { getRootProps: getBulkRootProps, getInputProps: getBulkInputProps } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        setBulkImages(
          acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        );
      },
    });

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleBulkImageRemove = (index) => {
    setBulkImages((prevBulkImages) =>
      prevBulkImages.filter((_, i) => i !== index)
    );
  };

  const handleKeyValueChange = (index, event) => {
    const { name, value } = event.target;
    setKeyValuePairs((prevKeyValuePairs) =>
      prevKeyValuePairs.map((pair, i) =>
        i === index ? { ...pair, [name]: value } : pair
      )
    );
  };

  const handleAddKeyValuePair = () => {
    setKeyValuePairs((prevKeyValuePairs) => [
      ...prevKeyValuePairs,
      { key: "", value: "" },
    ]);
  };

  const handleRemoveKeyValuePair = (index) => {
    if (keyValuePairs.length > 1) {
      setKeyValuePairs((prevKeyValuePairs) =>
        prevKeyValuePairs.filter((_, i) => i !== index)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = {};
      formData.id = v4();
      formData.title = title;
      formData.subtitle = subTitle;
      formData.paragraph = paragraph;
      formData.keyValuePairs = keyValuePairs;
      formData.bulkImg = [];

      const imageUploadPromises = images.map((image) => {
        const imageRef = ref(imgDB, `images/${v4()}`);
        return uploadBytes(imageRef, image).then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        });
      });

      const bulkImageUploadPromises = bulkImages.map((image) => {
        const imageRef = ref(imgDB, `images/${v4()}`);
        return uploadBytes(imageRef, image).then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        });
      });

      const allImageUploadPromises = [
        ...imageUploadPromises,
        ...bulkImageUploadPromises,
      ];

      const imageUrls = await Promise.all(allImageUploadPromises);

      imageUrls.forEach((url, index) => {
        if (index < images.length) {
          formData.img = url;
        } else {
          formData.bulkImg = [...formData.bulkImg, url];
        }
      });

      await addDoc(db, formData);
      setLoading(false);
      resetFunc();
      setSuccessMessage("Blog post added successfully!");
    } catch (error) {
      console.error("Error adding blog post:", error);
      // Handle error, show error message
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AdminHeader />
      <main className="flex-grow p-8 container mx-auto">
        {/* Centering */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          {/* Center the form within the container */}
          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {successMessage}
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <button onClick={() => setSuccessMessage("")}>&times;</button>
              </span>
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              disabled={loading}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subTitle" className="block text-gray-700">
              Subtitle
            </label>
            <input
              type="text"
              id="subTitle"
              disabled={loading}
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div
              {...getRootProps({
                className: "border-2 border-dashed p-4 rounded cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              <p className="text-center">Drag and drop an image here</p>
            </div>
            {images.length > 0 && (
              <div className="flex flex-wrap  space-x-2 space-y-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.preview}
                      alt=""
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <fieldset className="space-y-4">
            {/* Group key-value pairs together */}
            <legend className="text-gray-700 font-medium">
              Key-Value Pairs
            </legend>
            {keyValuePairs.map((pair, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  name="key"
                  value={pair.key}
                  placeholder="Key"
                  disabled={loading}
                  onChange={(e) => handleKeyValueChange(index, e)}
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="value"
                  value={pair.value}
                  placeholder="Value"
                  disabled={loading}
                  onChange={(e) => handleKeyValueChange(index, e)}
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
                <div className="flex items-center space-x-2">
                  <button type="button" onClick={handleAddKeyValuePair}>
                    <FaPlus className="text-green-500" />
                  </button>
                  {keyValuePairs.length > 1 && (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleRemoveKeyValuePair(index)}
                    >
                      <FaMinus className="text-red-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </fieldset>

          {/* Paragraphs */}
          <fieldset className="space-y-4">
            <legend className="text-gray-700 font-medium">Paragraph</legend>
            <textarea
              value={paragraph}
              disabled={loading}
              onChange={(e) => setParagraph(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-gray-700 font-medium">
              Bulk Image Upload
            </legend>
            <div
              {...getBulkRootProps({
                className: "border-2 border-dashed p-4 rounded cursor-pointer",
              })}
            >
              <input {...getBulkInputProps()} />
              <p className="text-center">Drag and drop multiple images here</p>
            </div>
            {bulkImages.length > 0 && (
              <div className="flex flex-wrap space-x-2 space-y-2">
                {bulkImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.preview}
                      alt=""
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleBulkImageRemove(index)}
                      disabled={loading}
                      className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
          </fieldset>

          <div className="mt-4"></div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                <span className="inline-flex items-center ml-2">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewPost;
