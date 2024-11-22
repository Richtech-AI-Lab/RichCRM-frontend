import React, { useState } from "react";
import OneDrive from "../../components/onedrive";
import LangChainAgent from "../../components/langchain/agent";


const Documents = () => {
    return (
        <div className="mt-14">
            <OneDrive />
            {/* <LangChainAgent /> */}
        </div>
    );
}

export default Documents;