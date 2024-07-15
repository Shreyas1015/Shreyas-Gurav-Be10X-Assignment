"use client";

import TitleBlog from "@/components/TitleBlog";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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

const AllBlogsPage = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/allblogs");
        setBlogs(response.data.blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container-fluid mx-auto ">
      <h1 className="text-3xl font-bold mb-4 text-start">Blog</h1>
      <TitleBlog />
      <h1 className="text-3xl font-bold my-7 text-start">All Blogs</h1>
      <hr />
      <div className="row mt-4">
        {blogs.map((blog) => (
          <div
            key={blog.bid}
            className="bg-white p-4 rounded-lg shadow-lg col-lg-4 col-sm-6 col-12 mx-auto my-3"
          >
            <Image
              src={blog.imageUrl}
              alt="Image URL"
              width={500}
              height={300}
              className="object-cover"
              priority
              style={{ width: "auto", height: "15rem" }}
            />
            <h2
              className="text-xl font-semibold mb-2 px-2"
              style={{ height: "4rem", overflow: "hidden" }}
            >
              {blog.title}
            </h2>
            <p
              className="text-gray-700 px-2"
              style={{ height: "6rem", overflow: "hidden" }}
            >
              {blog.content}
            </p>
            <Link href={`/blog/${blog.bid}`}>
              <button className="px-4 py-2 my-3 text-white bg-black border border-black rounded-md hover:border-black hover:text-black hover:bg-transparent">
                Read More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;
