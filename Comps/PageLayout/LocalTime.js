import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const LocalTime = ({ localTime }) => {

    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [meridiem, setMeridiem] = useState("");

    useEffect(() => {

        const intervalID = setInterval(() => {
            getLocalTime()
        }, 1000);

        return () => clearInterval(intervalID)
    }, [])

    const getLocalTime = () => {

        const local = DateTime.local();
        const rezoned = local.setZone("America/Toronto");

        const day = rezoned.toFormat("ccc");
        const time = rezoned.toFormat("t");
        const meridiem = rezoned.toFormat("a");

        setDay(day);
        setTime(time);
        setMeridiem(meridiem)
    }

    return (
        <div ref={localTime} className="local-time position-fixed">
            local time: {time} ({meridiem}) - {day}
        </div>
    );
}

export default LocalTime;