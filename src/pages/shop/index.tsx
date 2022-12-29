import React from "react";
// import axios from "axios";
import type { Product, Category } from "@prisma/client";
import Item from "../../components/shop/Item";
import { prisma } from "../../server/db/client";

interface IProduct extends Product {
  category: Category;
}

export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  // const { data } = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default function ShopIndex({ products }: { products: IProduct[] }) {
  if (products.length === 0) return <div>loading...</div>;
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4">
        <div>
          <button
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownRadio"
            className="focus:ring-gray-200border-gray-600bg-gray-800text-whitehover:border-gray-600hover:bg-gray-700focus:ring-gray-700 inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4"
            type="button"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Last 30 days
            <svg
              className="ml-2 h-3 w-3"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            id="dropdownRadio"
            className="shadowdivide-gray-600bg-gray-700 z-10 hidden w-48 divide-y divide-gray-100 rounded bg-white"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
          >
            <ul
              className="text-gray-700text-gray-200 space-y-1 p-3 text-sm"
              aria-labelledby="dropdownRadioButton"
            >
              <li>
                <div className="hover:bg-gray-100hover:bg-gray-600 flex items-center rounded p-2">
                  <input
                    id="filter-radio-example-1"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="focus:ring-blue-500border-gray-600bg-gray-700ring-offset-gray-800focus:ring-blue-600 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
                  />
                  <label
                    htmlFor="filter-radio-example-1"
                    className="text-gray-900text-gray-300 ml-2 w-full rounded text-sm font-medium"
                  >
                    Last day
                  </label>
                </div>
              </li>
              <li>
                <div className="hover:bg-gray-100hover:bg-gray-600 flex items-center rounded p-2">
                  <input
                    checked={false}
                    id="filter-radio-example-2"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="focus:ring-blue-500border-gray-600bg-gray-700ring-offset-gray-800focus:ring-blue-600 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
                  />
                  <label
                    htmlFor="filter-radio-example-2"
                    className="text-gray-900text-gray-300 ml-2 w-full rounded text-sm font-medium"
                  >
                    Last 7 days
                  </label>
                </div>
              </li>
              <li>
                <div className="hover:bg-gray-100hover:bg-gray-600 flex items-center rounded p-2">
                  <input
                    id="filter-radio-example-3"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="focus:ring-blue-500border-gray-600bg-gray-700ring-offset-gray-800focus:ring-blue-600 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
                  />
                  <label
                    htmlFor="filter-radio-example-3"
                    className="text-gray-900text-gray-300 ml-2 w-full rounded text-sm font-medium"
                  >
                    Last 30 days
                  </label>
                </div>
              </li>
              <li>
                <div className="hover:bg-gray-100hover:bg-gray-600 flex items-center rounded p-2">
                  <input
                    id="filter-radio-example-4"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="focus:ring-blue-500border-gray-600bg-gray-700ring-offset-gray-800focus:ring-blue-600 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
                  />
                  <label
                    htmlFor="filter-radio-example-4"
                    className="text-gray-900text-gray-300 ml-2 w-full rounded text-sm font-medium"
                  >
                    Last month
                  </label>
                </div>
              </li>
              <li>
                <div className="hover:bg-gray-100hover:bg-gray-600 flex items-center rounded p-2">
                  <input
                    id="filter-radio-example-5"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="focus:ring-blue-500border-gray-600bg-gray-700ring-offset-gray-800focus:ring-blue-600 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
                  />
                  <label
                    htmlFor="filter-radio-example-5"
                    className="text-gray-900text-gray-300 ml-2 w-full rounded text-sm font-medium"
                  >
                    Last year
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="text-gray-500text-gray-400 h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="focus:ring-blue-500border-gray-600bg-gray-700text-whiteplaceholder-gray-400focus:border-blue-500focus:ring-blue-500 block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <table className="text-gray-500text-gray-400 w-full text-left text-sm">
        <thead className="text-gray-700bg-gray-700text-gray-400 bg-gray-50 text-xs uppercase">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="focus:ring-blue-500border-gray-600bg-gray-700ring-offset-gray-800focus:ring-blue-600 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="py-3 px-6">
              Product name
            </th>
            <th scope="col" className="py-3 px-6">
              Color
            </th>
            <th scope="col" className="py-3 px-6">
              Category
            </th>
            <th scope="col" className="py-3 px-6">
              Price
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
