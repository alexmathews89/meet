This app will use serverless functions. These functions will be used to authenticate users and gather event data. The meet app will be using AWS and Google OAuth.

Show/Hide Event Details:
As a user,
I should be able to show/hide event details
So that I can view details about a certain event.

Scenario 1: An event element is collapsed by default.

    Given user has searched a city;
    When the user can view events taking place in the city;
    Then an option should be shown to expand event information.

Scenario 2: User can expand an event to see details.

    Given an event has been selected;
    When the user clicks to view more details;
    Then more detailed event information is displayed.

Scenario 3: User can collapse an event to hide details.

    Given user has viewed event details in their entirety;
    When the user chooses to view another event or city;
    Then the event should return to its default element.

Specify Number of Events:

    As a user,
    I should be able to specify the number of events
    So that I can view how many events are taking place in a certain city.

Scenario 1: When user hasn’t specified a number, 32 events are shown by default.

    Given a city is selected;
    When the user has hasn’t selected an event
    Then 32 events are shown unless the user makes an update.

Scenario 2: User can change the number of events displayed.

    Given a number is specified;
    When the user is viewing a number of events in a city;
    Then the number will update based on the user’s input;

Use the App When Offline:

    As a user,
    I should be able to use the app when offline
    So that I can view events while traveling in areas without an internet connection.

Scenario 1: Show cached data when there’s no internet connection

    Given an internet connection hasn’t been found;
    When a user is trying to view data;
    Then cached data will be rendered to the user.

Scenario 2: Show error when user changes search settings (city, number of events).

    Given the settings have been changed;
    When the user makes an update;
    Then an error message will be displayed.

Add an App Shortcut to the Home Screen:

    As a user,
    I should be able to add an app shortcut to the Home Screen
    So that I can have direct access to the app’s information.

Scenario 1: User can install the meet app as a shortcut on their device home screen.

    Given the app has been opened;
    When the user decides to create a shortcut to access the app;
    Then a button will be displayed to the user.

Display Charts Visualizing Event Details:

    As a user,
    I should be able to display charts to visualize event details
    So that I can see organized information about certain events.

Scenario 1: Show a chart with the number of upcoming events in each city

    Given that a single city hasn’t been selected;
    When the user requests more information about city events;
    Then a chart will be shown with the number of upcoming events in each city.
