import {
  Controller,
  Body,
  Post,
  Get,
  Request,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import {} from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
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
  getProfile(@Request() req) {
    return req.user;
  }
}
