import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import XButton from "../../components/button/XButton";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <header className="my-4">
            <h2 className="text-center">Welcome, {user && user?.email}</h2>
          </header>
          <div className="text-center">
            <XButton variant="primary" onClick={handleLogout}>
              Logout
            </XButton>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
