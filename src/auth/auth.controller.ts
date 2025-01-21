import {
  Controller,
  Body,
  Post,
  Get,
  Request,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { IdMatchGuard } from 'src/auth/guards/idMatch.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Roles(Role.SuperAdmin)
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      throw new ConflictException('User already exists');
    }
  }

  @Public()
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    const token = (
      await this.authService.login(signInDto.email, signInDto.password)
    ).access_token;

    if (token) {
      return this.authService.login(signInDto.email, signInDto.password);
    }
  }

  @Get('profile')
  @UseGuards(IdMatchGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
