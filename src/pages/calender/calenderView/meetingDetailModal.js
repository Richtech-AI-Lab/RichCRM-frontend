import React from 'react';
import { Modal } from 'flowbite-react';
import { IMAGES } from '../../../constants/imagePath';
import XButton from '../../../components/button/XButton';

const MeetingDetailModal = ({ onClose, eventData, title}) => {
    let caseName = title?.split("-")
    function formatDateRange(start, end) {
        // console.log(start,"SSSSSSSS")
        // console.log(end,"eeee")
        const options = { weekday: 'long', month: 'long', day: 'numeric' }; // Options for date formatting
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }; // Options for time formatting

        const startDate = new Date(start);
        const endDate = new Date(end);

        // Format the main date part (e.g., Friday, November 29)
        const formattedDate = startDate.toLocaleDateString('en-US', options);

        // Format the start and end times (e.g., 04:11pm)
        const formattedStartTime = startDate.toLocaleTimeString('en-US', timeOptions).toLowerCase();
        const formattedEndTime = endDate.toLocaleTimeString('en-US', timeOptions).toLowerCase();

        // Construct the final result
        return `${formattedDate}       ${formattedStartTime} – ${formattedEndTime}`;
    }
    const handleStartClick = () => {
        window.open(eventData?.extendedProps?.meetLink, "_blank");
    };

    return (
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal calendar-modal">
            <Modal.Header className="border-b">
                <h2 className="text-4 font-medium text-secondary-800">Google Meet Link</h2>
            </Modal.Header>
            <Modal.Body className="p-0 m-0">
                <ul className="">
                    <li className='flex justify-start items-center gap-4 p-3'>
                        <img src={IMAGES?.casesGray} alt="logo" className="" />
                        <div style={{ color: "#366093" }}>
                            <p>{caseName[0]}</p>
                            <p>{caseName[1]}</p>
                        </div>
                    </li>
                    <li className='flex justify-start items-center gap-4 p-3'>
                        <img src={IMAGES?.calendarGray} alt="logo" className="" />
                        <div >
                            <p>{formatDateRange(eventData?.start, eventData?.end)}</p>
                        </div>
                    </li>
                    <li className='flex justify-start items-center gap-4 p-3'>
                        <img src={IMAGES?.attachment} alt="logo" className="" />
                        <div style={{ color: "#366093" }}>
                            <a
                                href={eventData?.extendedProps?.meetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:bg-blue-600"
                            >
                                <p>{eventData?.extendedProps?.meetLink}</p></a>
                        </div>


                    </li>
                    <div className="flex justify-end p-3">
                        <XButton text="Edit" className="bg-badge-gray text-base text-primary2 py-[10px] px-6 rounded-[100px] w-1/2" />
                        <XButton text="Start Meeting" onClick={handleStartClick} className="bg-primary2 text-white text-base py-[10px] px-6 rounded-[100px] ml-4 w-1/2" />
                    </div>
                </ul>

            </Modal.Body>
        </Modal>
    );
};

export default MeetingDetailModal;
