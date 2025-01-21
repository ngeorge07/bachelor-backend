import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UsersController } from './users.controller';
import { IdMatchGuard } from '../auth/guards/idMatch.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, IdMatchGuard],
  exports: [UsersService],
})
export class UsersModule {}
