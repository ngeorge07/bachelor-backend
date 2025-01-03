import { Injectable } from '@nestjs/common';
import { OpenTransportService } from './open-transport.service';
import { filterRoutes } from 'src/utils/filter-trips';
import { DelaysService } from 'src/delays/delays.service';

@Injectable()
export class StationsService {
  constructor(
    private readonly openTransportService: OpenTransportService,
    private readonly delayService: DelaysService,
  ) {}

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

    const routesWithDelays = await Promise.all(
      filteredRoutes.map(async (route) => {
        const delayData = await this.delayService.setDelay(route.shortName, 0);
        return {
          ...route,
          delay: delayData?.delay || 0,
        };
      }),
    );

    return {
      ...stationDetails,
      routes: routesWithDelays,
    };
  }
}
