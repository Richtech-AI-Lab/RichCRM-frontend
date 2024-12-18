import { format } from "date-fns";
import { Spinner } from "flowbite-react";
import React from "react";

const EventCard = ({ title, date, time, color = "bg-green-200", textColor = "text-green-800", borderColor = "border-green-600", }) => {
    return (
        <div className={`flex w-72 items-center rounded-md ${color} border-l-8 ${borderColor}`}>
            <div className="w-2 h-full rounded-l-md" style={{ backgroundColor: color }}></div>
            <div className="ml-2">
                <p className={`text-xs font-bold ${textColor}`}>{title}</p>
                <p className="text-gray-600 text-xs font-medium">{date}</p>
                {time && <p className="text-gray-600 text-xs font-medium">{time}</p>}
            </div>
        </div>
    );
};

const EventList = ({ googleEvent }) => {
    // googleEvent.map((event) => {
    //     console.log(event?.id)
    //     console.log(event?.summary)
    //     console.log(event.start.dateTime)
    //     console.log(event.end.dateTime)
    //     console.log(event.attendees)
    //     console.log(event.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri || "", "");
    // })
    return (
        <div
            className="card absolute shadow-shadow-light-2 flex flex-col p-[12px] justify-center items-start gap-4 self-stretch"
            style={{
                background: "#fff",
                zIndex: "9",
            }}
        >
            {googleEvent.length > 0 ? (
                googleEvent?.map((event) => {
                    const title = event?.summary.split("-") || "Untitled Event";
                    const date = event?.start?.dateTime;
                    return (
                        <EventCard
                            key={event?.id}  // It's a good practice to add a key to each child in a list.
                            title={title[2]}
                            date={format(date, 'MMM dd, yyyy')}
                            time={format(date, 'hh:mm aaa')}
                            color="bg-[#EDE0D4]"
                            textColor="text-gray-700"
                        />
                    );
                })

            ) : (
                <div className="flex justify-center" style={{
                    background: "#fff",
                    zIndex: "9",
                    width: '321px'
                }}>
                    <Spinner
                        size="xl"
                        animation="border"
                        role="status"
                        variant="primary"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}


        </div>
    );
};

export default EventList;
