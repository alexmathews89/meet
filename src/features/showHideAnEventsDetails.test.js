/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import { loadFeature, defineFeature } from "jest-cucumber";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import { extractLocations, getEvents } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    let AppComponent;
    let CitySearchComponent;
    given("user has searched a city", async () => {
      CitySearchComponent = render(
        <CitySearch allLocations={[]} setInfoAlert={() => {}} />
      );
      const user = userEvent.setup();
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      CitySearchComponent.rerender(
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={() => {}}
          setInfoAlert={() => {}}
        />
      );

      const cityTextBox = CitySearchComponent.queryByRole("textbox");
      await user.type(cityTextBox, "Berlin");

      const BerlinGermanySuggestions =
        CitySearchComponent.queryAllByRole("listitem")[0];

      await user.click(BerlinGermanySuggestions);

      expect(cityTextBox).toHaveValue(BerlinGermanySuggestions.textContent);
    });

    let allEvents;
    when("the user can view events taking place in the city", async () => {
      allEvents = await getEvents();
      const EventComponent = render(<Event event={allEvents[0]} />);
      expect(
        EventComponent.queryByText(allEvents[0].location)
      ).toBeInTheDocument();
    });

    then(
      "an option should be displayed to expand event information",
      async () => {
        allEvents = await getEvents();
        const EventComponent = render(<Event event={allEvents[0]} />);
        expect(
          EventComponent.container.querySelector(".showDetailsButton")
        ).toBeInTheDocument();
      }
    );
  });

  test("User can expand an event to see details", ({ given, when, then }) => {
    let allEvents;
    given("an event has been selected", async () => {
      allEvents = await getEvents();
      const EventComponent = render(<Event event={allEvents[0]} />);
    });

    when("the user clicks to view more details", async () => {
      const EventComponent = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      const button =
        EventComponent.container.querySelector(".showDetailsButton");
      await user.click(button, "Show Details");
    });

    then("more detailed information is displayed", async () => {
      const EventComponent = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      const button =
        EventComponent.container.querySelector(".showDetailsButton");
      await user.click(button, "Show Details");
      expect(
        EventComponent.container.querySelector(".details")
      ).toBeInTheDocument();
    });
  });

  test("User can collapse an event to hide details", ({
    given,
    when,
    then,
  }) => {
    let allEvents;
    given("the user has viewed event details in their entirety", async () => {
      allEvents = await getEvents();
      const EventComponent = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      const button =
        EventComponent.container.querySelector(".showDetailsButton");
      await user.click(button, "Show Details");
      expect(
        EventComponent.container.querySelector(".details")
      ).toBeInTheDocument();
    });

    when("the user chooses to view another event or city", () => {});

    then("the event should return to its default element", async () => {
      const EventComponent = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      const button =
        EventComponent.container.querySelector(".hideDetailsButton");
      await user.click(button, "Hide Details");
      expect(
        EventComponent.container.querySelector(".details")
      ).not.toBeInTheDocument();
    });
  });
});
