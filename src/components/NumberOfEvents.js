import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [eventNumber, setEventNumber] = useState(32);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setEventNumber(value);
    setCurrentNOE(value);

    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "Invalid number of events, number of events must be 1-32";
    } else {
      errorText = "";
    }
    /**if (value <= 0) {
      errorText = "Invalid number of events, number of events must be 1-32";
    } else {
      errorText = "";
    }
    if (value > 32) {
      errorText = "Invalid number of events, number of events must be 1-32";
    } else {
      errorText = "";
    }**/
    setErrorAlert(errorText);
  };
  return (
    <div id="number-of-events">
      <label>
        <h1>Number of Events: </h1>
      </label>
      <input type="text" value={eventNumber} onChange={handleInputChange} />
    </div>
  );
};

export default NumberOfEvents;
