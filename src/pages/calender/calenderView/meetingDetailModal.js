import React from 'react';
import { Modal } from 'flowbite-react';

const MeetingDetailModal = ({ onClose, eventData, title }) => {
    // console.log(eventData?.start, "eventData", title)
    function formatDateRange(start, end) {
        console.log(start,"SSSSSSSS")
        console.log(end,"eeee")
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
    
    return (
        <Modal show={true} size="md" onClose={onClose} className="new-case-modal calendar-modal">
            <Modal.Header className="border-b-0">
                <h2 className="text-4 font-medium text-secondary-800">Google Meet Link</h2>
            </Modal.Header>
            <Modal.Body className="pt-3">
                <div className="rounded-2xl mb-2">
                    <h2 className="text-[22px] font-medium text-secondary-800 mb-4">{title}</h2>
                    <p className="text-sm text-secondary-300">
                        {eventData?.extendedProps?.description}
                    </p>
                    <p className="text-base text-secondary-800 font-semibold mb-1">
                        {/* {`${eventData?.start}`} */}
                        {formatDateRange(eventData?.start, eventData?.end)}
                    </p>
                    {/* <p className="text-sm text-blue-600 break-all">{eventData?.extendedProps?.meetLink}</p> */}
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <a
                            href={eventData?.extendedProps?.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary2 text-white text-base px-4 py-2 rounded-[100px] text-sm hover:bg-blue-600"
                        >
                            Join with Google Meet
                        </a>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default MeetingDetailModal;
