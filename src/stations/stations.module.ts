import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { OpenTransportService } from './open-transport.service';
import { DelaysModule } from 'src/delays/delays.module'; // Import DelaysModule here
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([]), // Add your other model imports if needed
    DelaysModule, // Import DelaysModule to access DelaysService
  ],
  controllers: [StationsController],
  providers: [StationsService, OpenTransportService],
})
export class StationsModule {}
