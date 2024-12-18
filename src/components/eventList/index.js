import React from "react";

const EventCard = ({ title, date, time, color = "bg-green-200", textColor = "text-green-800", borderColor = "border-green-600", }) => {
    return (
        <div className={`flex w-72 items-center rounded-md p-3 ${color} border-l-8 ${borderColor}`}>
            <div className="w-2 h-full rounded-l-md" style={{ backgroundColor: color }}></div>
            <div className="ml-2">
                <p className={`font-bold ${textColor}`}>{title}</p>
                <p className="text-gray-600 text-sm">{date}</p>
                {time && <p className="text-gray-600 text-sm">{time}</p>}
            </div>
        </div>
    );
};

const EventList = () => {
    return (
        <div
            className="card absolute w-full max-w-md shadow-shadow-light-2 flex flex-col gap-2"
            style={{
                background: "#fff",
                zIndex: "9",
                top: '32%',
                maxWidth: "321px",
            }}
        >
            {/* First Event */}
            <EventCard
                title="Contract Review"
                date="June 05, 2024"
                time="2pm"
                color="bg-[#EDE0D4]"
                textColor="text-gray-700"
            />

            {/* Second Event */}
            <EventCard
                title="Mortgage Deadline"
                date="Dec 10, 2024"
                color="bg-green-200"
                textColor="text-green-800"
            />
        </div>
    );
};

export default EventList;
