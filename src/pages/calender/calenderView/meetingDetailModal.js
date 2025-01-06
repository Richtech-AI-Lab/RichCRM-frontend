import React from 'react';
import { Modal } from 'flowbite-react';
import { IMAGES } from '../../../constants/imagePath';
import XButton from '../../../components/button/XButton';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../constants/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MeetingDetailModal = ({ onClose, eventData, title }) => {
    const navigate = useNavigate();
    const { cases } = useSelector((state) => state.case.casesData);
    // const casesData = cases.filter((caseItem) => caseItem.caseId == localStorage.getItem("c_id"));
    let caseName = title?.split("-")


    const filteredGoogleEvents = cases.filter((event) => {
        return (
            event?.clientName === caseName[0] &&
            event?.premisesName === caseName[1]
        );
    });

    function formatDateRange(start, end) {
        const options = { weekday: 'long', month: 'long', day: 'numeric' }; // Options for date formatting
    
        const startDate = new Date(start);
        const endDate = new Date(end);
    
        // Format the main date part (e.g., Friday, November 29)
        const formattedStartDate = startDate.toLocaleDateString('en-US', options);
        const formattedEndDate = endDate.toLocaleDateString('en-US', options);
    
        // Return the formatted date range
        return `${formattedStartDate} - (All Day)`;
    }

    function formatDateTimeRange(start, end) {
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

    const handleMeetCardClick = () => {
        if (filteredGoogleEvents?.length == 1) {
            localStorage.setItem("c_id", filteredGoogleEvents[0]?.caseId)
            navigate(ROUTES.CASES_DATA, { state: { casedetails: filteredGoogleEvents[0] } });
        } else {
            toast.error("Case not exist!")
        }
    };
    return (
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal calendar-modal ">
            <Modal.Header className="border-b-2 border-black-10 ">
                <h2 className="text-4 font-medium text-secondary-800">{title ? title : "Google Meet Link"}</h2>
            </Modal.Header>
            <Modal.Body className="p-0 m-0">
                <ul className="">
                    <li className='flex justify-start items-center gap-4 p-5 border-b-2 border-black-10 cursor-pointer' onClick={handleMeetCardClick}>
                        <img src={IMAGES?.casesGray} alt="logo" className="" />
                        <div style={{ color: "#366093" }}>
                            <p>{caseName[0]}</p>
                            <p>{caseName[1]}</p>
                        </div>
                        <img src={IMAGES?.arrowRight} alt="logo" className="ml-auto" />
                    </li>
                    <li className='flex justify-start items-center gap-4 p-5 border-b-2 border-black-10 '>
                        <img src={IMAGES?.calendarGray} alt="logo" className="" />
                        <div >
                            <p>{eventData.allDay ? formatDateRange(eventData?.start, eventData?.end) : formatDateTimeRange(eventData?.start, eventData?.end)}</p>
                        </div>
                    </li>
                    <li className='flex justify-start items-center gap-4 p-5 '>
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
                    <div className="flex justify-end px-5 mb-3">
                        <XButton text="Edit"  className="bg-badge-gray text-base text-primary2 py-[10px] px-6 rounded-[100px] w-1/2" />
                        <XButton text="Start Meeting" onClick={handleStartClick} className="bg-primary2 text-white text-base py-[10px] px-6 rounded-[100px] ml-4 w-1/2" />
                    </div>
                </ul>

            </Modal.Body>
        </Modal>
    );
};

export default MeetingDetailModal;
