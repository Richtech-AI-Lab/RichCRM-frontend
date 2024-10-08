import React, { useState } from "react";

const AttorneyDetails = ({ attorneyDetails, title }) => {


    return (
        <div className="bg-white p-4 rounded-2xl mb-5">
            {<div className="flex justify-between items-center mb-5">
                <span className="text-base text-secondary-800 font-medium">{title}</span>
                {/* <div className="flex items-center gap-2">
          <BsThreeDotsVertical className="text-lg opacity-40" />
        </div> */}
            </div>}
            {attorneyDetails?.length > 0 ? (
                <ul className="card-details">
                    {attorneyDetails.map((attorney, index) => (
                        <React.Fragment key={index}> 
                            <li>
                                {/* <span className="left-txt flex items-center">{`${attorney?.firstName} ${attorney?.lastName}`}</span> */}
                                <span className="left-txt flex items-center">{`${attorney?.firstName} ${attorney?.lastName}`}</span>
                                <span className="left-txt flex items-center">{`${attorney?.contactId}`}</span>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            ) : (
               "" // Provide a message if no details are found
            )}

        </div>

    )
};

export default AttorneyDetails;
