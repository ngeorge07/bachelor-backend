import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from './enums/role.enum';
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
      roles: [Role.Admin],
    });

    const superAdmin = await this.usersService.createUser({
      fullName: 'Super Admin user',
      email: 'superAdmin@admin.com',
      password: await bcrypt.hash('SuperAdministrator1', 10),
      roles: [Role.SuperAdmin],
    });

    if (admin && superAdmin) {
      console.log('Default user accounts seeded successfully');
    }
  }
}
