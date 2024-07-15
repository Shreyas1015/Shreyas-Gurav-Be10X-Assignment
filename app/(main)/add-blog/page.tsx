"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import axios from "axios";
import { IKContext, IKUpload } from "imagekitio-react";

const CreateBlogForm = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const authenticator = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/image-authenticator`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: any) {
      console.error(`Authentication request failed: ${error.message}`);
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/allblogs`,
        {
          title,
          content,
          imageUrl,
        }
      );
      if (response.data.authenticated) {
        setSuccess("Blog created successfully!");
        setTitle("");
        setContent("");
        setImageUrl("");
      } else {
        setError("Error creating blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("Error creating blog");
    }
  };

  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "";
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "";
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Create New Blog</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-semibold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows={6}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-semibold mb-2"
          >
            Upload Image
          </label>
          <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
          >
            <IKUpload
              onSuccess={(res) => {
                setImageUrl(res.url);
                alert("Image uploaded successfully");
              }}
              onError={(err) => {
                console.error("Error uploading image:", err);
                setError("Error uploading image");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              fileName={`blog_${new Date().getTime()}.jpg`}
              folder="/blogs"
              useUniqueFileName={true}
              isPrivateFile={false}
            />
          </IKContext>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
