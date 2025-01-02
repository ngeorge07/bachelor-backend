import { Stop } from './stop.interface';

export interface TripFormatted {
  gtfsId: string;
  stoptimes: {
    stop: Stop;
    realtimeArrival: string;
    realtimeDeparture: string;
  }[];
}

export interface TripRaw {
  gtfsId: string;
  stoptimes: {
    stop: Stop;
    realtimeArrival: number;
    realtimeDeparture: number;
  }[];
}
