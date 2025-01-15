import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { Checkbox, Label, Modal, Spinner } from 'flowbite-react';
import XButton from "../button/XButton";
import NewCaseDropdown from "../newcasedropdown";
import TextInput from "../TextInput";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { createTaskRequest } from "../../redux/actions/taskActions";
import { createTemTaskRequest } from "../../redux/actions/templateTaskActions";


const AddTaskModal = ({ onClose, stageId, currentStep }) => {
    const dispatch = useDispatch();

    const typeOption = [
        { value: 0, label: "ACTION" },
        { value: 1, label: "CONTACT" },
        { value: 2, label: "UPLOAD" }
    ];

    const statusOption = [
        { value: 0, label: "NOT_STARTED" },
        { value: 1, label: "PENDING" },
        { value: 2, label: "FINISHED" },
        { value: 3, label: "OVERDUE" }
    ];

    const handleNewTask = async (values) => {
        try {
            const payload = {
                taskPayload: {
                    taskType: values.taskType,
                    name: values.name,
                    status: values.status,
                    stageId: stageId,
                    templates: ''
                },
                temptaskPayload: {
                    taskName: values.name,
                    creatorId: localStorage.getItem("authEmail"),
                    stage: currentStep,
                    taskType: values.taskType
                }
            }
            dispatch(createTemTaskRequest(payload?.temptaskPayload));
            dispatch(createTaskRequest(payload?.taskPayload));
            onClose();
        } catch (error) {
            console.error("Error while creating new task", error);
            // toast.error("An error occurred while creating the case.");
        }
    };

    const initialValues = {
        taskType: '',
        name: '',
        status: '',
        templates: ''
    };

    const validationSchema = Yup.object({
        taskType: Yup.string().required('Task Type is required'),
        name: Yup.string().required('Task name is required'),
        status: Yup.string().required('Task status is required'),
    });
    return (
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
            <Modal.Header className="border-b-0">
                {true && <div className="flex flex-col justify-center items-start gap-2 self-stretch">
                    <span className="font-sans text-[28px] font-medium leading-[36px]">Add a task</span>
                    <p className="font-sans text-sm font-normal leading-[20px] tracking-[0.25px]">Create a task by filling the basic information about the task.</p>
                </div>}
            </Modal.Header>

            <Modal.Body className="flex items-center self-stretch p-3 px-4">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleNewTask}
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

                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="flex flex-col gap-8 w-full">
                                <div className='flex flex-col gap-4 self-stretch'>
                                    <div className={`text-base font-medium leading-6 tracking-wide`}>Task Type</div>
                                    <div className={`items-dropdown single-select gray-btn `}  >
                                        <NewCaseDropdown
                                            name="taskType"
                                            value={values.taskType}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            options={typeOption}
                                            field={{ name: "taskType" }}
                                            form={{ errors, touched }}
                                        />
                                        {touched?.taskType && errors?.taskType ? (
                                            <div className="text-red-500 text-sm">
                                                {errors.taskType}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 self-stretch'>
                                    <div className={`text-base font-medium leading-6 tracking-wide`}>Task Name</div>
                                    <TextInput
                                        name="name"
                                        type="text"
                                        placeholder="Task Name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        field={{ name: "name" }}
                                        form={{ errors, touched }}
                                    />
                                </div>
                                <div className='flex flex-col gap-4 self-stretch'>
                                    <div className={`text-base font-medium leading-6 tracking-wide`}>Task Status</div>
                                    <div className={`items-dropdown single-select gray-btn `}  >
                                        <NewCaseDropdown
                                            name="status"
                                            value={values.status}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            options={statusOption}
                                            field={{ name: "status" }}
                                            form={{ errors, touched }}
                                        />
                                        {touched?.status && errors?.status ? (
                                            <div className="text-red-500 text-sm">
                                                {errors.status}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex gap-4 justify-end">
                                    <XButton
                                        text={"Cancel"}
                                        onClick={onClose}
                                        // disabled={isSubmitting}
                                        className="bg-card-300 text-sm text-primary2 py-[10px] px-6 rounded-[100px]"
                                    />
                                    <XButton
                                        type="submit"
                                        text={"Create"}
                                        // disabled={isSubmitting}
                                        className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px]"
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default AddTaskModal;
