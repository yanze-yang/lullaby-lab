import React from "react";
import type {
  UseFormRegister,
  // useForm, // don't need this import
} from "react-hook-form";

import type { ProductFormData } from "../../types";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: "name" | "id" | "image" | "price" | "description";
  register: UseFormRegister<ProductFormData>;
  required: boolean;
  // errors: any;
  // props:
};

export const Field: React.FC<Props> = ({
  label,
  register,
  required,
  // errors,
  ...props
}) => {
  return (
    <>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label.toLocaleUpperCase()}
      </label>
      <input
        {...props}
        {...register(label, { required })}
        className={`block w-full rounded-lg border border-gray-300 ${
          props.readOnly ? "cursor-not-allowed bg-gray-300" : "bg-gray-50"
        } p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
      />
    </>
  );
};
