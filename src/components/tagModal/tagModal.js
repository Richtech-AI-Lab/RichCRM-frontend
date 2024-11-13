import React, { useState } from "react";
import { Formik, Field } from "formik";
import { Label, Modal, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import Tag from "../../pages/cases/casedetails/tag";
import XButton from "../button/XButton";


const TagModal = ({ onSubmit, onClose }) => {
    const tagDetails = useSelector((state) => state.tag.tag);
    const handleNewContact = async (values) => { 
        console.log(values, "values")
    };
    const handleTagChange = (tags, handleChange) => {
        handleChange({ target: { name: 'tags', value: tags } });
    };
    const toggleEdit = () => {

    };
    const initialValues = {}
    return (
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
            <Modal.Header className="border-b-0">
                <div>
                    <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
                        Individual Labels
                    </h2>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleNewContact}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                    }) => (

                        <form onSubmit={handleSubmit} className="participant-form">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-12">
                                    <Tag 
                                    title="Create Tags" 
                                    tags={values.tags} 
                                    tagDetails={tagDetails} 
                                    // errors={errors.tags || []}
                                    // touched={touched.tags || []} 
                                    setTags={(tags) => handleTagChange(tags, handleChange)} 
                                    />
                                </div>
                                <div className="col-span-12 text-end">
                                        {/* <XButton
                                            text={"Close"}
                                            onClick={onClose}
                                            className="bg-card-300 text-sm text-secondary-800 py-[10px] px-6 rounded-[100px]"
                                        /> */}
                                        {/* <XButton
                                            type="submit"
                                            text={"Submit"}
                                            className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                                        /> */}
                                    </div>
                            </div >
                        </form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default TagModal;
