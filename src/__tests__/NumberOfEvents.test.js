/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;

  test("renders text input", () => {
    const NumberOfEventsComponent = render(<NumberOfEvents />);
    expect(NumberOfEventsComponent.queryByRole("textbox")).toBeInTheDocument();
  });

  test("By default, the value of the input field is 32", () => {
    const NumberOfEventsComponent = render(<NumberOfEvents />);
    expect(NumberOfEventsComponent.queryByRole("textbox")).toHaveValue("32");
  });

  test("updates the value of the textbox as the user types", async () => {
    const NumberOfEventsComponent = render(<NumberOfEvents />);
    const user = userEvent.setup();
    const userInput = NumberOfEventsComponent.queryByRole("textbox");
    await user.type(userInput, "{backspace}{backspace}10");
  });
});
