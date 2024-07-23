import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  AuthFormContainer,
  SelectInput,
  TextInput,
  XButton,
  XSpinnerLoader,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const Signup = () => {
  const { loading, user } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
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
    if (values) {
      navigate("/rich-crm/dashboard");
    }
  }

  const handleBackIcon = () => {
    navigate("/")
  }
  return (
    <>
      <XSpinnerLoader loading={loading} size="lg" />
      <AuthFormContainer title={'Sign up'} subtitle={'Create your account by filling the form below.'}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  field={{ name: "firstName" }}
                  form={{ errors, touched }}
                />
                <TextInput
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  field={{ name: "lastName" }}
                  form={{ errors, touched }}
                />
              </div>
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
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                field={{ name: "confirmPassword" }}
                form={{ errors, touched }}
              />
              <div className="text-center mb-8 mt-6">
                <XButton
                  type="submit"
                  text={isSubmitting ? "Signup in..." : "Sign up"}
                  disabled={isSubmitting}
                  className="bg-primary text-sm text-white py-[10px] px-6 w-[145px] rounded-[100px]"
                />

                {/* <XButton
                    onClick={handleRegisterClick}
                    text="Sign Up"
                    className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px]"
                  /> */}
              </div>
              <p className="text-center text-sm font-medium text-secondary-700">Already have an account? <a className="ml-6 text-primary2" onClick={handleBackIcon}>Log in here</a></p>
            </form>
          )}
        </Formik>
      </AuthFormContainer>
    </>
  );
};

export default Signup;
