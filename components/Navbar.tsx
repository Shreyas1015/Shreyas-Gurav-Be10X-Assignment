"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="bg-slate-100 p-4">
      <div className="container mx-auto flex justify-between items-center px-5">
        <div className="text-black text-lg px-2 font-bold">
          <div className="rounded-full border border-black overflow-hidden">
            <Image
              className="object-cover"
              src="/Images/Logo.png"
              alt="Be10X"
              width={50}
              height={50}
            />
          </div>
          {/* <Link href="/all-blogs">Be10X</Link> */}
        </div>
        <div className="space-x-9">
          <Link href="/all-blogs" className="text-black hover:text-white">
            All Blogs
          </Link>
          <Link href="/my-blogs" className="text-black hover:text-white">
            My Blogs
          </Link>
          <Link href="/add-blog" className="text-black hover:text-white">
            Add Blogs
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-white bg-black border border-black rounded-md hover:border-black hover:text-black hover:bg-transparent"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
