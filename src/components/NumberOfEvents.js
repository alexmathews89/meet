import { useState } from "react";

const NumberOfEvents = () => {
  const [eventNumber, setEventNumber] = useState("32");
  return <input type="text" value={eventNumber} />;
};

export default NumberOfEvents;
