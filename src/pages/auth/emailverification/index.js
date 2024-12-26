import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams, Outlet } from "react-router-dom";

import { getRequest } from "../../../axios/interceptor";
import { API_ENDPOINTS } from "../../../constants/api";

const EmailVerification = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const v_token = searchParams.get("v_token"); // "v_token"

    useEffect(() => {
        const verifyEmail = async () => {
            const res = await getRequest(`${API_ENDPOINTS.ACCOUNT_VERIFICATION}/${v_token}`);

            console.log(res);

            if (res.status === 200) {
                navigate('/');
                toast.success("Account verified successfully!");
            } else {
                navigate('/register');
                toast.error("Failed to verify account!");
                console.log(res);

                if (res.status === 200) {
                    navigate('/');
                    toast.success("Account verified successfully!");
                } else {
                    navigate('/register');
                    toast.error("Failed to verify account!");
                }
            };
        };

        verifyEmail();
    }, []);
    
    return (
        <Outlet />
    );
}

export default EmailVerification;