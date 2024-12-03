import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, XButton, AuthFormContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest } from "../../../redux/actions/authActions";
import StepIndicator from "./StepIndicator";
import { ROUTES } from "../../../constants/api";

const ForgotPasswordOne = () => {
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
    // console.log(values, "Here values");
    // dispatch(forgotPasswordRequest(values));
    navigate(ROUTES.FORGOT_PASSWORD_TWO)
  };

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthFormContainer
      title="Forgot Password?"
      subtitle="Enter the email address associated with your account and we’ll send you reset instructions."
      stepIndicator={<StepIndicator currentStep={0} />}
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
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              field={{ name: "email" }}
              form={{ errors, touched }}
            />
            <div className="text-center mb-8 mt-8">
              <XButton
                type="submit"
                text="Reset password"
                disabled={isSubmitting}
                className="bg-primary text-sm text-white py-[10px] px-6 w-[165px] rounded-[100px]"
              />
            </div>
            <p className="text-center text-sm font-medium text-secondary-700">
              <a className="flex items-center justify-center  text-primary2" onClick={handleLoginClick}>
                Back to log in
              </a>
            </p>
          </form>
        )}
      </Formik>
    </AuthFormContainer>
  );
};

export default ForgotPasswordOne;
