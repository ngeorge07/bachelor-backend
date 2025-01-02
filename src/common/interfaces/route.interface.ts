import { Trip } from './trip.interface';

export interface Route {
  shortName: string;
  trips: Trip[];
}
