/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const githubStyle =
    "block rounded py-2 pl-3 pr-4 text-blue-700 hover:bg-gray-100 dark:border-gray-700 dark:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white";

  const isNotActiveStyle =
    "block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white";

  const isActiveStyle =
    "block rounded bg-blue-700 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700";

  const router = useRouter();

  const { pathname } = router;

  return (
    <div>
      <nav className="top-0 left-0 z-20 w-full border-b border-gray-200 bg-white px-2 py-2.5 dark:border-gray-600 dark:bg-gray-900 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <img
              src="/logo.png"
              className="mr-6 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
          </Link>
          <div className="flex md:order-2">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
              <li>
                <Link
                  href="/dashboard"
                  className={
                    pathname === "/dashboard" ? isActiveStyle : isNotActiveStyle
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className={
                    pathname === "/order" ? isActiveStyle : isNotActiveStyle
                  }
                >
                  Order
                </Link>
              </li>
              {session && (
                <>
                  <li>
                    <Link
                      href="/product"
                      className={
                        pathname === "/product"
                          ? isActiveStyle
                          : isNotActiveStyle
                      }
                    >
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category"
                      className={
                        pathname === "/category"
                          ? isActiveStyle
                          : isNotActiveStyle
                      }
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className={
                        pathname === "/contact"
                          ? isActiveStyle
                          : isNotActiveStyle
                      }
                    >
                      Contact
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  href="https://github.com/yanze-yang/lab"
                  className={githubStyle}
                >
                  #Github
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
