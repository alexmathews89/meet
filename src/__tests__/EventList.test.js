/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import EventList from "../components/EventList";

describe("<EventList /> component", () => {
  let EventListComponent;
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    EventListComponent = render(<EventList />);
  });

  test("has an element with a 'list' role", () => {
    //const EventListComponent = render(<EventList />);
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test("renders correct number of events", () => {
    EventListComponent.rerender(
      <EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
    );
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
  });
});
