import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { SearchUserDto } from './dto/search-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService) {}
   
  // Helper function for user Response
   private toResponse(user:any): UserResponseDto{
      const {password, ...safeData} = user;
      return safeData;
    }


  async getAllUser(){
    try {
      const users = await this.prisma.user.findMany();
      if(!users){
        throw new UnauthorizedException('No users found');
      }
      return users;
    } catch (error) {
        throw new InternalServerErrorException('Failed to retrieve user profile.');
    }
  }
  async findById(userId:string){
      try{
         const user = await this.prisma.user.findUnique({
          where: {id: userId},
         })

        if (!user) {
           throw new UnauthorizedException('User not found');
        }

         return user;
      }catch(error){
          throw new InternalServerErrorException('Failed to retrieve user profile.');
      }
  }

  async updateUser(userId:string, updateUserDto:UpdateUserDto){
    try{
        const updatedUser = await this.prisma.user.update({
          where: {id: userId},
          data: updateUserDto,
        });
        
        return updatedUser;
    }catch(error){
        throw new InternalServerErrorException('Failed to update user profile.');
    }
  }

  async findByUsername(username:string){
    try{
        const user = await this.prisma.user.findUnique({
          where: {username},
        });

        if(!user){
          throw new UnauthorizedException('User not found');
        }

        return user;
    }catch(error){
        throw new InternalServerErrorException('Failed to retrieve user by username.');
    }
  }

  async deleteUser(userId:string){
    try{
        await this.prisma.user.delete({
          where: {id: userId},
        });
        return { message: 'User deleted successfully.' };
    }catch(error){
        throw new InternalServerErrorException('Failed to delete user.');
    }
  }

  async changePassword(userId:string, newPassword:string){
    try{
        const updatedUser = await this.prisma.user.update({
          where: {id: userId},
          data: { password: newPassword },
        });
        
        return updatedUser;
    }catch(error){
        throw new InternalServerErrorException('Failed to change password.');
    }
}


async searchUsers(dto: SearchUserDto) {
  return this.prisma.user.findMany({
    where: {
      AND: [
        dto.query
          ? {
              OR: [
                { username: { contains: dto.query, mode: 'insensitive' } },
                { fullName: { contains: dto.query, mode: 'insensitive' } },
              ]
            }
          : {},
        dto.location
          ? { location: { contains: dto.location, mode: 'insensitive' } }
          : {},
        dto.skill
          ? {
              portfolio: {
                is: {
                  skills: { has: dto.skill }
                }
              }
            }
          : {}
      ]
    },
    include: {
      portfolio: true
    }
  });
}

}
