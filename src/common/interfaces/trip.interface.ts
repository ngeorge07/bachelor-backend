import { Stop } from './stop.interface';

export interface TripFormatted {
  gtfsId: string;
  stoptimes: {
    stop: Stop;
    scheduledArrival: string;
    scheduledDeparture: string;
    estimatedTimeDeparture: string;
    estimatedTimeArrival: string;
  }[];
}

export interface TripRaw {
  gtfsId: string;
  stoptimes: {
    stop: Stop;
    scheduledArrival: number;
    scheduledDeparture: number;
    estimatedTimeDeparture: number;
    estimatedTimeArrival: number;
  }[];
}
