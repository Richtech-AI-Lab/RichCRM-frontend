import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthFormContainer,
  SelectInput,
  TextInput,
  XButton,
  XSpinnerLoader,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearData, registerRequest } from "../../../redux/actions/authActions";
import { ROUTES } from "../../../constants/api";

const userRole = {
  ADMIN: 0,
  ATTORNEY: 1,
  CLIENT: 2,
};

const roleOptions = [
  { value: userRole.ADMIN, label: "Admin" },
  { value: userRole.ATTORNEY, label: "Attorney" },
  { value: userRole.CLIENT, label: "Client" },
];

const Signup = () => {
  const { loading, user,error } = useSelector((state) => state.auth.register);
  let navigate = useNavigate();
  const dispatch=useDispatch();

  const initialValues = {
    // firstName: "",
    // lastName: "",
    userName: "",
    emailAddress: "",
    password: "",
    // confirmPassword: "",
    role: "",
  };
  const validationSchema = Yup.object({
    userName: Yup.string().required("User name is required"),

    // firstName: Yup.string().required("firstName is required"),
    // lastName: Yup.string().required("lastName is required"),
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      // )
      ,
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .required("Confirm password is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSignup = (values, { setSubmitting , resetForm }) => {
    const payload = {
      emailAddress: values.emailAddress,
      password: values.password,
      userName: values.userName,
      role: parseInt(values.role),
    };
    dispatch(registerRequest(payload));
    setSubmitting(false);
    resetForm();

  }

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
  const handleBackIcon = () => {
    navigate(ROUTES.LOGIN)
  }
  return (
    <>
      <XSpinnerLoader loading={loading} size="lg" />
      <AuthFormContainer title={'Sign up'} subtitle={'Create your account by filling the form below.'}>
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
            <form onSubmit={handleSubmit} className="login-form">
              {/* <div className="grid grid-cols-2 gap-4">
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
              </div> */}
              <TextInput
                name="userName"
                type="text"
                placeholder="Username"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                field={{ name: "userName" }}
                form={{ errors, touched }}
              />
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
              />
              {/* <TextInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                field={{ name: "confirmPassword" }}
                form={{ errors, touched }}
              /> */}
              <SelectInput
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={roleOptions}
                    error={errors.role}
                    touched={touched.role}
                    inputClassName={` select-input-arrow bg-input-surface  w-full py-[14px] px-6 ${
                      errors.role && touched.role
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-full border-0 focus:outline-none focus:ring-transparent sm:text-sm`}
                    labelClassName="block text-sm font-medium text-gray-700"
                    defaultLabel="Select role"
                    className="mt-4"
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
