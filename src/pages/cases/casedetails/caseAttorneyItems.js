import React, { useCallback, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal } from "flowbite-react";
import { FieldArray, useFormikContext } from "formik";
import { Label, TextInput, XButton } from "../../../components";
import { IMAGES } from "../../../constants/imagePath";
import { useDispatch } from "react-redux";
import { createAttorneyRequest, deleteAttorneyRequest } from "../../../redux/actions/contactActions";
import { postRequest } from "../../../axios/interceptor";
import { API_ENDPOINTS } from "../../../constants/api";
import { debounce } from "lodash";
import NewCaseDropdown from "../../../components/newcasedropdown";

const CaseAttorneyItems = ({ title, attorneys, setAttorneys, attorneyDetails, errors, touched }) => {
    const dispatch = useDispatch();
    const { values, setFieldValue } = useFormikContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [newAttorney, setNewAttorney] = useState({
        contactType: 1,
        note: '',
        firstName: '',
        lastName: '',
        email: '',
        cellNumber: ''
    });

    // const AttorneyTypeOption= [
    //     // { value: "allStatus", label: "All Status" },
    //     { value: "broker ", label: "Todo" },
    //     { value: "warning", label: "Warning" },
    //     { value: "waiting", label: "Waiting" },
    //     { value: "finished", label: "Finished" },
    //   ],
    useEffect(() => {
        if (attorneyDetails && attorneyDetails.length > 0) {
            setFieldValue("attorneys", attorneyDetails);
        }
    }, [attorneyDetails, setFieldValue]);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addAttorneyItem = (push) => {
        if (newAttorney.note && newAttorney.firstName && newAttorney.lastName) {
            dispatch(createAttorneyRequest(newAttorney))
            // push({
            //     contactId: `new${Date.now()}`, // Changed key to contactId
            //     note: newAttorney.note, // Changed key to note
            //     firstName: newAttorney.firstName,
            //     lastName: newAttorney.lastName,
            //     email: newAttorney.email,
            //     cellNumber: newAttorney.cellNumber // Changed key to cellNumber
            // });
            setNewAttorney({ note: '', firstName: '', lastName: '', email: '', cellNumber: '' });
            closeModal();
        }
    };


    const debouncedFunction = useCallback(
        debounce(async (value) => {
            if (value != "" || value.length > 0) {
                const response = await postRequest(API_ENDPOINTS.GET_CONTACT_BY_KEYWORD, {
                    keyword: value
                }
                )
                const filteredResults = response?.data?.data;
                setSearchResults(filteredResults);
            } else {
                setSearchResults([]);
            }
        }, 1000),
        []
    );

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
                                        <span className="icon mr-2 cursor-pointer" /* onClick={() => remove(index)} */ onClick={() => dispatch(deleteAttorneyRequest(item?.contactId))}>
                                            <img src={IMAGES.removeIcon} alt="icon" />
                                        </span>
                                        {item?.note ? item?.note : item?.firstName}
                                    </span>
                                    <span className="left-txt flex items-center">
                                        {item?.contactId}
                                    </span>
                                    {/* <input
                                        className="text-right border-none focus:ring-transparent"
                                        placeholder="Update details"
                                        value={`${item.contactId}`}
                                        readOnly
                                    /> */}
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

                        <Modal show={isModalOpen} size="md" onClose={() => {
                            setNewAttorney({ note: '', firstName: '', lastName: '', email: '', cellNumber: '' });
                            closeModal()
                        }
                        }
                            className="new-case-modal">
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
                                            value={newAttorney.note}
                                            onChange={(e) => setNewAttorney({ ...newAttorney, note: e.target.value })}
                                            placeholder="Attorney Type"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-3">
                                        <div>
                                            <Label value="First Name" className="block mb-2 mt-4" />
                                            <TextInput
                                                type="text"
                                                value={newAttorney.firstName}
                                                onChange={(e) => {
                                                    setNewAttorney({ ...newAttorney, firstName: e.target.value });
                                                    debouncedFunction(e.target.value);
                                                }
                                                }
                                                placeholder="First Name"
                                            />
                                            <ul className={'search-list-dropdown overflow-hidden rounded-2xl shadow-shadow-light-2'}>
                                                {searchResults?.map((item, index) => (
                                                    <li
                                                        key={index} // Adding a key for each list item for better performance
                                                        className={'px-4 py-2 hover:bg-input-surface'}
                                                        onClick={() => {
                                                            setNewAttorney({ ...newAttorney, firstName: item?.firstName, lastName: item?.lastName, email: item?.email, cellNumber: item?.cellNumber });
                                                            setSearchResults([]);
                                                        }}
                                                    >
                                                        <div className="flex items-center">
                                                            {/* <img src={avatar} className="w-8 mr-3" /> */}
                                                            {/* {console.log(item)} */}
                                                            <div>
                                                                <p className="text-base text-secondary-800">{item?.firstName}</p>
                                                                <span className="text-text-gray-100 text-sm">{item.email}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
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
                                    </div>
                                    <div className="text-end mt-8">
                                        <XButton
                                            text={"Cancel"}
                                            className="bg-card-300 text-sm text-secondary-800 py-[10px] px-6 rounded-[100px]"
                                            onClick={() => {
                                                setNewAttorney({ note: '', firstName: '', lastName: '', email: '', cellNumber: '' });
                                                closeModal()
                                            }
                                            }
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
