"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

type Blog = {
  bid: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
  imageUrl: string;
};

const BlogDetails = ({ params }: { params: any }) => {
  const bid = params.bid;
  const [blogData, setBlogData] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await axios.get(`/api/blog-details/${bid}`);
        setBlogData(res.data.blogData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogData();
  }, [bid]);

  if (!blogData) {
    return (
      <div>
        {" "}
        <div className="spinner-border text-primary text-center" role="status">
          <span className="visually-hidden text-center">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4 text-wrap">
        <h1 className="text-3xl font-semibold mb-2 p-3">{blogData.title}</h1>
        <p className="text-gray-700 p-3">{blogData.content}</p>
      </div>
    </>
  );
};

export default BlogDetails;
