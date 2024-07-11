import React, { useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginRequest } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import XButton from "../../../components/button/XButton";
import { toast } from "react-toastify";
import XSpinnerLoader from "../../../components/spinnerLoader/XSpinnerLoader";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);
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
    dispatch(loginRequest(values));
    setSubmitting(false);
  };

  useEffect(() => {
    if (user) {
      toast("User has successfully logged in");
      navigate("/dashboard");
    }
  }, [user, navigate]);
  return (
    <>
      <XSpinnerLoader loading={loading} size="lg" />
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mt-5 mb-3">Login</h2>
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
                <Form noValidate onSubmit={handleSubmit} className="login-form">
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
                  <div className="text-center">
                    <XButton
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="login-button"
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </XButton>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
