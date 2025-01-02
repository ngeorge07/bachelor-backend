import { Injectable } from '@nestjs/common';
import { OpenTransportService } from './open-transport.service';
import { filterRoutes } from 'src/utils/filter-trips';

@Injectable()
export class StationsService {
  constructor(private readonly openTransportService: OpenTransportService) {}

  async getAllStations() {
    return this.openTransportService.fetchStations();
  }

  async getStationDetails(gtfsId: string) {
    const stationDetails =
      await this.openTransportService.fetchStationDetails(gtfsId);
    const currentStopName = stationDetails.name; // This is the stop the user selects, e.g., "Semlac"

    // Filter the routes and trips with sorting
    const filteredRoutes = filterRoutes(
      stationDetails.routes,
      currentStopName,
    ).sort(
      (a, b) =>
        a.trips[0].stoptimes[0].realtimeDeparture -
        b.trips[0].stoptimes[0].realtimeDeparture,
    ); // Sort by closest departure;

    return {
      ...stationDetails,
      routes: filteredRoutes, // Use filtered and sorted routes
    };
  }
}
