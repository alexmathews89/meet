import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      <h1>{event.summary}</h1>
      <p>{event.created}</p>
      <p>{event.location}</p>
      {showDetails ? <p className="details">{event.description}</p> : null}

      <button onClick={() => setShowDetails(true)}>Show Details</button>
    </li>
  );
};

export default Event;
