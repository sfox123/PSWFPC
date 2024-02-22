import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaPlus, FaMinus, FaFileUpload } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminHeader from "./AdminHeader";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);
  const [images, setImages] = useState([]);
  const [bulkImages, setBulkImages] = useState([]);

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

    try {
      const formData = new FormData();
      formData.append("id", "4");
      formData.append("title", title);
      formData.append("img", "imag");
      formData.append("subtitle", subTitle);
      formData.append("paragraph", paragraph);

      // images.forEach((image, index) => {
      //   formData.append(`image${index + 1}`, image);
      // });

      // bulkImages.forEach((image, index) => {
      //   formData.append(`bulkImage${index + 1}`, image);
      // });

      // keyValuePairs.forEach(({ key, value }, index) => {
      //   formData.append(`keyValuePairs[${index}].key`, key);
      //   formData.append(`keyValuePairs[${index}].value`, value);
      // });

      const response = await axios.post(
        "https://us-central1-pswfpc-a086d.cloudfunctions.net/addBlog",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Blog post added successfully:", response.data);
      // Redirect or show success message
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

          <div className="space-y-2">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
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
                  onChange={(e) => handleKeyValueChange(index, e)}
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="value"
                  value={pair.value}
                  placeholder="Value"
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
                      className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </fieldset>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              Upload
            </button>
          </div>
          <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        </form>
      </main>
    </div>
  );
};

export default NewPost;
