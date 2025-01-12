import React, { useEffect, useState } from "react";
import { CaseCardDetails, SelectInput, XButton } from "../../../components";
import { Field, Formik } from "formik";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IMAGES } from "../../../constants/imagePath";
import states from "../../../constants/states.json"
import { Textarea } from "flowbite-react";
import MenuPopup from "../../../components/menupopup";


const ContactOrganizationEditForm = ({ initialValues, onSubmit, values, form, setFieldValue, handleChange, handleBlur }) => {
    const menuOption = [
        'option1', 'option2', 'option3'
    ];

    return (
        <>

            <div className="bg-white p-4 rounded-2xl mb-5 shadow-shadow-light">
                <div className="flex justify-between items-center mb-6 ">
                    <div>
                        <span className="md:text-[22px] lg:text-lg block mb-2 leading-7 text-secondary-800 font-medium">Individual Contact</span>
                        {/* <p className="text-base leading-6 text-secondary-800 font-medium">{address}</p> */}
                    </div>
                    <MenuPopup dropdownItems={menuOption} icon={<BsThreeDotsVertical className="text-secondary-800 opacity-40" />} />

                </div>
                <ul className="card-details">
                    <li>
                        <div className="flex justify-center items-center text-purple-700 text-ce">
                            <div className="">
                                + Add a Contact

                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="bg-white p-1 rounded-2xl mb-5 shadow-shadow-light">
                <Textarea
                    name="note"
                    type="text"
                    placeholder="Add a note for "
                    className="bg-white resize-none border-none h-60 py-3 px-4"
                    value={values?.note}
                    onChange={handleChange}
                    onBlur={handleBlur}

                />
            </div>


        </>
    );
};

export default ContactOrganizationEditForm;

