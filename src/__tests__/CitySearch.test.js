/* eslint-disable no-undef */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";

const user = userEvent.setup();

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch />);
  });

  test("renders text input", () => {
    const cityTextBox = CitySearchComponent.queryByRole("textbox");

    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestion list is hidden by default", () => {
    const suggestionList = CitySearchComponent.queryByRole("list");

    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  // Lesson Code:

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    //user types "Berlin" in the text box
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    //filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    //get all <li> elements inside of the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  /** 
  //Tutor's Code:
  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    const BerlinGermanySuggestions =
      CitySearchComponent.queryAllByRole("listitem")[0];

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestions.textContent);
  });
  */
});
