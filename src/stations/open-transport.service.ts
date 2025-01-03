import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OpenTransportService {
  constructor(private readonly httpService: HttpService) {}

  async fetchStations() {
    const query = `{
      stops(feeds: "cfr") {
        gtfsId
        name
      }
    }`;

    const response = await firstValueFrom(
      this.httpService.post(
        'https://api.opentransport.ro/routing/v1/routers/romania/index/graphql',
        { query },
      ),
    );
    return response.data.data.stops;
  }

  async fetchStationDetails(gtfsId: string) {
    const query = `{
      stop(id: "${gtfsId}") {
        name
        routes {
          shortName
          trips {
            gtfsId
            stoptimes {
              stop {
                name
                gtfsId
              }
              scheduledArrival
              scheduledDeparture
            }
          }
        }
      }
    }`;

    const response = await firstValueFrom(
      this.httpService.post(
        'https://api.opentransport.ro/routing/v1/routers/romania/index/graphql',
        { query },
      ),
    );
    return response.data.data.stop;
  }
}
