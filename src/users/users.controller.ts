import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRequestDto } from './dto/users.request.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User Data' })
  async setUser(@Body() user: UserRequestDto) {
    return this.usersService.addUser(user);
  }

  @Get()
  @ApiOperation({ summary: 'Read User Data' })
  async getUser(@Body('email') email: string) {
    return this.usersService.getUser(email);
  }

  @Patch()
  @ApiOperation({ summary: 'Update User Data' })
  async updateUser(@Body() user: UserRequestDto) {
    return this.usersService.updateUser(user);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete User Data' })
  async deleteUser(@Body('email') email: string) {
    return this.usersService.deleteUser(email);
  }
}
