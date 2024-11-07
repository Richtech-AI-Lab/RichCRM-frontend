import React, { useEffect, useState } from "react";
import { Dropdown, Modal } from "flowbite-react";
import { FieldArray, useFormikContext } from "formik";
import { Label, TextInput, XButton } from "../../../components";
import { IMAGES } from "../../../constants/imagePath";
import { useDispatch } from "react-redux";
import { debounce, uniqueId } from "lodash";
import { createTagSuccess, deleteTagRequest, deleteTagSuccess } from "../../../redux/actions/tagActions";
import { colorOptions } from "../../../constants/constants";
import { generateRandomFiveDigit } from "../../../utils";


const Tag = ({ title, tags, setTags, tagDetails, errors, touched }) => {
    const dispatch = useDispatch();
    const { values, setFieldValue } = useFormikContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTag, setNewTag] = useState({
        label: '', color: '', contactType: ''
    });
    useEffect(() => {
        if (tagDetails && tagDetails.length > 0) {
            setFieldValue("tags", tagDetails);
        }
    }, [tagDetails, setFieldValue]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addTagItem = (push) => {
        if (newTag.color && newTag.label) {
            let payload = {
                contactId: generateRandomFiveDigit(),
                label: newTag.label,
                color: newTag.color,
                contactType: newTag.contactType,
            }
            dispatch(createTagSuccess(payload))
            setNewTag({ ...newTag, label: '', color: '', contactType: '' });
            closeModal();
        }
    };
    const deleteTagItem = (contactId, index) => {
        const updatedtags = tags.filter((_, i) => i !== index);
        setTags(updatedtags); // Update the local state
        dispatch(deleteTagSuccess(contactId)); // Dispatch delete action
    };

    return (
        <div className="bg-white rounded-2xl">
            <FieldArray
                name="tags"
                render={({ push, remove }) => (
                    <>
                        <ul className="card-details">
                            {tags?.map((item, index) => (
                                <li key={item.contactId} className="flex justify-between">
                                    <span
                                        className="text-sm font-semibold py-1 px-3 rounded-full inline-block"
                                        style={{
                                            backgroundColor: item.color.color1,
                                            color: item.color.color2,
                                        }}
                                    >    {item?.label}
                                    </span>
                                    <span className="left-txt flex items-center">
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                                            style={{
                                                background: `linear-gradient(45deg, ${item.color.color1} 50%, ${item.color.color2} 50%)`,
                                            }}
                                        ></div>
                                        <span className="icon mr-2 ml-5 cursor-pointer" /* onClick={() => remove(index)} */
                                            onClick={() => deleteTagItem(item.contactId, index)}>
                                            <img src={IMAGES.cross} alt="icon" />
                                        </span>
                                    </span>
                                </li>
                            ))}
                            <li className="flex justify-between add-attorney">
                                <span className="left-txt flex items-center">
                                    <span className="icon mr-2 cursor-pointer" onClick={openModal}>
                                        <img src={IMAGES.addIcon} alt="icon" />
                                    </span>
                                    Add Tag
                                </span>
                            </li>
                        </ul>

                        <Modal show={isModalOpen} size="sm" onClose={() => {
                            setNewTag({ label: '', color: '', contactType: '' });
                            closeModal()
                        }
                        }
                            className="new-case-modal">
                            <Modal.Header className="border-b-0">
                                <div>
                                    <h2 className="mb-2 text-2xl leading-9 font-medium text-secondary-800">Add Tag</h2>
                                </div>
                            </Modal.Header>
                            <Modal.Body className="pt-0">
                                <div>
                                    <div style={{ alignItems: "center" }} className="grid grid-cols-3 gap-x-3 flex">
                                        <div>
                                            <Label value="Label" className="block mb-2 mt-4" />
                                            <TextInput
                                                type="text"
                                                value={newTag.label}
                                                onChange={(e) => setNewTag({ ...newTag, label: e.target.value })}
                                                placeholder="Label"
                                            />
                                        </div>
                                        <div>
                                            <Dropdown
                                                label={
                                                    <div className="flex items-center">
                                                        {newTag?.color ? (
                                                            <div
                                                                className="w-6 h-6 rounded-full border-2 border-gray-300"
                                                                style={{
                                                                    background: `linear-gradient(45deg, ${newTag.color.color1} 50%, ${newTag.color.color2} 50%)`,
                                                                }}
                                                            ></div>
                                                        ) : (
                                                            <div
                                                                className="w-6 h-6 rounded-full border-2 border-gray-300"
                                                                style={{
                                                                    background: `linear-gradient(45deg, #fff 50%, #fff 50%)`,
                                                                }}
                                                            ></div>
                                                        )}
                                                    </div>
                                                }
                                                inline
                                                className="rounded-2xl shadow-shadow-light-2 max-h-[400px] overflow-y-auto"
                                            >
                                                <div className="grid grid-cols-5 gap-3">
                                                    {colorOptions.map((option, index) => (
                                                        <Dropdown.Item
                                                            key={index}
                                                            onClick={() => setNewTag({ ...newTag, color: option })}
                                                            className="flex items-center cursor-pointer"
                                                        >
                                                            <div
                                                                className="w-8 h-8 rounded-full border-2 border-gray-200"
                                                                style={{
                                                                    background: `linear-gradient(45deg, ${option.color1} 50%, ${option.color2} 50%)`,
                                                                }}
                                                            ></div>
                                                        </Dropdown.Item>
                                                    ))}
                                                </div>

                                            </Dropdown>
                                        </div>
                                        <div className="dis-none">
                                            <Label value="contact type" className="block mb-2 mt-4" />
                                            <TextInput
                                                type="contactType"
                                                value={newTag.contactType}
                                                onChange={(e) => setNewTag({ ...newTag, contactType: 1 })}
                                                placeholder="Contact Type"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-end mt-8">
                                        <XButton
                                            text={"Cancel"}
                                            className="bg-card-300 text-sm text-secondary-800 py-[10px] px-6 rounded-[100px]"
                                            onClick={() => {
                                                setNewTag({ label: '', color: '', contactType: '' });
                                                closeModal()
                                            }
                                            }
                                        />
                                        <XButton
                                            type="submit"
                                            text={"Submit"}
                                            onClick={() => addTagItem(push)}
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

export default Tag;
