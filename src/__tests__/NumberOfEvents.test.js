/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;

  test("renders text input", () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
    );
    expect(NumberOfEventsComponent.queryByRole("textbox")).toBeInTheDocument();
  });

  test("By default, the value of the input field is 32", () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
    );
    expect(NumberOfEventsComponent.queryByRole("textbox")).toHaveValue("32");
  });

  test("updates the value of the textbox as the user types", async () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
    );
    const user = userEvent.setup();
    const userInput = NumberOfEventsComponent.queryByRole("textbox");
    await user.type(userInput, "{backspace}{backspace}10");
  });
});

describe("<NumberOfEvents /> integration", () => {
  test("changes the number of listed events based on user input in 'number of events' field", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsComponent = render(
      <NumberOfEvents setErrorAlert={() => {}} />
    );
    const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
    const NumberOfEventsInput =
      within(NumberOfEventsDOM).queryByRole("textbox");

    await user.type(NumberOfEventsInput, "{backspace}{backspace}10");

    const EventListDOM = AppDOM.querySelector("#event-list");
    const renderedNumberOfEvents =
      within(EventListDOM).queryAllByRole("listitem");
    expect(renderedNumberOfEvents.length).toBe(10);
  });
});
