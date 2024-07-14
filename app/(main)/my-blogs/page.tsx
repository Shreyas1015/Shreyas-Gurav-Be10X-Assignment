"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Blog = {
  bid: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
};

const AllBlogsPage = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/my-blogs");
        setBlogs(response.data.blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingBlog) return;

    try {
      const response = await axios.put("/api/my-blogs", {
        bid: editingBlog.bid,
        title,
        content,
      });
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.bid === editingBlog.bid ? response.data.updatedBlog : blog
        )
      );
      setEditingBlog(null);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDelete = async (bid: number) => {
    try {
      await axios.delete("/api/my-blogs", { data: { bid } });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.bid !== bid));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">My Blogs</h1>
      {blogs.length === 0 ? (
        <>
          <p className="text-center text-gray-700">
            You haven&apos;t created any blogs yet.
          </p>
          <a
            href="/add-blog"
            className="block text-center text-blue-500 hover:text-blue-700"
          >
            Add a blog
          </a>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {blogs.map((blog) => (
              <div key={blog.bid} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700">{blog.content}</p>
                <button
                  className="mt-2 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="mt-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                  onClick={() => handleDelete(blog.bid)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {editingBlog && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
                <form onSubmit={handleUpdate}>
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
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="mr-2 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                      onClick={() => setEditingBlog(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllBlogsPage;
