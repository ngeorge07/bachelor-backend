import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StationsModule } from './stations/stations.module';
import { DatabaseModule } from './database/database.module';
import { DelaysModule } from './delays/delays.module';
import { RemarksModule } from './remarks/remarks.module';

@Module({
  imports: [
    HttpModule,
    StationsModule,
    DatabaseModule,
    DelaysModule,
    RemarksModule,
  ],
})
export class AppModule {}
