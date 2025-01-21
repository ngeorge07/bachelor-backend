import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Role } from './enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { IdMatchGuard } from '../auth/guards/idMatch.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.SuperAdmin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(IdMatchGuard)
  findOneId(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Delete(':id')
  @UseGuards(IdMatchGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
