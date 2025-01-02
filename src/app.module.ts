import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StationsModule } from './stations/stations.module';

@Module({
  imports: [HttpModule, StationsModule],
})
export class AppModule {}
