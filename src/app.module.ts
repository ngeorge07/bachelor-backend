import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StationsModule } from './stations/stations.module';
import { DelaysModule } from './delays/delays.module';
import { RemarksModule } from './remarks/remarks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CommandModule } from 'nestjs-command';
import { SeedsModule } from './shared/seeds.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [
    // get db_host from .env for mongo
    MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:27017/my_train`),
    HttpModule,
    StationsModule,
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
