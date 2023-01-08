import React from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import type { IProduct, IOrder } from "../../types";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";

import ReactSelect from "react-select";

import { InputStyle, InputStyleReadOnly, LabelStyle } from "./FormStyle";
import moment from "moment";
import type { Prisma } from "@prisma/client";

interface IProductOption {
  value: string;
  label: string;
}

type Props = {
  order?: IOrder;
  products: IProduct[];
  operation: "create" | "update";
};

const OrderForm = ({ order, products, operation }: Props) => {
  const productsOptions: IProductOption[] = products?.map((product) => {
    return {
      value: product.id,
      label: product.name,
    };
  });

  type FormValues = {
    id: string;
    date: string;
    notes: string;
    addon: string;
    products: IProductOption[];
  };

  const defaultProductsOptions: IProductOption[] | undefined =
    order?.products?.map((product) => {
      return {
        value: product.id,
        label: product.name,
      };
    });

  const defaultValues: FormValues = {
    id: order?.id || "",
    date: moment().format("YYYY-MM-DD"),
    notes: order?.notes || "",
    addon: order?.addon?.toString() || "",
    products: defaultProductsOptions || [],
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const router = useRouter();
  const redirect = () => {
    setTimeout(() => {
      router.push("/order");
    }, 1000);
  };

  const onSubmit = (data: FormValues) => {
    if (operation === "update" && order) {
      // Convert price to number

      const update = axios.patch(`/api/orders/${order.id}`, data).then(() => {
        redirect();
      });

      toast.promise(update, {
        loading: "Loading",
        success: "Order updated",
        error: "Error updating order",
      });
    } else {
      const newOrder: Prisma.OrderUncheckedCreateInput = {
        date: moment(data.date).format(),
        notes: data.notes,
        addon: Number(data.addon),
        products: {
          connect: data.products.map((product) => {
            return {
              id: product.value,
            };
          }),
        },
      };

      const create = axios.post(`/api/orders`, newOrder).then(() => {
        redirect();
      });
      toast.promise(create, {
        loading: "Loading",
        success: "Order created",
        error: "Error creating order",
      });
    }
  };
  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto my-6 max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid  gap-6 md:grid-cols-2">
            {/* ID field */}
            {order && (
              <div>
                <label htmlFor={"id"} className={LabelStyle}>
                  ID *
                </label>
                <input
                  {...register("id", { required: true })}
                  className={InputStyleReadOnly}
                  placeholder="Id will be generated automatically"
                  readOnly
                />
                {errors.id && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            )}
            {/* Date field */}
            <div>
              <label htmlFor={"date"} className={LabelStyle}>
                Date *
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  {...register("date", { required: true })}
                  type="date"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Select date"
                />
              </div>
              {errors.date && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Notes field */}
            <div>
              <label htmlFor={"notes"} className={LabelStyle}>
                Notes (optional)
              </label>
              <input
                {...register("notes", { required: false })}
                className={InputStyle}
                defaultValue={order?.notes?.toString()}
              />
            </div>
            <div>
              <label htmlFor={"addon"} className={LabelStyle}>
                Add-On (optional)
              </label>
              <input
                {...register("addon", { required: false })}
                className={InputStyle}
                defaultValue={order?.addon?.toString()}
                type="number"
              />
            </div>
            {/* Products field */}
            <div>
              <label htmlFor={"products"} className={LabelStyle}>
                Products
              </label>
              <Controller
                render={({ field }) => (
                  <ReactSelect
                    id="selectbox"
                    instanceId="selectbox"
                    {...field}
                    options={productsOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isMulti
                    defaultValue={defaultProductsOptions}
                  />
                )}
                name="products"
                control={control}
              />
            </div>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            {operation === "update" ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
