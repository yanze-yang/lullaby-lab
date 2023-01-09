import Link from "next/link";
import React from "react";

const signin = () => {
  return (
    <div className="h-screen bg-[#1b2642] ">
      <img
        src="/hero-min.png"
        alt="hero"
        className="absolute bottom-0 h-auto w-[80%]"
      />
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-10 left-0 right-0 z-50 h-modal w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
      >
        <div className="absolute top-[20%] mx-0 w-full max-w-md md:right-[10%] md:h-auto">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-900 ">
            <button
              type="button"
              className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium uppercase text-gray-900 dark:text-white">
                Welcome to <b>supa</b>!
              </h3>
              <div className="mb-5 flex flex-col gap-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                <div>
                  Supa is a simple and fast tool for managing orders and
                  clients.
                </div>
                <div>
                  Log in to access your account, or click "Continue as guest" to
                  explore the demo data.
                </div>
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
      </div>
    </div>
  );
};

export default signin;
