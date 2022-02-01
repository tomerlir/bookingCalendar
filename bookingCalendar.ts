import * as fs from "fs";

// availabilities: Defines when the photographer is available to have bookings.
// bookings: existing bookings for a photographer. This slot is not open for new bookings.
function availableTimeSlotsForBooking(durationInMinutes: number): {
  photographer: { id: string; name: string };
  timeSlot: { starts: string; ends: string };
}[] {
  // parsing the photographers
  const content = JSON.parse(readJSON());
  let allAvailableSlots: [{ starts: Date; ends: Date }];
  let suggestedSlots = [];
  // console.log(content?.photographers)
  content?.photographers?.forEach((photographer) => {
    let bookings = photographer.bookings;
    let availabilities = photographer?.availabilities;
    allAvailableSlots = splitAvailableTimes(availabilities, bookings);
    let timeSlots = createAvailableTimeSlots(
      durationInMinutes,
      allAvailableSlots
    );
    suggestedSlots.push(suggestTimeSlot(photographer, timeSlots));
  });
  // Proof of proper strcuture, can use JSON.stringify to output as json
  console.log(suggestedSlots);

  // If it was an API, I would send a response with suggestedSlots
  // Since not, just returning
  return suggestedSlots;
}

// Reading from JSON structures file
function readJSON() {
  return fs.readFileSync("./bookings.json", "utf8");
}

// Split all available times into slots depending on if there's a
// Booking in between the available times.
function splitAvailableTimes(
  availabilities: [{ starts: Date; ends: Date }],
  booked: [{ starts: Date; ends: Date }]
) {
  availabilities.forEach((availability, index) => {
    booked.forEach((booking) => {
      if (
        availability.starts <= booking.ends &&
        booking.starts < availability.ends
      ) {
        // Remove the avaiability at this position and replace with the new availability
        availabilities[index] = {
          starts: new Date(availability.starts),
          ends: new Date(booking.starts),
        };
        if (booking.ends !== availability.ends) {
          // If not the end of the availabilities, then push a new availability
          availabilities.push({
            starts: new Date(booking.ends),
            ends: new Date(availability.ends),
          });
        }
      } else {
        // Replace the availabilities with Date formats for calculation purposes
        availabilities[index] = {
          starts: new Date(availability.starts),
          ends: new Date(availability.ends),
        };
      }
    });
  });
  return availabilities;
}

// Calculate all the available time slots for the duration stated
function createAvailableTimeSlots(duration: number, availabilities: any[]) {
  let durationInMs = duration * 60000;
  let timeSlots: { starts: Date; ends: Date }[] = [];
  availabilities?.forEach((availability) => {
    let starts = availability?.starts.getTime();
    let ends = availability?.ends.getTime();
    if (0 < ends - starts - durationInMs) {
      // Add to available time slots
      for (let i = starts; i < ends - durationInMs; i += durationInMs) {
        timeSlots.push({
          starts: new Date(i),
          ends: new Date(i + durationInMs),
        });
      }
    }
  });
  return timeSlots;
}

// Building structure for response
function suggestTimeSlot(photographer, timeSlot) {
  let structure = {
    photographer: {
      id: parseInt(photographer?.id),
      name: photographer?.name,
    },
    timeSlot: {
      // Suggesting the first available timeslot, hence the [0]
      starts: timeSlot[0]?.starts.toISOString(),
      ends: timeSlot[0]?.ends.toISOString(),
    },
  };
  return structure;
}

// RUNNING THE FUNCTION HERE
availableTimeSlotsForBooking(90);
