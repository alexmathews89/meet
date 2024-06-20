Feature: Specify number of events
    Scenario: When user hasn't specified a number, 32 events are shown by default
        Given a city is selected
        When the user hasn't selected an event
        Then 32 events are shown unless the user makes an update

    Scenario: User can change the number of events displayed
        Given a number is specified
        When the user is viewing a number of events in a city
        Then the number will update based on the user's input     



    