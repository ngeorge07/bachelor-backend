import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { UsersCommand } from 'src/users/users.command';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/user.model';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersCommand, UsersService],
  exports: [UsersCommand],
})
export class SeedsModule {}
