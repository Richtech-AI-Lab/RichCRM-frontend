import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, XButton, AuthFormContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest } from "../../../redux/actions/authActions";
import StepIndicator from "./StepIndicator";
import { ROUTES } from "../../../constants/api";

const ForgotPasswordThree = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forgotPassword = useSelector((state) => state.auth.forgotPassword);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values, "Here values");
    // dispatch(forgotPasswordRequest(values));
    navigate(ROUTES.DASHBOARD);
  };

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthFormContainer
      title="Set new password"
      subtitle="Enter a new password to reset the password on your account. We’ll ask for this password whenever you log in"
      stepIndicator={<StepIndicator currentStep={2} />}
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
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              field={{ name: "password" }}
              form={{ errors, touched }}
            />
            <TextInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              field={{ name: "confirmPassword" }}
              form={{ errors, touched }}
            />
            <div className="text-center mb-8 mt-8">
              <XButton
                type="submit"
                text="Continue"
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

export default ForgotPasswordThree;
