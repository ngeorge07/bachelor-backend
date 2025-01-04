import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersCommand {
  constructor(private readonly usersService: UsersService) {}

  // DB seed service
  // npx nestjs-command create:accounts
  @Command({
    command: 'create:accounts',
    describe: 'creates default user accounts',
  })
  async create() {
    const admin = await this.usersService.createUser({
      fullName: 'Admin account',
      email: 'admin@admin.com',
      password: await bcrypt.hash('Administrator1', 10),
    });

    if (admin) {
      console.log('Default user accounts seeded successfully');
    }
  }
}
