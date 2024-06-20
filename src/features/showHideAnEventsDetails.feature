Feature: Show/hide event details
    Scenario: An event element is collapsed by default
        Given user has searched a city
        When the user can view events taking place in the city
        Then an option should be displayed to expand event information
    
    Scenario: User can expand an event to see details
        Given an event has been selected
        When the user clicks to view more details
        Then more detailed information is displayed

    Scenario: User can collapse an event to hide details
        Given the user has viewed event details in their entirety
        When the user chooses to view another event or city
        Then the event should return to its default element         



    