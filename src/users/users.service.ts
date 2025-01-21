import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  @Roles(Role.SuperAdmin)
  async createUser(createUserDto: CreateUserDto) {
    const createdNewUser = new this.userModel(createUserDto);
    return createdNewUser.save();
  }

  async findOne(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email: email });
  }

  async findOneById(id: string) {
    const user = await this.userModel
      .findById(new mongoose.Types.ObjectId(id))
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async remove(id: string) {
    const user = await this.userModel
      .findByIdAndDelete(new mongoose.Types.ObjectId(id))
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return { message: `User with ID ${id} has been successfully deleted.` };
  }
}
