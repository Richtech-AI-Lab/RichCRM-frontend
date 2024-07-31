import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearData, loginRequest } from "../../../redux/actions/authActions";
import { TextInput, XButton, XSpinnerLoader, AuthFormContainer } from "../../../components";
import { ROUTES } from "../../../constants/api";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, user ,error} = useSelector((state) => state.auth.login);
  const initialValues = {
    emailAddress: "",
    password: "",
  };
  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
      // )
      ,
  });

  const handleLogin = (values, { setSubmitting, resetForm }) => {
    dispatch(loginRequest(values));
    setSubmitting(false);
    resetForm();
  };

  useEffect(() => {
    if (user && user?.status === 'success') {
      toast(user?.message);
      navigate(ROUTES.DASHBOARD);
    }  
      else if (error && error?.status === 'failed') {
          toast(error?.message)
        }
        dispatch(clearData());

  }, [user, error,navigate]);

  const handleRegisterClick = () => {
    navigate(ROUTES.REGISTER);
  };

  const handleForgotPassword=()=>{
    navigate(ROUTES.FORGOT_PASSWORD_ONE);
  }

  return (
    <>
      <XSpinnerLoader loading={loading} size="lg" />
      <AuthFormContainer title={'Log in'} subtitle={'Welcome! Select method to log in.'}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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
                name="emailAddress"
                type="email"
                placeholder="Email"
                value={values.emailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                field={{ name: "emailAddress" }}
                form={{ errors, touched }}
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
              // label="Password"
              />
              <div className="text-center mb-8 mt-8">
                <XButton
                  type="submit"
                  text={isSubmitting ? "Logging in..." : "Log in"}
                  disabled={isSubmitting}
                  className="bg-primary text-sm text-white py-[10px] px-6 w-[145px] rounded-[100px]"
                />
                <p className="text-center mb-6 mt-6"><a className="text-primary2 text-sm leading-5 font-medium mt-2" onClick={handleForgotPassword}>Forgot password?</a></p>

                {/* <XButton
                    onClick={handleRegisterClick}
                    text="Sign Up"
                    className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px]"
                  /> */}
              </div>
              <p className="text-center text-sm font-medium text-secondary-700">Need an account? <a className="ml-6 text-primary2" onClick={handleRegisterClick}>Sign up now</a></p>
            </form>
          )}
        </Formik>
      </AuthFormContainer>

    </>
  );
};

export default Login;
