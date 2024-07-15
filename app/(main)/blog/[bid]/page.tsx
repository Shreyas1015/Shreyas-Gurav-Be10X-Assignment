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
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto py-10 px-10" style={{ width: "50%" }}>
        <h1 className="text-xl font-semibold mb-2">{blogData.title}</h1>
        <p className="text-gray-700">{blogData.content}</p>
      </div>
    </>
  );
};

export default BlogDetails;
