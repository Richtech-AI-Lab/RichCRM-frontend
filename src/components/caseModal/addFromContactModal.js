import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Modal } from "flowbite-react";
import XButton from "../button/XButton";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addFromContactTab, clientType, contactTab } from "../../constants/constants";
import { IMAGES } from "../../constants/imagePath";
import ContactsActionbar from "../actionbar/contactsActionBar";
import AddFromContactListing from "../../pages/contacts/addFromContactListing";

const AddFromContactModal = ({ onClose }) => {

  const [activeTab, setActiveTab] = useState(addFromContactTab.BROKERS);
  const initialValues = {};

  const handleAddFromContact = async (values) => {
    // console.log(values, "Values");
  };

  return (
    <>
      <Modal show={true}  onClose={onClose} className="new-case-modal">
        <Modal.Header className="border-b-0">
          <div>
            <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
              Add from Contacts
            </h2>
            <p className="text-sm leading-5 text-secondary-700">
              Choose the contact you wish to add to the case.
            </p>
          </div>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <Formik
            initialValues={initialValues}
            // onSubmit={handleNewCaseInfo}
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
              <form onSubmit={handleSubmit} className="">
                <div className="">
                  <div className="relative">
                    <input
                      // className="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"

                      className="text-base text-secondary-700 font-normal leading-6 bg-input-surface py-2 px-6 rounded-[40px] w-full"
                      placeholder="Search Contacts"
                    />
                    <img
                      src={IMAGES.searchIcon}
                      alt="icon"
                      className="absolute right-5 top-[10px]"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <ContactsActionbar
                    active={activeTab}
                    setActive={setActiveTab}
                    isAddFromContactModal={true}
                  />
                <AddFromContactListing active={activeTab} />
                </div>

                <div className="text-end mt-8">
                  <XButton
                    text={"Cancel"}
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                  />
                  <XButton
                    type="submit"
                    text={"Add"}
                    disabled={isSubmitting}
                    className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                  />
                </div>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddFromContactModal;
