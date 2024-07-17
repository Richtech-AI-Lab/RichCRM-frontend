import React from "react";

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  touched,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
          error && touched ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      >
        <option value="" label="Select role" />
        {options.map((option) => (
          <option key={option.value} value={option.value} label={option.label}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SelectInput;
