import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const TextInput = ({ field, form, type, label, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...field}
          {...props}
          type={type === "password" && !showPassword ? "password" : "text"}
          className="input w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {type === "password" && (
          <span
            className="password-toggle-icon absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="text-gray-500"
            />
          </span>
        )}
      </div>
      {form.errors[field.name] && form.touched[field.name] && (
        <span className="text-sm text-red-500">{form.errors[field.name]}</span>
      )}
    </div>
  );
};

export default TextInput;