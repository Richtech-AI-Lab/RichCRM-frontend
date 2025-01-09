import React, { useCallback, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal } from "flowbite-react";
import { FieldArray, useFormikContext } from "formik";
import { Label, TextInput, XButton } from "../../../components";
import { IMAGES } from "../../../constants/imagePath";
import { useDispatch } from "react-redux";
import { postRequest } from "../../../axios/interceptor";
import { API_ENDPOINTS } from "../../../constants/api";
import { debounce } from "lodash";
import NewCaseDropdown from "../../../components/newcasedropdown";
import { createBrokerRequest, createBrokerSuccess, deleteBrokerRequest } from "../../../redux/actions/contactActions";

const CaseBrokerItems = ({ title, brokers, setBrokers, brokerDetails, errors, touched }) => {
    const dispatch = useDispatch();
    const { values, setFieldValue } = useFormikContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [newBroker, setNewBroker] = useState({
        contactType: 1,
        company: '',
        firstName: '',
        lastName: '',
        email: '',
        cellNumber: ''
    });

    useEffect(() => {
        if (brokerDetails && brokerDetails.length > 0) {
            setFieldValue("brokers", brokerDetails);
        }
    }, [brokerDetails, setFieldValue]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addBrokerItem = (push) => {
        if (newBroker.company && newBroker.firstName && newBroker.lastName) {
            let payload={
                // contactType: 1,
                tags:["Broker"],
                company: newBroker.company,
                firstName: newBroker.firstName,
                lastName: newBroker.lastName,
                ...(newBroker.email && newBroker.email.trim() !== "" && { email: newBroker.email }), 
                cellNumber: newBroker.cellNumber
            }
           if(newBroker?.contactId){
            dispatch(createBrokerSuccess({...payload,
                contactId:newBroker?.contactId
            }))
           }else{
            dispatch(createBrokerRequest(payload))
           }
            // dispatch(createAttorneyRequest(payload))
            // push({
            //     contactId: `new${Date.now()}`, // Changed key to contactId
            //     note: newBroker.note, // Changed key to note
            //     firstName: newBroker.firstName,
            //     lastName: newBroker.lastName,
            //     email: newBroker.email,
            //     cellNumber: newBroker.cellNumber // Changed key to cellNumber
            // });
            setNewBroker({ ...newBroker, company: '', firstName: '', lastName: '', email: '', cellNumber: '' });
            setSearchResults([])
            closeModal();
        }
    };
    const deleteBrokerItem = (contactId, index) => {
        const updatedBrokers = brokers.filter((_, i) => i !== index); 
        setBrokers(updatedBrokers); // Update the local state
        dispatch(deleteBrokerRequest(contactId)); // Dispatch delete action
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
        <div className="bg-white p-4 rounded-2xl mb-5 shadow-shadow-light">
          {title &&
                  <div className="flex justify-between items-center mb-5">
                      <span className="text-base text-secondary-800 font-bold">{title}</span>
                      <div className="flex items-center gap-2">
                          <BsThreeDotsVertical className="text-lg opacity-40" />
                      </div>
                  </div>
              }
  
            <FieldArray
                name="brokers"
                render={({ push, remove }) => (
                    <>
                        <ul className="card-details">
                            {brokers?.map((item, index) => (
                                <li key={item.contactId} className="flex justify-between">
                                    <span className="left-txt flex items-center">
                                        <span className="icon mr-2 cursor-pointer" /* onClick={() => remove(index)} */
                                        onClick={() => deleteBrokerItem(item.contactId, index)}>
                                            <img src={IMAGES.removeIcon} alt="icon" />
                                        </span>
                                        {item?.company} - {item?.lastName}, {item?.firstName}
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
                                    Add a broker
                                </span>
                            </li>
                        </ul>

                        <Modal show={isModalOpen} size="md" onClose={() => {
                            setNewBroker({ company: '', firstName: '', lastName: '', email: '', cellNumber: '' });
                            closeModal()
                        }
                        }
                            className="new-case-modal">
                            <Modal.Header className="border-b-0">
                                <div>
                                    <h2 className="mb-2 text-2xl leading-9 font-medium text-secondary-800">Add Broker</h2>
                                </div>
                            </Modal.Header>
                            <Modal.Body className="pt-0">
                                <div>
                                    <div>
                                        <Label value="Broker Type" className="block mb-2" />
                                        <TextInput
                                            type="text"
                                            value={newBroker.company}
                                            onChange={(e) => setNewBroker({ ...newBroker, company: e.target.value })}
                                            placeholder="Broker Type"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-3">
                                        <div>
                                            <Label value="First Name" className="block mb-2 mt-4" />
                                            <TextInput
                                                type="text"
                                                value={newBroker.firstName}
                                                onChange={(e) => {
                                                    setNewBroker({ ...newBroker, firstName: e.target.value });
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
                                                            setNewBroker({ ...newBroker, company: item?.company, contactId:item?.contactId, firstName: item?.firstName, lastName: item?.lastName, email: item?.email, cellNumber: item?.cellNumber });
                                                            setSearchResults([]);
                                                        }}
                                                    >
                                                        <div className="flex items-center">
                                                            {/* <img src={avatar} className="w-8 mr-3" /> */}
                                                            {/* {console.log(item)} */}
                                                            <div>
                                                                <p className="text-base text-secondary-800">{item?.firstName}</p>
                                                                <span className="text-text-gray-100 text-sm">{item.email}</span>
                                                                {item?.company && <p className="text-text-gray-100 text-sm">{item.company}</p>}
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
                                                value={newBroker.lastName}
                                                onChange={(e) => setNewBroker({ ...newBroker, lastName: e.target.value })}
                                                placeholder="Last Name"
                                            />
                                        </div>
                                        <div>
                                            <Label value="Email" className="block mb-2 mt-4" />
                                            <TextInput
                                                type="email"
                                                value={newBroker.email}
                                                onChange={(e) => setNewBroker({ ...newBroker, email: e.target.value })}
                                                placeholder="Email"
                                            />
                                        </div>
                                        <div>
                                            <Label value="Cell Phone" className="block mb-2 mt-4" />
                                            <TextInput
                                                type="tel"
                                                value={newBroker.cellNumber}
                                                onChange={(e) => setNewBroker({ ...newBroker, cellNumber: e.target.value })}
                                                placeholder="Cell Phone"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-end mt-8">
                                        <XButton
                                            text={"Cancel"}
                                            className="bg-card-300 text-sm text-secondary-800 py-[10px] px-6 rounded-[100px]"
                                            onClick={() => {
                                                setNewBroker({ company: '', firstName: '', lastName: '', email: '', cellNumber: '' });
                                                closeModal()
                                            }
                                            }
                                        />
                                        <XButton
                                            type="submit"
                                            text={"Submit"}
                                            onClick={() => addBrokerItem(push)}
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

export default CaseBrokerItems;
