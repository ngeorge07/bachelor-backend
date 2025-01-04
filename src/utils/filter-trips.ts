// src/utils/filterTrips.ts

import { Route } from 'src/shared/interfaces/route.interface';
import { TripRaw } from 'src/shared/interfaces/trip.interface';

export const getCurrentTimeInSeconds = (): number => {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
};

export const getStopIndex = (
  stoptimes: {
    stop: { name: string; gtfsId: string };
    scheduledDeparture: number;
    scheduledArrival: number;
  }[],
  currentStopName: string,
): number => {
  return stoptimes.findIndex(
    (stopTime) => stopTime.stop.name === currentStopName,
  );
};

// Because the open API return the trip with all stops, we need to remove the stops previous to the current station
export const filterTrips = (trips: TripRaw[], currentStopName: string) => {
  const currentTime = getCurrentTimeInSeconds();

  return trips.filter((trip) => {
    // Exclude trips with only one stop time (end of trip)
    // Could possibly go in "Arrivals" screen
    if (trip.stoptimes.length === 1) return false;

    const stopIndex = getStopIndex(trip.stoptimes, currentStopName);

    // If the current stop isn't in the trip, skip the trip
    // if (stopIndex === -1) return false;

    // Filter out stoptimes that are before the current time
    const validStoptimes = trip.stoptimes
      .slice(stopIndex)
      .filter((stopTime) => stopTime.scheduledDeparture > currentTime);

    // If all the stoptimes before the current stop have already passed, exclude the route
    const hasFutureStops = trip.stoptimes.some((stopTime, index) => {
      if (index < stopIndex) {
        return stopTime.scheduledDeparture > currentTime;
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

export const filterRoutes = (
  routes: Route[],
  currentStopName: string,
): Route[] => {
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
