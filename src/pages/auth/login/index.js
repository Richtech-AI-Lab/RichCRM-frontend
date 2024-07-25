import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginRequest } from "../../../redux/actions/authActions";
import { TextInput, XButton, XSpinnerLoader, AuthFormContainer } from "../../../components";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, user } = useSelector((state) => state.auth.login);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
      ),
  });

  const handleLogin = (values, { setSubmitting }) => {
    // dispatch(loginRequest());
    dispatch(loginRequest(values));
    setSubmitting(false);
  };

  useEffect(() => {
    if (user) {
      toast("User has successfully logged in");
      navigate("/rich-crm/dashboard");
    }
  }, [user, navigate]);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPassword=()=>{
    navigate("/forgot-password");
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
                name="email"
                type="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                field={{ name: "email" }}
                form={{ errors, touched }}
              // label="Email"
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
              <p className="text-end mb-6"><a className="text-primary2 text-sm leading-5 font-medium mt-2" onClick={handleForgotPassword}>Forgot password?</a></p>
              <div className="text-center mb-8">
                <XButton
                  type="submit"
                  text={isSubmitting ? "Logging in..." : "Log in"}
                  disabled={isSubmitting}
                  className="bg-primary text-sm text-white py-[10px] px-6 w-[145px] rounded-[100px]"
                />

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
