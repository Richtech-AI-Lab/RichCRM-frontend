import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';

const Docusign = () => {

    const hash = useLocation().hash;
    const { access_token, type, state } = queryString.parse(hash);


    return (
        <div>
            <h1>Docusign</h1>
            <p>Access Token: {access_token}</p>
            <p>Type: {type}</p>
            <p>State: {state}</p>
            {/* Render other query params as needed */}
        </div>
    );
}

export default Docusign;