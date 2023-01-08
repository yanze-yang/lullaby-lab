import React from "react";
import type {
  UseFormRegister,
  // useForm, // don't need this import
} from "react-hook-form";

import type { OrderFormData, ProductFormData } from "../../types";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: any;
  register: any;
  required?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // errors: any;
  // props:
};

export const Field: React.FC<Props> = ({
  label,
  register,
  required,
  handleChange,
  // errors,
  ...props
}) => {
  return (
    <>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label.charAt(0).toUpperCase() + label.slice(1)}{" "}
        {required ? "*" : "(optional)"}
      </label>

      {handleChange ? (
        <input
          {...props}
          {...register(label, { required })}
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
            props.readOnly && "cursor-not-allowed "
          }}`}
          onChange={(e) => handleChange(e)}
        />
      ) : (
        <input
          {...props}
          {...register(label, { required })}
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
            props.readOnly && "cursor-not-allowed "
          }}`}
        />
      )}
    </>
  );
};
