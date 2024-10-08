import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal } from "flowbite-react";
import { FieldArray, useFormikContext } from "formik";
import { Label, TextInput, XButton } from "../../../components";
import { IMAGES } from "../../../constants/imagePath";
import { useDispatch } from "react-redux";
import { createAttorneyRequest } from "../../../redux/actions/contactActions";

const CaseAttorneyItems = ({ title, attorneys, setAttorneys, attorneyDetails, errors, touched }) => {
    const dispatch = useDispatch();
    const { values, setFieldValue } = useFormikContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAttorney, setNewAttorney] = useState({
        contactType: '',
        firstName: '',
        lastName: '',
        email: '',
        cellNumber: ''
    });

    useEffect(() => {
        if (attorneyDetails && attorneyDetails.length > 0) {
            setFieldValue("attorneys", attorneyDetails);
        }
    }, [attorneyDetails, setFieldValue]);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addAttorneyItem = (push) => {
        if (newAttorney.contactType && newAttorney.firstName && newAttorney.lastName && newAttorney.email && newAttorney.cellNumber) {
            dispatch(createAttorneyRequest(newAttorney))
            // push({
            //     contactId: `new${Date.now()}`, // Changed key to contactId
            //     contactType: newAttorney.contactType, // Changed key to contactType
            //     firstName: newAttorney.firstName,
            //     lastName: newAttorney.lastName,
            //     email: newAttorney.email,
            //     cellNumber: newAttorney.cellNumber // Changed key to cellNumber
            // });
            setNewAttorney({ contactType: '', firstName: '', lastName: '', email: '', cellNumber: '' });
            closeModal();
        }
    };

    return (
        <div className="bg-white p-4 rounded-2xl mb-5">
            {title &&
                <div className="flex justify-between items-center mb-5">
                    <span className="text-base text-secondary-800 font-medium">{title}</span>
                    <div className="flex items-center gap-2">
                        <BsThreeDotsVertical className="text-lg" />
                    </div>
                </div>
            }

            <FieldArray
                name="attorneys"
                render={({ push, remove }) => (
                    <>
                        <ul className="card-details">
                            {attorneys?.map((item, index) => (
                                <li key={item.contactId} className="flex justify-between">
                                    <span className="left-txt flex items-center">
                                        <span className="icon mr-2 cursor-pointer" onClick={() => remove(index)}>
                                            <img src={IMAGES.removeIcon} alt="icon" />
                                        </span>
                                        {item.firstName} {item.lastName} ({item.contactType})
                                    </span>
                                    <input
                                        className="text-right border-none focus:ring-transparent"
                                        placeholder="Update details"
                                        value={`${item.email} | ${item.cellNumber}`}
                                        readOnly
                                    />
                                </li>
                            ))}
                            <li className="flex justify-between add-attorney">
                                <span className="left-txt flex items-center">
                                    <span className="icon mr-2 cursor-pointer" onClick={openModal}>
                                        <img src={IMAGES.addIcon} alt="icon" />
                                    </span>
                                    Add an attorney
                                </span>
                            </li>
                        </ul>

                        <Modal show={isModalOpen} size="md" onClose={closeModal} className="new-case-modal">
                            <Modal.Header className="border-b-0">
                                <div>
                                    <h2 className="mb-2 text-2xl leading-9 font-medium text-secondary-800">Add Attorney</h2>
                                </div>
                            </Modal.Header>
                            <Modal.Body className="pt-0">
                                <div>
                                    <div>
                                        <Label value="Attorney Type" className="block mb-2" />
                                        <TextInput
                                            type="text"
                                            value={newAttorney.contactType}
                                            onChange={(e) => setNewAttorney({ ...newAttorney, contactType: e.target.value })}
                                            placeholder="Attorney Type"
                                        />
                                    </div>
                                    <div>
                                        <Label value="First Name" className="block mb-2 mt-4" />
                                        <TextInput
                                            type="text"
                                            value={newAttorney.firstName}
                                            onChange={(e) => setNewAttorney({ ...newAttorney, firstName: e.target.value })}
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div>
                                        <Label value="Last Name" className="block mb-2 mt-4" />
                                        <TextInput
                                            type="text"
                                            value={newAttorney.lastName}
                                            onChange={(e) => setNewAttorney({ ...newAttorney, lastName: e.target.value })}
                                            placeholder="Last Name"
                                        />
                                    </div>
                                    <div>
                                        <Label value="Email" className="block mb-2 mt-4" />
                                        <TextInput
                                            type="email"
                                            value={newAttorney.email}
                                            onChange={(e) => setNewAttorney({ ...newAttorney, email: e.target.value })}
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div>
                                        <Label value="Cell Phone" className="block mb-2 mt-4" />
                                        <TextInput
                                            type="tel"
                                            value={newAttorney.cellNumber}
                                            onChange={(e) => setNewAttorney({ ...newAttorney, cellNumber: e.target.value })}
                                            placeholder="Cell Phone"
                                        />
                                    </div>
                                    <div className="text-end mt-8">
                                        <XButton
                                            text={"Cancel"}
                                            className="bg-card-300 text-sm text-secondary-800 py-[10px] px-6 rounded-[100px]"
                                            onClick={closeModal}
                                        />
                                        <XButton
                                            type="submit"
                                            text={"Submit"}
                                            onClick={() => addAttorneyItem(push)}
                                            className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                                        />
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
                )}
            />
        </div>
    );
};

export default CaseAttorneyItems;
