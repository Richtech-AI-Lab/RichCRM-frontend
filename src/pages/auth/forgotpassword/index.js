import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, XButton, AuthFormContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest } from "../../../redux/actions/authActions";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forgotPassword = useSelector((state) => state.auth.forgotPassword);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values, "Here values");
    dispatch(forgotPasswordRequest(values));
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <AuthFormContainer
      title="Forgot Password"
      subtitle="Enter your email and we'll send you a link to reset your password."
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
          <form onSubmit={handleSubmit} className="login-form">
            <TextInput
              name="email"
              type="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              field={{ name: "email" }}
              form={{ errors, touched }}
            />
            <div className="text-center mb-8 mt-8">
              <XButton
                type="submit"
                text="Continue"
                disabled={isSubmitting}
                className="bg-primary text-sm text-white py-[10px] px-6 w-[145px] rounded-[100px]"
              />
            </div>

            <p className="text-center text-sm font-medium text-secondary-700">
              <a
                className="flex items-center justify-center  text-primary2"
                onClick={handleLoginClick}
              >
                <IoChevronBackOutline className="mr-2 text-lg" />
                Back to Login
              </a>
            </p>
          </form>
        )}
      </Formik>
    </AuthFormContainer>
  );
};

export default ForgotPassword;
