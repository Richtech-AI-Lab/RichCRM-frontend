import React, { useEffect, useState } from "react";
import { Dropdown, Modal } from "flowbite-react";
import { FieldArray, useFormikContext } from "formik";
import { Label, TextInput, XButton } from "../../../components";
import { IMAGES } from "../../../constants/imagePath";
import { useDispatch } from "react-redux";
import { debounce, uniqueId } from "lodash";
import { createTagRequest, createTagSuccess, deleteTagRequest, deleteTagSuccess } from "../../../redux/actions/tagActions";
import { colorOptions } from "../../../constants/constants";
import { generateRandomFiveDigit } from "../../../utils";


const Tag = ({ title, tags, setTags, tagDetails, errors, touched }) => {
    const dispatch = useDispatch();
    const { values, setFieldValue } = useFormikContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTag, setNewTag] = useState({
        label: '', color1: '', color2: '', tagType : ''
    });
    useEffect(() => {
        if (tagDetails && tagDetails.length > 0) {
            setFieldValue("tags", tagDetails);
        }
    }, [tagDetails, setFieldValue]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addTagItem = (push) => {
        if (newTag.color1 && newTag.color2 && newTag.label) {
            let payload = {
                contactId: generateRandomFiveDigit(),
                label: newTag.label,
                color1: newTag.color1,
                color2: newTag.color2,
                tagType: newTag.tagType,
            }
            dispatch(createTagRequest(payload))
            setNewTag({ ...newTag, label: '', color1: '', color2: '', tagType: '' });
            closeModal();
        }
    };
    const deleteTagItem = (label, index) => {
        const updatedtags = tags.filter((_, i) => i !== index);
        setTags(updatedtags); // Update the local state
        let payload = {
            label: label,
        }
        dispatch(deleteTagRequest(payload)); // Dispatch delete action
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
                                            backgroundColor: item.color1,
                                            color: item.color2,
                                        }}
                                    >    {item?.label}
                                    </span>
                                    <span className="left-txt flex items-center">
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                                            style={{
                                                background: `linear-gradient(45deg, ${item.color1} 50%, ${item.color2} 50%)`,
                                            }}
                                        ></div>
                                        <span className="icon mr-2 ml-5 cursor-pointer" /* onClick={() => remove(index)} */
                                            onClick={() => deleteTagItem(item.label, index)}>
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
                            setNewTag({ label: '', color1: '', color2: '', tagType: '' });
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
                                                        {newTag?.color1 ? (
                                                            <div
                                                                className="w-6 h-6 rounded-full border-2 border-gray-300"
                                                                style={{
                                                                    background: `linear-gradient(45deg, ${newTag.color1} 50%, ${newTag.color2} 50%)`,
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
                                                            onClick={() => setNewTag({ ...newTag, color1: option.color1, color2: option.color2 })}
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
                                        <div className="">
                                            <Label value="contact type" className="block mb-2 mt-4" />
                                            <TextInput
                                                type="tagType"
                                                value={newTag.tagType}
                                                onChange={(e) => setNewTag({ ...newTag, tagType: 1 })}
                                                placeholder="Contact Type"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-end mt-8">
                                        <XButton
                                            text={"Cancel"}
                                            className="bg-card-300 text-sm text-secondary-800 py-[10px] px-6 rounded-[100px]"
                                            onClick={() => {
                                                setNewTag({ label: '', color1: '', color2: '', tagType: '' });
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
