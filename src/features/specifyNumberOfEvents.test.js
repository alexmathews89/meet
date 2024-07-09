/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import CitySearch from "../components/CitySearch";
import EventList from "../components/EventList";
import NumberOfEvents from "../components/NumberOfEvents";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn't specified a number, 32 events are shown by default", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("a city is selected", () => {
      AppComponent = render(<App />);
    });
    let EventListComponent;
    when("the user hasn't selected an event", () => {
      EventListComponent = render(<EventList />);
    });

    then("32 events are shown unless the user makes an update", async () => {
      const AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test("User can change the number of events displayed", ({
    given,
    when,
    then,
  }) => {
    let NumberOfEventsComponent;
    given("a number is specified", async () => {
      const NumberOfEventsComponent = render(
        <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
      );
      const user = userEvent.setup();
      const userInput = NumberOfEventsComponent.queryByRole("textbox");
      await user.type(userInput, "{backspace}{backspace}10");
    });
    let EventListComponent;
    when("the user is viewing a number of events in a city", () => {
      EventListComponent = render(<EventList />);
    });
    let AppComponent;
    then("the number will update based on the user's input", async () => {
      const user = userEvent.setup();
      const AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      const NumberOfEventsComponent = render(<NumberOfEvents />);
      const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
      const NumberOfEventsInput =
        within(NumberOfEventsDOM).queryByRole("textbox");

      await user.type(NumberOfEventsInput, "{backspace}{backspace}10");

      const EventListDOM = AppDOM.querySelector("#event-list");
      const renderedNumberOfEvents =
        within(EventListDOM).queryAllByRole("listitem");
      expect(renderedNumberOfEvents.length).toBe(33);
    });
  });
});
