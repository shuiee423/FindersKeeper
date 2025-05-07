import React, { useState, useRef, useEffect } from 'react';

function VerificationForm({ onNavigate, onClaimSubmit, post, userSchoolId }) {
  const [schoolId, setSchoolId] = useState(userSchoolId || '');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [proofDesc, setProofDesc] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    setProofImage(URL.createObjectURL(e.target.files[0]));
  };

  const confirmUpload = (e) => {
    const confirmChoice = confirm("Upload proof image for ownership?");
    if (!confirmChoice) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('schoolId', schoolId);
    formData.append('fullName', fullName);
    formData.append('department', department);
    formData.append('phone', phone);
    formData.append('proofDesc', proofDesc);
  
    if (fileInputRef.current?.files[0]) {
      formData.append('proofImage', fileInputRef.current.files[0]);
    }
  
    // Add post metadata if available
    formData.append('postDescription', post.description);
    formData.append('postLocation', post.location);
    formData.append('postTimestamp', post.timestamp);
    formData.append('postNickname', post.nickname);
    formData.append('postSchoolId', post.schoolId);
  
    try {
      const res = await fetch('http://localhost/your-folder-name/claim.php', {
        method: 'POST',
        body: formData,
      });
  
      if (res.ok) {
        alert('Claim submitted successfully!');
        onNavigate('confirmation');
      } else {
        alert('Failed to submit claim.');
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('An error occurred while submitting the claim.');
    }
  };

  useEffect(() => {
    console.log("Received post in VerificationForm:", post);
  }, [post]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-blue-50 dark:bg-gray-800"
    >
      <button
        title="Cancel"
        className="flex ml-auto text-gray-500 hover:text-yellow-600 text-5xl font-bold"
        onClick={() => onNavigate('viewPost')}
        type="button"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Verification Form
      </h2>

      <h3 className="text-lg font-semibold text-blue-400 mb-2">
        Claimer's Information
      </h3>

      <div className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="School ID"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
          required
          inputMode="numeric"
          pattern="[0-9]+"
          title="Please enter numbers only for School ID"
          readOnly
        />

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
          required
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
          required
          inputMode="numeric"
          pattern="[0-9]+"
          title="Please enter numbers only for Phone Number"
        />
      </div>

      <h3 className="text-lg font-semibold text-blue-400 mb-2">
        Ownership Proof
      </h3>

      <div className="flex flex-col gap-3 mb-6">
        <textarea
          placeholder="Share details to prove ownership..."
          value={proofDesc}
          onChange={(e) => setProofDesc(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
          required
        />

        <label
          htmlFor="proof-image"
          onClick={confirmUpload}
          className="block mx-auto w-full text-center py-2 bg-white dark:bg-gray-700 border-2 hover:bg-blue-200 dark:hover:bg-gray-600 text-blue-600 rounded-lg cursor-pointer mb-5"
        >
          Upload Proof Image
        </label>

        <input
          type="file"
          id="proof-image"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />

        {proofImage && (
          <img
            src={proofImage}
            alt="Proof preview"
            className="w-full max-h-60 object-contain rounded-lg"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-96 block mx-auto bg-yellow-400 hover:bg-yellow-500 text-yellow-800 py-2 mt-16 rounded-2xl"
      >
        Submit
      </button>
    </form>
  );
}

export default VerificationForm;