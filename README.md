# bookingCalendar

## A booking calendar for photographers

### Cloning the Repository
In terminal, navigate your current directory to the location where you would like the cloned directory. Type the following
```
git clone
```
followed by pasting the repository link that can be copied via the green button labeled Code (top-right).

### Booking Calendar
To run, please ensure you have the latest versions of npm and typescript installed.
For NPM you may navigate to https://nodejs.org/en/download/. Ensure it has been properly installed by running the following commands in your terminal.
```
node -v
npm -v
```
Once they're installed successfully, run the following command to install typescript
```
npm install -g typescript 
```
Then, navigate to the bookingCalendar directory and run the following command 
```
tsc bookingCalendar.ts
```
In order to compile the file and output a JS version.

Finally, by using node we can run the following command
```
node bookingCalendar.js
```
You will see the output of the function in the terminal, for testing purposes, you may input another value of your choice into the function and see the suggested time slot for the photographers.