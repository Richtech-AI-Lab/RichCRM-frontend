import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams, Outlet } from "react-router-dom";
import { getRequest } from "../../../axios/interceptor";
import { API_ENDPOINTS } from "../../../constants/api";

const EmailVerification = () => {

    const [loading, setLoading] = useState(true); // indicates whether the verification is in progress
    const [message, setMessage] = useState(''); //display system message
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const v_token = searchParams.get("v_token"); // "v_token"

    useEffect(() => {
        const verifyEmail = async () => {

            if(!v_token) {
                setMessage("Invalid verification link!");
                toast.error("Invalid verification link!");
                setLoading(false); 
                setTimeout(() => navigate("/register"), 3500);
                return;
            }

            try {
                const res = await getRequest(`${API_ENDPOINTS.ACCOUNT_VERIFICATION}/${v_token}`);
                console.log(res);
                
                if (res.status === 200) {
                    setMessage("Account verified successfully. Redirecting...");
                    toast.success("Account verified successfully!");
                    setTimeout(() => navigate('/'), 3500);
                } else {
                    throw new Error ("verification failed");
                }
            } catch(error) {
                console.error("verification error:", error);
                setMessage("Verification failed. Please try again later.");
                toast.error("Failed to verify account!");
                setTimeout(() => navigate('/register'), 3500);
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [v_token, navigate]);
    
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {loading ? (<p>Verifying...</p>) : (<p>{message}</p>)}
          <Outlet />
        </div>
      );
    };

export default EmailVerification;