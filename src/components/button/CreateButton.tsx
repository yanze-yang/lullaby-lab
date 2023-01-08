import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const CreateButton = () => {
  const router = useRouter();
  const path = router.pathname;
  console.log("path", path);

  return (
    <div>
      <Link href={`${path}/create`}>
        <button
          type="button"
          className="absolute bottom-10 right-10 mr-2 inline-flex items-center rounded-full bg-blue-700 p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            ></path>
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
      </Link>
    </div>
  );
};

export default CreateButton;
