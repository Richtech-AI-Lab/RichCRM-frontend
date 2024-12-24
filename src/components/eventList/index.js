import { format } from "date-fns";
import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/api";
import { useSelector } from "react-redux";

const EventCard = ({ title, date, time, color = "bg-green-200", textColor = "text-green-800", borderColor = "border-green-600", }) => {
    const navigate = useNavigate();
    const handleOnClick = () =>{
        navigate(ROUTES.CALENDAR);
    }
    return (
        <div onClick={handleOnClick} className={`flex w-72 items-center rounded-md ${color} border-l-8 ${borderColor} cursor-pointer`}>
            <div className="w-2 h-full rounded-l-md" style={{ backgroundColor: color }}></div>
            <div className="ml-2">
                <p className={`text-xs font-bold ${textColor}`}>{title}</p>
                <p className="text-gray-600 text-xs font-medium">{date}</p>
                {time && <p className="text-gray-600 text-xs font-medium">{time}</p>}
            </div>
        </div>
    );
};

const EventList = ({ googleEvent, casesEvent , isLoading }) => {
    const { cases } = useSelector((state) => state.case.casesData);
    const casesData = cases.filter((caseItem) => caseItem.caseId == localStorage.getItem("c_id"));

    const [data, setData] = useState([]);

    useEffect(() => {
        const filteredGoogleEvents = googleEvent.filter((event) => {
            const summaryParts = event.summary?.split("-");
            return (
                summaryParts?.[0]?.trim() === casesData[0]?.clientName?.trim() &&
                summaryParts?.[1]?.trim() === casesData[0]?.premisesName?.trim()
            );
        });
        
        const mapGoogleEvents = filteredGoogleEvents.map((event) => ({
            id: event.id,
            title: event.summary?.split("-")?.[2]  || "Google Meet Event",
            start: format(event.start.dateTime, 'MMM dd, yyyy'),
            time: format(event.start.dateTime, 'hh:mm aaa'),
            type: "meet",
            // extendedProps: {
            //     description: event.description || "",
            //     attendees: event.attendees || [],
            //     meetLink: event.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri || "",
            //     type: "googleMeet",
            // },
        }));

        const calendarEvents = casesEvent.flatMap((caseItem) => [
            caseItem.closingDate ? {
                id: `${caseItem.caseId}_Closing Due`,
                title: `Closing Deadline`,
                start: caseItem.closingDate,
                type: "case",
                //   ...caseItem
                // extendedProps: { caseItem, type: "case" }
            } : null,
            caseItem.mortgageContingencyDate ? {
                id: `${caseItem.caseId}_Mortgage Due`,
                title: `Mortgage Deadline`,
                start: caseItem.mortgageContingencyDate,
                type: "case",
                //   ...caseItem
                // extendedProps: { caseItem, type: "case" }
            } : null
        ]).filter(event => event !== null);
        setData([...calendarEvents, ...mapGoogleEvents])
    }, [googleEvent, casesEvent])
    
    return (
        <div
            className="card absolute shadow-shadow-light-2 flex flex-col p-[12px] justify-center items-start gap-4 self-stretch"
            style={{
                background: "#fff",
                zIndex: "9",
            }}
        >
            {isLoading ? (
                <div className="flex justify-center" style={{ width: '321px' }}>
                    <Spinner
                        size="xl"
                        animation="border"
                        role="status"
                        variant="primary"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : data.length > 0 ? (
                data.map((event) => (
                    <EventCard
                        key={event?.id}
                        title={event?.title}
                        date={format(event?.start, 'MMM dd, yyyy')}
                        {...(event?.type === "meet" && { time: event?.time ,  color:"bg-[#EDE0D4]",  textColor:"text-gray-700" })}
                        {...(event?.type != "meet" && {color:"bg-green-200",  textColor:"text-green-800" })}

                    />
                ))
            ) : (
                <div className="flex justify-center w-full text-gray-600 text-sm">
                    No events exist
                </div>
            )}
        </div>

    );
};

export default EventList;
