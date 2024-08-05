import React, { useState } from "react";
import { CaseCardDetails } from "../../../components";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { IoLogoWechat } from "react-icons/io5";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { SlArrowRight } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";

const CaseAttorneyItems = ({ title }) => {
    const [attorneyItems, setAttorneyItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addAttorneyItem = () => {
        const newId = attorneyItems.length ? attorneyItems[attorneyItems.length - 1]?.id + 1 : 1;
        setAttorneyItems([...attorneyItems, { id: newId, label: newLabel, placeholder: "Enter an attorney" }]);
        setNewLabel('');
        closeModal();
    };

    const removeAttorneyItem = (id) => {
        setAttorneyItems(attorneyItems.filter(item => item.id !== id));
    };
    return (
        <div className="bg-white py-4 rounded-2xl mb-5">
            {title &&

                <div className="flex justify-between items-center mb-5 px-4">
                    <span className="text-base text-secondary-800 font-medium">{title}</span>
                    <div className="flex items-center gap-2">
                        <BsThreeDotsVertical className="text-lg" />
                    </div>
                </div>
            }
            <ul className="card-details">
                {attorneyItems.map(item => (
                    <li className={"flex justify-between"}>
                        <span className="left-txt flex items-center">
                            <span className="icon mr-2 cursor-pointer" onClick={() => removeAttorneyItem(item.id)}>delete{<SlArrowRight className="inline mr-10 " />}
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
                        <span className="icon mr-2 cursor-pointer" onClick={openModal}>Add
                        </span>
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
            </Modal>
        </div>
    );
};

export default CaseAttorneyItems;

