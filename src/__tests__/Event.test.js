/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import { getEvents } from "../api";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";

describe("<Event /> component", () => {
  let allEvents;
  beforeAll(async () => {
    allEvents = await getEvents();
  });

  test("renders the event title", () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("renders the event's start time", () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  test("renders event location", () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
  });

  test("by default, the event's details section should be hidden", () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.container.querySelector(".details")
    ).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    const user = userEvent.setup();
    const button = EventComponent.container.querySelector(".showDetailsButton");
    await user.click(button, "Show Details");
    expect(
      EventComponent.container.querySelector(".details")
    ).toBeInTheDocument();
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    const user = userEvent.setup();
    const button = EventComponent.container.querySelector(".hideDetailsButton");
    await user.click(button, "Hide Details");
    expect(
      EventComponent.container.querySelector(".details")
    ).not.toBeInTheDocument();
  });
});
