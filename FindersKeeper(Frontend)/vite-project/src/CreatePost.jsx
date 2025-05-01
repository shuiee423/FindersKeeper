// CreatePost.jsx
import React, { useRef, useState } from 'react';

function CreatePost({ onNavigate, onPostSubmit, nickname, schoolId }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [location, setLocation] = useState('');
  const [keyDetails, setKeyDetails] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const confirmUpload = (e) => {
    const confirmChoice = confirm("Do you want to upload an image of the item?");
    if (!confirmChoice) {
      e.preventDefault();
    }
  };

  const handleTagAdd = () => {
    if (customTag.trim() !== '') {
      setTags([...tags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    const timestamp = new Date();
    const newPost = { image, description, tags, location, keyDetails, timestamp, nickname, schoolId };
    onPostSubmit(newPost);
    onNavigate('home');
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-blue-50 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 text-center">
          Post a Lost or Found Item
        </h2>
        <button
          title="Cancel"
          className="text-gray-500 hover:text-yellow-600 text-5xl font-bold"
          onClick={() => onNavigate('home')}
        >
          ×
        </button>
      </div>

      <input
        type="file"
        id="upload-image"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />

      {image && (
        <img
          src={image}
          alt="preview"
          className="w-full max-h-60 object-contain mb-5 rounded-lg"
        />
      )}

      <label
        htmlFor="upload-image"
        className="block mx-auto w-full text-center py-2 bg-white dark:bg-gray-700 border-2 hover:bg-blue-200 dark:hover:bg-gray-600 text-blue-600 rounded-lg cursor-pointer mb-5"
        onClick={confirmUpload}
      >
        Upload Image
      </label>

      <textarea
        placeholder="Share a brief public description of the item (for others to see)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-5 dark:bg-gray-700 dark:text-white"
      />

      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Add a tag to help categorize the item (e.g. Umbrella, School ID, etc.)"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <button
          className="px-4 py-2 bg-blue-200 text-blue-700 rounded-2xl hover:bg-blue-300"
          onClick={handleTagAdd}
        >
          Add Tag
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              title="Remove tag"
              className="text-gray-600 font-bold hover:text-yellow-600 p-1"
              onClick={() => setTags(tags.filter((_, i) => i !== index))}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full px-4 py-2 mb-7 border border-gray-300 bg-white rounded-md dark:bg-gray-700 text-gray-400"
      >
        <option value="">Select the spot where you found the item</option>
        <option value="Building 1">Building 1 (Arts & Culture)</option>
        <option value="Building 3">Building 3 (Integrated Tech Building)</option>
        <option value="Building 4">Building 4 (ROTC Building)</option>
        <option value="Building 5">Building 5 (Old CEA Building)</option>
        <option value="Building 9">Building 9 (ICT Building)</option>
        <option value="Building 10">Building 10 (Administration Building)</option>
        <option value="Building 14">Building 14 (Finance Center)</option>
        <option value="Building 15">Building 15 (Gym Lobby)</option>
        <option value="Building 16">Building 16 (Dr. Rotoras Memorial Hall - Gymnasium)</option>
        <option value="Building 18">Building 18 (Culinary Building)</option>
        <option value="Building 19">Building 19 (Science Centrum Building)</option>
        <option value="Building 20">Building 20 (Cafeteria)</option>
        <option value="Building 21">Building 21 (Guard House)</option>
        <option value="Building 23">Building 23 (LRC Building)</option>
        <option value="Building 24">Building 24 (Foods Trade Building)</option>
        <option value="Building 25">Building 25 (Food Innovation Center)</option>
        <option value="Building 28">Building 28 (Old Science Building)</option>
        <option value="Building 41">Building 41 (Science Complex)</option>
        <option value="Building 42">Building 42 (Engineering Complex A)</option>
        <option value="Building 43">Building 43 (Engineering Complex B)</option>
        <option value="Building 44">Building 44 (Technology Building)</option>
        <option value="Building 45">Building 45 (FAB Lab Building)</option>
      </select>

      <input
        type="text"
        placeholder="Add any private details of the item here (so others won't see)..."
        value={keyDetails}
        onChange={(e) => setKeyDetails(e.target.value)}
        className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
      />

      <button
        onClick={handlePost}
        className="block mx-auto w-80 h-12 bg-yellow-400 hover:bg-yellow-500 text-yellow-800 py-2 mt-10 rounded-2xl"
      >
        Post
      </button>
    </div>
  );
}

export default CreatePost;