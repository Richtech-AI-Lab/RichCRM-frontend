import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, XButton, AuthFormContainer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest } from "../../../redux/actions/authActions";
import StepIndicator from "./StepIndicator";
import { ROUTES } from "../../../constants/api";

const ForgotPasswordTwo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forgotPassword = useSelector((state) => state.auth.forgotPassword);

  const initialValues = {
    code: "",
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Code is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values, "Here values");
    // dispatch(forgotPasswordRequest(values));
    navigate(ROUTES.FORGOT_PASSWORD_THREE);
  };

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthFormContainer
      title="Password Reset"
      subtitle={
        <>
          We sent a code to{" "}
          <span style={{ fontWeight: "bold" }}>xxxxxxx@xxxx.xxx</span>
        </>
      }
      stepIndicator={<StepIndicator currentStep={1} />}
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
              name="code"
              type="text"
              placeholder="Enter the Code"
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              field={{ name: "code" }}
              form={{ errors, touched }}
            />
            <p className="text-end mb-6">
              <a className="text-primary2 text-sm leading-5 font-medium mt-2">
                Click to resend
              </a>
            </p>
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

export default ForgotPasswordTwo;
