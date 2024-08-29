import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";
import { Modal } from "flowbite-react";
import { FieldArray, useFormikContext } from "formik";
import { Label, TextInput, XButton } from "../../../components";
import { IMAGES } from "../../../constants/imagePath";

const CaseAttorneyItems = ({ title, attorneys, setAttorneys, errors, touched }) => {
    const { values, setFieldValue } = useFormikContext();
    // const [attorneyItems, setAttorneyItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addAttorneyItem = (push) => {
        if (newLabel) {
            push({ id: Date.now(), label: newLabel, placeholder: "Enter an attorney", value: "" });
            setNewLabel('');
            closeModal();
        }
    };
    // const addAttorneyItem = (push) => {
    //     const newId = attorneyItems.length ? attorneyItems[attorneyItems.length - 1]?.id + 1 : 1;
    //     setAttorneyItems([...attorneyItems, { id: newId, label: newLabel, placeholder: "Enter an attorney" }]);
    //     setNewLabel('');
    //     closeModal();
    // };

    // const removeAttorneyItem = (id) => {
    //     setAttorneyItems(attorneyItems.filter(item => item.id !== id));
    // };
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
                                <li key={item.id} className="flex justify-between">
                                    <span className="left-txt flex items-center">
                                        <span className="icon mr-2 cursor-pointer" onClick={() => remove(index)}>
                                            <img
                                                src={IMAGES.removeIcon}
                                                alt="icon"
                                            />
                                        </span>
                                        {item.label}
                                    </span>
                                    <input
                                        className="text-right border-none focus:ring-transparent"
                                        placeholder={item.placeholder}
                                        value={item.value || ''}
                                        onChange={(e) => {
                                            const updatedAttorneys = [...values.attorneys];
                                            updatedAttorneys[index] = { ...updatedAttorneys[index], value: e.target.value };
                                            setFieldValue("attorneys", updatedAttorneys);
                                        }}
                                    />
                                    {/* {touched[index] && errors[index] && (
                                        <div className="text-red-500 text-sm">
                                            {errors[index]}
                                        </div>
                                    )} */}
                                </li>
                            ))}
                            <li className={"flex justify-between add-attorney"}>
                                <span className="left-txt flex items-center">
                                    <span className="icon mr-2 cursor-pointer" onClick={openModal}>
                                        <img
                                            src={IMAGES.addIcon}
                                            alt="icon"
                                        />
                                    </span>
                                    Add a attorney
                                </span>
                            </li>
                        </ul>
                        {/* <Modal show={isModalOpen} size="md" onClose={closeModal} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="space-y-6">
                                    <div>
                                        <h2>Name of attorney</h2>
                                        <input
                                            type="text"
                                            value={newLabel}
                                            onChange={(e) => setNewLabel(e.target.value)}
                                            placeholder="Label"
                                        />
                                    </div>
                                    <button onClick={() => addAttorneyItem(push)}>Add</button>
                                </div>
                            </Modal.Body>
                        </Modal> */}
                        <Modal show={isModalOpen} size="md" onClose={closeModal} className="new-case-modal">
                            <Modal.Header className="border-b-0">
                                <div>
                                    <h2 className="mb-2 text-2xl leading-9 font-medium text-secondary-800">Add Attorney</h2>
                                </div>
                            </Modal.Header>
                            <Modal.Body className="pt-0">
                                <div>
                                    <div>
                                        <Label value="Name of attorney" className="block mb-2" />
                                        <TextInput
                                            type="text"
                                            value={newLabel}
                                            onChange={(e) => setNewLabel(e.target.value)}
                                            placeholder="Enter"
                                        />
                                    </div>
                                    <div className="text-end mt-8">
                                        <XButton
                                            text={"Cancel"}
                                            className="bg-card-300 text-sm text-secondary-800 py-[10px] px-6 rounded-[100px]"
                                        />
                                        <XButton
                                            type="submit"
                                            text={"Submit"}
                                            onClick={() => addAttorneyItem(push)}
                                            className="bg-primary text-sm text-white py-[10px] px-6 rounded-[100px] ml-4"
                                        />
                                    </div>
                                    {/* {/ <button onClick={addAttorneyItem}>Add</button > /} */}
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
                )}
            />
            {/* <ul className="card-details">
                {attorneyItems.map(item => (
                    <li className={"flex justify-between"}>
                        <span className="left-txt flex items-center">
                            <span className="icon mr-2 cursor-pointer" onClick={() => removeAttorneyItem(item.id)}>{<FaCircleMinus className="inline " />}
                            </span>
                            {item.label}
                        </span>
                        <input
                            className="text-right border-none focus:ring-transparent"
                            placeholder={item.placeholder}
                        />
                    </li>
                ))}
                <li className={"flex justify-between"}>
                    <span className="left-txt flex items-center">
                        <span className="icon mr-2 cursor-pointer" onClick={openModal}><IoIosAddCircle  className="text-xl ml-3" /> Add a attorney</span>
                    </span>
                </li>

            </ul>

            <Modal show={isModalOpen} size="md" onClose={closeModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <div>
                            <h2>Name of attorney</h2>
                            <input
                                type="text"
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                placeholder="Label"
                            />

                        </div>
                        <button onClick={addAttorneyItem}>Add</button>
                    </div>
                </Modal.Body>
            </Modal> */}
        </div>
    );
};

export default CaseAttorneyItems;

