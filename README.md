
# Simple Reminder App

This project was created for Codelitt's job interview as a challenge to create a Calendar with no library and a Reminder Manager. To execute this challenge the following tecnologies were chosen:

 - React
 - Redux (react-redux)
 - Tailwindcss
 - Dayjs

Redux was chosen as the state manager following one of the rules for this challenge. Tailwindcss was used to easily created a beautiful app with good design patterns. Dayjs was used to make simple to manipulate Date objects.
To ensure a good code formating and best pratices was used Eslint, Editorconfig and Prettier. The app is hosted on **Firebase Hosting**.

With  a little more time I could write test for all visual components and improve accessibility, both important points. But I'm satisfied and happy with the result achieved within the stipulated time. Improvement plans are listed in the backlog section [backlog section ](https://gitlab.com/codelittinc/react-interview-project-john-vidal/-/blob/develop/README.md#backlog).

## Link to application
[Calendar Reminder Manager](https://calendar-project-2bd43.web.app/)

## Challenges executed

 - [x] You need to use one of the following state management libraries: Relay, Apollo, MobX or Redux
 - [x] Ability to add a new “reminder” (max 30 chars) for a user entered day and time.
 - [x] Display reminders on the calendar view in the correct time order.
 - [x] Allow the user to select a color when creating a reminder and display it appropriately.
 - [x] Properly handle overflow when multiple reminders appear on the same date.
 - [x] Ability to edit reminders – including changing text, day and time & color.
 - [x] Ability to delete reminders.
 - [x] Expand the calendar to support more than the current month.

## Screenshots

![App Dashboard](https://gitlab.com/codelittinc/react-interview-project-john-vidal/-/raw/develop/screenshots/app1.jpeg)
![Creating reminder](https://gitlab.com/codelittinc/react-interview-project-john-vidal/-/raw/develop/screenshots/app2.jpeg)
![Year selector](https://gitlab.com/codelittinc/react-interview-project-john-vidal/-/raw/develop/screenshots/app3.jpeg)
![Month selector](https://gitlab.com/codelittinc/react-interview-project-john-vidal/-/raw/develop/screenshots/app4.jpeg)

## Getting Started
To run this project locally is simple:

 1. Clone the repository
 2. Execute `yarn install`
 3. Run `yarn start`

## File Structure

 - src
	 - **app**: app settings
	 - **pages**: all application pages
	 - **components**: all components shared by the app
	 - **features**: all reducers and slices used by redux
	 - **types**: all Types shared by the app
	 - **utils**: simple functions to abstract logic and avoid repetitions

## Backlog

 - [ ] Improve test coverage
 - [ ] Improve accessibility
 - [ ] Create dark mode
 - [ ] Connect to a cloud database
 - [ ] Send notification for reminders

## Authors
- [@johnvidal77](https://www.linkedin.com/in/johnvidal77)
