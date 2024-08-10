import React from "react";

const SelectInput = ({
  disabled=false,
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  touched,
  inputClassName,
  labelClassName,
  defaultLabel,
  className
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className={labelClassName}
        >
          {label}
        </label>
      )}
      <select
        disabled={disabled}  
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={inputClassName}
      >
        {defaultLabel && <option value="" disabled className="bg-bg-input" label={defaultLabel} />}
        {options?.map((option) => (
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
