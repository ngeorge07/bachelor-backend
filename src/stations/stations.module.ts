import { Module } from '@nestjs/common';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { OpenTransportService } from './open-transport.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [StationsController],
  providers: [StationsService, OpenTransportService],
})
export class StationsModule {}
