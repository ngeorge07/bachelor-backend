import { Injectable } from '@nestjs/common';
import { OpenTransportService } from './open-transport.service';
import { filterRoutes } from 'src/utils/filter-trips';
import { DelaysService } from 'src/delays/delays.service';
import { RemarksService } from 'src/remarks/remarks.service';

@Injectable()
export class StationsService {
  constructor(
    private readonly openTransportService: OpenTransportService,
    private readonly delayService: DelaysService,
    private readonly remarksService: RemarksService,
  ) {}

  async getAllStations() {
    return this.openTransportService.fetchStations();
  }

  async getStationDetails(gtfsId: string) {
    const stationDetails =
      await this.openTransportService.fetchStationDetails(gtfsId);
    const currentStopName = stationDetails.name; // This is the stop the user selects, e.g., "Semlac"

    const routesWithDelays = await Promise.all(
      stationDetails.routes.map(async (route) => {
        const delayData = await this.delayService.getDelayByTrainNumber(
          route.shortName,
        );

        const remarkData = await this.remarksService.getRemarkByTrainNumber(
          route.shortName,
        );

        return {
          ...route,
          delay: delayData?.delay || 0,
          remarks: remarkData?.messages || [],
        };
      }),
    );

    // Filter the routes and trips with sorting
    const filteredRoutes = filterRoutes(routesWithDelays, currentStopName).sort(
      (a, b) =>
        a.trips[0].stoptimes[0].scheduledDeparture -
        b.trips[0].stoptimes[0].scheduledDeparture,
    ); // Sort by closest departure;

    return {
      ...stationDetails,
      routes: filteredRoutes,
    };
  }
}
