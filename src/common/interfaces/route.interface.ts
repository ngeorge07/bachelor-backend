import { TripRaw } from './trip.interface';

export interface Route {
  shortName: string;
  trips: TripRaw[];
}
