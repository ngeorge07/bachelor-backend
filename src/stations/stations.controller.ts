import { Controller, Get, Param } from '@nestjs/common';
import { StationsService } from './stations.service';
import { TripFormatted } from 'src/common/interfaces/trip.interface';
import secondsAfterMidnightToCustomFormat from 'src/utils/formatSecondsAfterMidnight';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  async getAllStations() {
    return this.stationsService.getAllStations();
  }

  @Get(':id')
  async getStationById(@Param('id') id: string) {
    const stationData = await this.stationsService.getStationDetails(id);

    // Modify the `scheduledArrival` field
    stationData.routes.forEach((route) => {
      route.trips.forEach((trip: TripFormatted) => {
        trip.stoptimes.forEach((stopTime) => {
          const arrivalDate = secondsAfterMidnightToCustomFormat(
            stopTime.scheduledArrival,
            route.delay,
          );

          const departureDate = secondsAfterMidnightToCustomFormat(
            stopTime.scheduledDeparture,
            route.delay,
          );

          stopTime.scheduledArrival = arrivalDate.scheduled;
          stopTime.scheduledDeparture = departureDate.scheduled;

          stopTime.estimatedTimeArrival = arrivalDate.estimated;
          stopTime.estimatedTimeDeparture = departureDate.estimated;
        });
      });
    });

    return stationData;
  }
}
