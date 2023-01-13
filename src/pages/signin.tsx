/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const signin = () => {
  return (
    // tailwind line height example
    // https://tailwindcss.com/docs/line-height
    // https://tailwindcss.com/docs/grid-template-columns
    <div className="grid h-screen grid-cols-1 bg-[#1b2642] md:grid-cols-2">
      <div className=" flex items-center justify-center">
        <div className="mb-5 flex w-[80%] flex-row gap-2 text-sm font-medium text-gray-500 dark:text-gray-100">
          <div className="mb-5 font-sans text-5xl leading-[4rem] md:text-6xl">
            <span className=" text-blue-300 underline">Lullaby Lab,</span> a
            simple and fast web app for managing orders and clients.
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center rounded-lg bg-white shadow dark:bg-gray-900">
        <div className="w-96 px-6 py-6 lg:px-8">
          <div className="mb-4 flex justify-center">
            <img src="/logo.svg" alt="logo" className="h-48 w-48" />
          </div>

          <form className="space-y-6" action="#">
            <button
              type="button"
              className="mb-3 flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="mr-2 -ml-1 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
            <Link href="/order">
              <button
                type="button"
                className="mr-2 mb-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <div className="mr-2">👋</div>
                <div>Continue as Guest</div>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signin;
