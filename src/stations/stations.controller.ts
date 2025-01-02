import { Controller, Get, Param } from '@nestjs/common';
import { StationsService } from './stations.service';
import { TripFormatted } from 'src/common/interfaces/trip.interface';

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

    function secondsAfterMidnightToCustomFormat(seconds) {
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0); // Reset time to midnight

      // Add the seconds
      const resultDate = new Date(midnight.getTime() + seconds * 1000);

      // Format the date
      const day = resultDate.getDate().toString().padStart(2, '0');
      const month = (resultDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
      const year = resultDate.getFullYear();
      const hours = resultDate.getHours().toString().padStart(2, '0');
      const minutes = resultDate.getMinutes().toString().padStart(2, '0');
      const secs = resultDate.getSeconds().toString().padStart(2, '0');

      return `${day}-${month}-${year} ${hours}:${minutes}:${secs}`;
    }
    // Modify the `realtimeArrival` field
    stationData.routes.forEach((route) => {
      route.trips.forEach((trip: TripFormatted) => {
        trip.stoptimes.forEach((stoptime) => {
          const arrivalDate = secondsAfterMidnightToCustomFormat(
            stoptime.realtimeArrival,
          );

          const departureDate = secondsAfterMidnightToCustomFormat(
            stoptime.realtimeDeparture,
          );

          stoptime.realtimeArrival = arrivalDate;
          stoptime.realtimeDeparture = departureDate;
        });
      });
    });

    return stationData;
  }
}
