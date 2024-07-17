import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  SelectInput,
  TextInput,
  XButton,
  XSpinnerLoader,
} from "../../../components";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { loading, user } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSignup = (values, { setSubmitting }) => {
    setSubmitting(false);
    if(values){
        navigate("/rich-crm/dashboard");
    }
  };
  
  return (
    <>
      <XSpinnerLoader loading={loading} size="lg" />
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-center mt-5 mb-3 text-2xl">Sign Up</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className="signup-form">
                  <TextInput
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    field={{ name: "username" }}
                    form={{ errors, touched }}
                    label="Username"
                  />
                  <TextInput
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    field={{ name: "email" }}
                    form={{ errors, touched }}
                    label="Email"
                  />
                  <TextInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    field={{ name: "password" }}
                    form={{ errors, touched }}
                    label="Password"
                  />
                  <TextInput
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    field={{ name: "confirmPassword" }}
                    form={{ errors, touched }}
                    label="Confirm Password"
                  />
                  <SelectInput
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={[{ value: "admin", label: "Admin" }]}
                    error={errors.role}
                    touched={touched.role}
                    label="Role"
                  />
                  <div className="text-center w-full mt-4">
                    <XButton
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="signup-button"
                    >
                      {isSubmitting ? "Signing up..." : "Submit"}
                    </XButton>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
