import { Route } from '../interfaces/route.interface';

export class StationDetailsDto {
  id: string;
  name: string;
  routes: Route[];
}
