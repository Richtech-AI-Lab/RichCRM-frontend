import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const TextInput = ({ field, form, type, label, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group className="mt-3">
      {label && <Form.Label>{label}</Form.Label>}
      <div className="position-relative">
        <Form.Control
          {...field}
          {...props}
          type={type === "password" && !showPassword ? "password" : "text"}
          className="password-input"
        />
        {type === "password" && (
          <span
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        )}
      </div>
      {form.errors[field.name] && form.touched[field.name] && (
        <Form.Text className="text-danger">{form.errors[field.name]}</Form.Text>
      )}
    </Form.Group>
  );
};

export default TextInput;
