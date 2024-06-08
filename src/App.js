import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <div id="number-of-events"></div>
    </div>
  );
}

export default App;
