import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StationsModule } from './stations/stations.module';
import { DatabaseModule } from './database/database.module';
import { DelaysModule } from './delays/delays.module';
import { RemarksModule } from './remarks/remarks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CommandModule } from 'nestjs-command';
import { SeedsModule } from './shared/seeds.module';

@Module({
  imports: [
    HttpModule,
    StationsModule,
    DatabaseModule,
    DelaysModule,
    RemarksModule,
    AuthModule,
    UsersModule,
    CommandModule,
    SeedsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
