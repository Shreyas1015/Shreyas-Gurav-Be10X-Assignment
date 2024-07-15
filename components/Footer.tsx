import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-black p-20 mt-16">
        <div className="container">
          <div className="mx-auto items-center px-5">
            <div className="row">
              <div className="col-lg-9 col-6 d-flex align-items-center">
                <div className="text-black text-lg px-2 font-bold">
                  <div className="border border-black overflow-hidden">
                    <Image
                      className="object-cover rounded-circle"
                      src="/Images/Logo.png"
                      alt="Be10X"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6 d-flex justify-content-end align-items-center">
                <div className="socials text-center text-white">
                  <div className="row">
                    <div className="col-6 p-4">
                      <a
                        href="https://www.linkedin.com/in/shreyas-gurav-4a7771257"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fa-brands fa-linkedin fa-2xl"
                          style={{ color: "#366ece" }}
                        />
                      </a>
                    </div>
                    <div className="col-6 p-4">
                      <a
                        href="https://github.com/Shreyas1015"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fa-brands fa-github fa-2xl"
                          style={{ color: "#ffffff" }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="text-white" />
            <p className="text-white text-center p-3">@Shreyas Gurav</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
