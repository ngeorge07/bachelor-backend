import { Stop } from './stop.interface';

export interface Trip {
  gtfsId: string;
  stoptimes: {
    stop: Stop;
    realtimeArrival: string;
    realtimeDeparture: string;
  }[];
}
