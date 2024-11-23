import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Upload image
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully!");
      fetchImages(); // Refresh the uploaded images list
    } catch (err) {
      console.error(err);
      alert("Error uploading image.");
    }
  };

  // Fetch uploaded images
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/images");
      setUploadedImages(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch images on component mount
  React.useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Image Uploader</h1>

      {/* File Upload */}
      <div className="mb-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 w-40 h-40 object-cover"
          />
        )}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>

      {/* Uploaded Images */}
      <div className="mt-8">
        <h2 className="text-xl mb-4">Uploaded Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {uploadedImages.map((img, index) => (
            <img
              key={index}
              src={`data:${img.image.contentType};base64,${btoa(
                String.fromCharCode(...new Uint8Array(img.image.data.data))
              )}`}
              alt="Uploaded"
              className="w-40 h-40 object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
