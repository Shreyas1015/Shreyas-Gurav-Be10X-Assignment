"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Blog = {
  bid: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
};

const TitleBlog = () => {
  const { data: session } = useSession();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/allblogs`
        );
        const blogs = response.data.blogsData;
        console.log(blogs);
        if (blogs.length > 0) {
          const randomIndex = Math.floor(Math.random() * blogs.length);
          setBlog(blogs[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {blog ? (
        <div className="bg-white p-6 rounded-lg shadow-lg row">
          <div className="title py-6 px-3 col-lg-6">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p
              className="text-gray-700"
              style={{ height: "15rem", overflow: "hidden" }}
            >
              {blog.content}
            </p>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.bid}`}>
              <button className="px-4 py-2 my-3 text-white bg-black border border-black rounded-md hover:border-black hover:text-black hover:bg-transparent">
                Read More
              </button>
            </Link>
          </div>
          <div className="img col-lg-6 d-none d-lg-block">
            <Image
              src={blog.imageUrl}
              alt="Image URL"
              width={500}
              height={300}
              className="object-cover"
              style={{ width: "auto", height: "80%" }}
            />
          </div>
        </div>
      ) : (
        <div className="spinner-border text-primary text-center" role="status">
          <span className="visually-hidden text-center">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default TitleBlog;
