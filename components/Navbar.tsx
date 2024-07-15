"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login` });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" href="/allblogs">
          <div className="rounded-full border border-black overflow-hidden">
            <Image
              className="object-cover"
              src="/Images/Logo.png"
              alt="Be10X"
              width={50}
              height={50}
            />
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link my-2" href="/all-blogs">
                  All Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link my-2" href="/my-blogs">
                  My Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link my-2" href="/add-blog">
                  Add Blogs
                </Link>
              </li>
            </ul>
            <button
              onClick={handleSignOut}
              className="btn btn-outline-dark my-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
