import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h1>{event.summary}</h1>
      <p>{event.created}</p>
      <p>{event.location}</p>
      {showDetails ? <p className="details">{event.description}</p> : null}

      <button
        className="showDetailsButton"
        onClick={() => {
          showDetails ? setShowDetails(false) : setShowDetails(true);
        }}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
};

export default Event;
