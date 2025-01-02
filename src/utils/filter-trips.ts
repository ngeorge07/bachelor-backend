// src/utils/filterTrips.ts

export const getCurrentTimeInSeconds = (): number => {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
};

export const getStopIndex = (
  stoptimes: any[],
  currentStopName: string,
): number => {
  return stoptimes.findIndex(
    (stopTime) => stopTime.stop.name === currentStopName,
  );
};

export const filterTrips = (trips: any[], currentStopName: string): any[] => {
  const currentTime = getCurrentTimeInSeconds();

  return trips.filter((trip) => {
    // Exclude trips with only one stop time (end of trip)
    if (trip.stoptimes.length === 1) return false;

    const stopIndex = getStopIndex(trip.stoptimes, currentStopName);

    // If the current stop isn't in the trip, skip the trip
    if (stopIndex === -1) return false;

    // Filter out stoptimes that are before the current time
    const validStoptimes = trip.stoptimes
      .slice(stopIndex)
      .filter((stopTime) => stopTime.realtimeDeparture > currentTime);

    // If there are no valid stoptimes after the current stop, exclude this trip
    if (validStoptimes.length === 0) return false;

    // If all the stoptimes before the current stop have already passed, exclude the route
    const hasFutureStops = trip.stoptimes.some((stopTime, index) => {
      if (index < stopIndex) {
        return stopTime.realtimeDeparture > currentTime;
      }
      return false;
    });

    // If no future stops found, exclude the trip
    if (!hasFutureStops) return false;

    // Assign filtered stoptimes to the trip
    trip.stoptimes = validStoptimes;

    return true; // Keep the trip if it's valid
  });
};

export const filterRoutes = (routes: any[], currentStopName: string): any[] => {
  return routes.filter((route) => {
    // Filter the trips for each route
    route.trips = filterTrips(route.trips, currentStopName);

    // Exclude the route if no valid trips remain after filtering
    return (
      route.trips.length > 0 &&
      route.trips.some((trip) => trip.stoptimes.length > 1)
    );
  });
};
