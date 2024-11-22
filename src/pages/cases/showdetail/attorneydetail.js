import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import { setSelectedContact } from "../../../redux/actions/contactActions";

const AttorneyDetails = ({ attorneyDetails, title }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [collapse, setCollapse] = useState(false);

    const handleNavigate = (item) => {
        dispatch(setSelectedContact(null));
        localStorage.removeItem("contact_id");
        setTimeout(() => {
            dispatch(setSelectedContact(item));
            localStorage.setItem("contact_id", item.contactId);
            navigate(ROUTES.CONTACT_PARTNER, { active: 0 });
        }, 0);
    }
    return (
        <>
            {
                collapse ? <div className="bg-white p-4 rounded-2xl mb-5">
                    {
                        <div className="flex justify-between items-center mb-5">
                            <span className="text-base text-secondary-800 font-medium">{title}</span>
                            <div className="flex items-center gap-2">
                                <button className="rotate-180 active" onClick={() => { setCollapse(false) }}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="h-6 w-6 shrink-0 rotate-180" data-testid="flowbite-accordion-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                            </div>
                        </div>
                    }</div> :

                    <div className="bg-white p-4 rounded-2xl mb-5">
                        {<div className="flex justify-between items-center mb-5">
                            <span className="text-base text-secondary-800 font-medium">{title}</span>
                            <div className="flex items-center gap-2">
                                <button className="rotate-180 active" onClick={() => { setCollapse(true) }}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="h-6 w-6 shrink-0" data-testid="flowbite-accordion-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                            </div>
                        </div>}
                        {attorneyDetails?.length > 0 ? (
                            <ul className="card-details">
                                {attorneyDetails.map((attorney, index) => (
                                    <React.Fragment key={index}>
                                        <li>
                                            {/* <span className="left-txt flex items-center">{`${attorney?.firstName} ${attorney?.lastName}`}</span> */}
                                            <span className="left-txt flex items-center">{`${attorney?.company}`}</span>
                                            <span onClick={()=>handleNavigate(attorney)} className="left-txt flex items-center cursor-pointer underline" style={{color:"#366093"}}>{`${attorney?.lastName}, ${attorney?.firstName}`}</span>
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ul>
                        ) : (
                            "" // Provide a message if no details are found
                        )}

                    </div>
            }
        </>

    )
};

export default AttorneyDetails;
