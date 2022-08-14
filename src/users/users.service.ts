import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRequestDto } from './dto/users.request.dto';
import { Users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async addUser(user: UserRequestDto) {
    const isExist = await this.userModel.exists({ email: user.email });

    if (isExist) {
      throw new Error('Email Duplication');
    }

    const createUser = await this.userModel.create({
      email: user.email,
      nickname: user.nickname,
      password: user.password,
    });

    return createUser.readOnlyData;
  }

  async getUser(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async updateUser(user: UserRequestDto) {
    return await this.userModel.updateOne(
      { email: user.email },
      { $set: { nickname: user.nickname } },
    );
  }

  async deleteUser(email: string) {
    const emailExist = await this.userModel.exists({ email: email });

    if (emailExist) {
      return await this.userModel.deleteOne();
    } else {
      throw new Error('Not Found Email');
    }
  }
}
