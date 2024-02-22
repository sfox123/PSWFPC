import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";

const AdminPanel = ({ blogArray }) => {
  const [editingPostId, setEditingPostId] = useState(null);

  const handleEditClick = (postId) => {
    setEditingPostId(postId);
  };

  const handleCancel = () => {
    setEditingPostId(null);
  };

  const handleSave = (post) => {
    // TODO: Logic to update the blog post on the backend
    console.log("Edited Post:", post);
    setEditingPostId(null); // Reset to display mode
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow p-8 container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogArray.map((post) => (
            <PostBox
              key={post.id}
              post={post}
              isEditing={post.id === editingPostId}
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
  const [editedPost, setEditedPost] = useState({
    ...post,
    image: post.image || {}, // For handling image updates
    keyValue: post.dictionary.keyValue || [], // Initialize key-value pairs
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleInputChange = (event, field) => {
    setEditedPost({ ...editedPost, [field]: event.target.value });
  };
  const onDeleteClick = (id) => {
    try {
      console.log("Deleted 1", id);
    } catch (error) {
      console.log("Error deleting post", error);
    } finally {
      setShowConfirmDelete(false);
    }
  };

  const handleKeyValueChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPairs = [...editedPost.keyValue];
    updatedPairs[index][name] = value;
    setEditedPost({ ...editedPost, keyValue: updatedPairs });
  };

  const handleAddKeyValuePair = () => {
    setEditedPost({
      ...editedPost,
      keyValue: [...editedPost.keyValue, ["newKey", "newValue"]],
    });
  };
  const handleRemoveKeyValuePair = (index) => {
    const updatedPairs = [...editedPost.keyValue];
    updatedPairs.splice(index, 1);
    setEditedPost({ ...editedPost, keyValue: updatedPairs });
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
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => handleInputChange(e, "image")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {editedPost.keyValue.map((pair, index) => (
            <div key={index} className="mt-4 flex space-x-4 mb-2">
              <input
                type="text"
                name="key"
                value={pair[0]}
                placeholder="Key"
                onChange={(e) => handleKeyValueChange(index, e)}
                className="flex-grow p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="value"
                value={pair[1]}
                placeholder="Value"
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
          {/* Add more input fields for image, key-value pairs, etc. */}

          <button
            onClick={() => onSave(editedPost)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
