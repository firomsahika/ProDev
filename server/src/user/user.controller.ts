import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, InternalServerErrorException, UseGuards, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  

  @Get('all')
  async findAllUsers() {
     try{
      const users = await this.userService.getAllUser();
      return {
        statusCode: HttpStatus.OK,
        message: "Users retrieved successfully",
        data: users,
      }
     }catch(error){
         throw new InternalServerErrorException('Failed to retrieve users.');
     }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const User = await this.userService.findById(id);
      return {
        statusCode: HttpStatus.OK,
        message: "User retrieved successfully",
        data: User,
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve user.');
    }
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    try {
      const userId = req.user.sub;
      const updatedUser = await this.userService.updateUser(userId, updateUserDto);
      return {
        statusCode: HttpStatus.OK,
        message: "User updated successfully",
        data: updatedUser,
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user.');
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.userService.deleteUser(id);
      return {
        statusCode: HttpStatus.OK,
        message: "User deleted successfully",
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user.');
    }
  }

  // change password
  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword(@Body('newPassword') newPassword: string, @Req() req: any) {
    try {
      const userId = req.user?.sub ?? req.user?.id ?? req.user;
      if(!userId){
        throw new InternalServerErrorException('User identification failed.');
      }
      const result = await this.userService.changePassword(userId , newPassword);
      
      return {                                  
        statusCode: HttpStatus.OK,
        message: "Password changed successfully",
        data: result,
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to change password.');
    }
  }

  @Get('search')
  searchUsers(@Query() dto: SearchUserDto) {
  return this.userService.searchUsers(dto);
}
}
