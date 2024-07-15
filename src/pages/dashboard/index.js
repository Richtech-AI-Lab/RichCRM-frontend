import React from "react";
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
    // <div className="container mx-auto">
    //   <div className="my-8">
    //     <h2 className="text-center text-2xl">Welcome, {user && user.email}</h2>
    //   </div>
    //   <div className="text-center">
    //     <XButton color="blue" onClick={handleLogout}>
    //       Logout
    //     </XButton>
    //   </div>
    // </div>
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="card">
            <p className="text-secondary-100 text-base leading-6 mb-1">Gee - 535 W 52nd St #9G coop</p>
            <p className="text-xl font-medium leading-[30px] mb-[18px]"><span>FEK due in</span><span className="text-text-red ml-2">7 days</span></p>
            <div className="text-right py-2">
              <a className="font-medium text-base leading-5 text-secondary-300">Ignore</a>
              <a className="font-medium text-base leading-5 text-text-blue ml-8">View Details</a>
            </div>
          </div>
          <div className="card">
            <p className="text-secondary-100 text-base leading-6 mb-1">Gee - 535 W 52nd St #9G coop</p>
            <p className="text-xl font-medium leading-[30px] mb-[18px]"><span>FEK due in</span><span className="text-text-red ml-2">7 days</span></p>
            <div className="text-right py-2">
              <a className="font-medium text-base leading-5 text-secondary-300">Ignore</a>
              <a className="font-medium text-base leading-5 text-text-blue ml-8">View Details</a>
            </div>
          </div>
          <div className="card">
            <p className="text-secondary-100 text-base leading-6 mb-1">Gee - 535 W 52nd St #9G coop</p>
            <p className="text-xl font-medium leading-[30px] mb-[18px]"><span>FEK due in</span><span className="text-text-red ml-2">7 days</span></p>
            <div className="text-right py-2">
              <a className="font-medium text-base leading-5 text-secondary-300">Ignore</a>
              <a className="font-medium text-base leading-5 text-text-blue ml-8">View Details</a>
            </div>
          </div>
          <div className="card">
            <p className="text-secondary-100 text-base leading-6 mb-1">Gee - 535 W 52nd St #9G coop</p>
            <p className="text-xl font-medium leading-[30px] mb-[18px]"><span>FEK due in</span><span className="text-text-red ml-2">7 days</span></p>
            <div className="text-right py-2">
              <a className="font-medium text-base leading-5 text-secondary-300">Ignore</a>
              <a className="font-medium text-base leading-5 text-text-blue ml-8">View Details</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-1">
          <div className="card">
            <div className="flex justify-between items-center">
              <span className="text-xl leading-[30px]">Upcoming Events</span>
              <a className>View All</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
