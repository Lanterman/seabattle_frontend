const months = {
    "01" : "Jan.",
    "02" : "Feb.",
    "03" : "Mar.",
    "04" : "Apr.",
    "05" : "May",
    "06" : "Jun.",
    "07" : "Jul.",
    "08" : "Aug.",
    "09" : "Sep.",
    "10" : "Oct.",
    "11" : "Nov.",
    "12" : "Dec.",
};

export function determineDate(dateOfLastMes, dateOfPreviosMes) {
    const splitDateOfLastMes = dateOfLastMes.split(".");
    const splitDateOfPreviosMes = dateOfPreviosMes.split(".");
    let date = dateOfLastMes;

    if (splitDateOfPreviosMes[2] === splitDateOfLastMes[2]) {
        if (!(splitDateOfPreviosMes[1] === splitDateOfLastMes[1])) {
            date = `${months[splitDateOfLastMes[1]]}, ${splitDateOfLastMes[1]}`;
        } else if (splitDateOfPreviosMes[0] - splitDateOfLastMes[0] === 1) {
            date = "Yesterday";
        } else {
            date = `${months[splitDateOfLastMes[1]]}, ${splitDateOfLastMes[1]}`;
        };
    };

    return (
        <p className="last-message-of-day">
            {date}
        </p>
    );
};