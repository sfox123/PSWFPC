import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";
import { db } from "../../api/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { Link } from "react-router-dom";

import ConfirmDelete from "./ConfirmDelete";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const AdminPanel = ({ blogArray, isLoading, imgDB }) => {
  const [editingPostId, setEditingPostId] = useState(null);

  const handleEditClick = (postId) => {
    setEditingPostId(postId);
    console.log(
      "Editing Post:",
      blogArray.find((post) => post.id === postId)
    );
  };

  const handleCancel = () => {
    setEditingPostId(null);
  };

  const handleSave = async (editedPost, images, bulkImages, removedImages) => {
    try {
      if (images.length > 0) {
        const imageUploadPromises = images.map((image) => {
          const imageRef = ref(imgDB, `images/${v4()}`);
          return uploadBytes(imageRef, image).then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          });
        });

        const imageUrls = await Promise.all(imageUploadPromises);
        editedPost.img = imageUrls[0];
      }

      if (bulkImages.length > 0) {
        const bulkImageUploadPromises = bulkImages.map((image) => {
          const imageRef = ref(imgDB, `images/${v4()}`);
          return uploadBytes(imageRef, image).then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          });
        });

        const bulkImageUrls = await Promise.all(bulkImageUploadPromises);
        editedPost.bulkImg = bulkImageUrls;
      }

      if (removedImages.length > 0) {
        const removeImagesPromises = removedImages.map(async (image) => {
          // Split the URL into parts
          const urlParts = image.split("/");
          // Extract the UUID from the URL
          const id = urlParts[urlParts.length - 1].split("%2")[1].split("?")[0];
          // Create a reference to the image in Firebase Storage
          const imageRef = ref(imgDB, `images/${id}`);
          // Delete the image
          await deleteObject(imageRef);
        });

        await Promise.all(removeImagesPromises);

        editedPost.bulkImg = editedPost.bulkImg.filter(
          (image) => !removedImages.includes(image)
        );
      }

      console.log("Updated Post:", editedPost);

      // TODO: Logic to update the blog post on the backend
      // console.log("Edited Post:", post);

      try {
        const val = doc(db, "blogs", editingPostId);
        await updateDoc(val, editedPost);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
    setEditingPostId(null); // Reset to display mode
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow p-8 container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            blogArray.map((post, i) => (
              <PostBox
                key={post.id}
                post={post}
                isEditing={post.id === editingPostId}
                id={i}
                onEditClick={() => handleEditClick(post.id)}
                onCancel={handleCancel}
                onSave={handleSave}
              />
            ))}
          <NewPostBox />
        </div>
      </main>
    </div>
  );
};

const PostBox = ({ post, isEditing, onEditClick, onCancel, onSave }) => {
  const [images, setImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [bulkImages, setBulkImages] = useState([]);
  const [loading] = useState(false);

  const [editedPost, setEditedPost] = useState({
    ...post,
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const isEdited = () => {
    return (
      images.length > 0 ||
      editedPost.title !== post.title ||
      editedPost.subtitle !== post.subtitle ||
      editedPost.keyValuePairs.length !== post.keyValuePairs.length ||
      bulkImages.length > 0 ||
      removedImages.length > 0
    );
  };
  const handleInputChange = (event, field) => {
    setEditedPost({ ...editedPost, [field]: event.target.value });
  };
  const onDeleteClick = async (id) => {
    try {
      const val = doc(db, "blogs", id);
      await deleteDoc(val);
    } catch (error) {
      console.log("Error deleting post", error);
    } finally {
      setShowConfirmDelete(false);
    }
  };
  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

  const handleKeyValueChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPairs = [...editedPost.keyValuePairs];
    updatedPairs[index][name] = value;
    setEditedPost({ ...editedPost, keyValuePairs: updatedPairs });
  };

  const handleAddKeyValuePair = () => {
    setEditedPost({
      ...editedPost,
      keyValuePairs: [...editedPost.keyValuePairs, { key: "", value: "" }],
    });
  };
  const handleRemoveKeyValuePair = (index) => {
    const updatedPairs = [...editedPost.keyValuePairs];
    updatedPairs.splice(index, 1);
    setEditedPost({ ...editedPost, keyValuePairs: updatedPairs });
  };
  const handleBulkImageRemoveExisting = (index) => {
    const removedElement = editedPost.bulkImg[index];
    setEditedPost({
      ...editedPost,
      bulkImg: editedPost.bulkImg.filter((_, i) => i !== index),
    });
    setRemovedImages((prevRemovedImages) => [
      ...prevRemovedImages,
      removedElement,
    ]);
  };
  const handleBulkImageRemove = (index) => {
    setBulkImages((prevBulkImages) =>
      prevBulkImages.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      {showConfirmDelete && (
        <ConfirmDelete
          onCancel={() => setShowConfirmDelete(false)}
          onDelete={() => onDeleteClick(post.id)}
        />
      )}
      {isEditing ? (
        <div className="p-4">
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) => handleInputChange(e, "title")}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            value={editedPost.subtitle}
            onChange={(e) => handleInputChange(e, "subtitle")}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <label htmlFor="image" className="block text-gray-700 mb-1">
            Wall Image
          </label>
          <div className="flex flex-row p-3 items-center justify-between">
            {images.length > 0 ? (
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
            ) : (
              <img
                src={editedPost.img}
                alt=""
                className="w-1/4 h-12 object-cover rounded-md mb-2"
              />
            )}
            <div
              {...getRootProps({
                className:
                  "border-2 border-dashed border-gray-400 p-4 rounded cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              <p className="text-center">Upload New Image</p>
            </div>
          </div>

          {editedPost.keyValuePairs.map((pair, index) => (
            <div key={index} className="mt-4 flex space-x-4 mb-2">
              <input
                type="text"
                name="key"
                value={pair["key"]}
                placeholder={pair["key"]}
                onChange={(e) => handleKeyValueChange(index, e)}
                className="flex-grow p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="value"
                value={pair["value"]}
                placeholder={pair["value"]}
                onChange={(e) => handleKeyValueChange(index, e)}
                className="flex-grow p-2 border border-gray-300 rounded"
              />
              <button
                onClick={() => handleRemoveKeyValuePair(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                -
              </button>
            </div>
          ))}
          <button
            onClick={handleAddKeyValuePair}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-5 px-4 rounded"
          >
            + Add Key-Value Pair
          </button>
          <br />
          <label htmlFor="image" className="block text-gray-700 mb-1">
            Gallery Images
          </label>
          {editedPost.bulkImg.length > 0 ? (
            <div className="flex flex-wrap items-center space-x-2 space-y-2">
              {editedPost.bulkImg.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleBulkImageRemoveExisting(index)}
                    className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No images uploaded yet</p>
          )}
          {bulkImages.length > 0 ? (
            <div className="flex flex-wrap items-center space-x-2 space-y-2 mt-4">
              {bulkImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    key={index}
                    src={image.preview}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleBulkImageRemove(index)}
                    className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          <div
            {...getBulkRootProps({
              className:
                "border-2 border-dashed border-gray-400 p-4 rounded cursor-pointer mb-5 mt-5",
            })}
          >
            <input {...getBulkInputProps()} />
            <p className="text-center">Upload Multiple Images</p>
          </div>
          <button
            disabled={!isEdited()}
            onClick={() =>
              onSave(editedPost, images, bulkImages, removedImages)
            }
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
              !isEdited() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <Link to={`/admin/blog/${post.id}`}>
            <img src={post.img} alt="" className="w-full h-48 object-cover" />
          </Link>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.subtitle}</p>
            <button
              onClick={onEditClick}
              className="text-blue-500 hover:text-blue-700 inline-block"
            >
              Edit
            </button>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="text-red-500 hover:text-red-700 inline-block ml-4"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const NewPostBox = () => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer hover:bg-gray-100">
      <Link to="/admin/blog/new">
        <div className="flex items-center justify-center h-48 text-gray-400">
          <span className="text-3xl font-bold">+</span>
          <span className="ml-2">New Post</span>
        </div>
      </Link>
    </div>
  );
};

export default AdminPanel;
