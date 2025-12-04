import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthModuleService {

  // inject prisma service dependency
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private toResponse(user:any): UserResponseDto{
    const {password, ...safeData} = user;
    return safeData;
  }

  // Inside AuthModuleService

async register(registerDto: RegisterUserDto): Promise<UserResponseDto> {
  try {
    // Check for email existence first (good logic)
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email }
    });

    if (existingUser) {
      throw new ConflictException(`Email ${registerDto.email} already exists!`);
    }
    
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        username: registerDto.userName,
        fullName: registerDto.fullName,
        password: hashedPassword,
        role: registerDto.role,
      },
      include:{
        portfolio:true,
        projects:true,
        portfolioLikes:true,
        projectLikes:true,
        projectComments:true,
        jobs:true,
        sentMessages:true,
        notifications:true,
        conversations:true,
        followers:true,
        following:true,
      }
    });

    return this.toResponse(newUser);

  } catch (error) {
    // 1. Re-throw the ConflictException for email check
    if (error instanceof ConflictException) {
      throw error;
    }

    // 2. Check for Prisma Unique Constraint Violation (P2002)
    // This catches unique violations on fields like 'username' (or 'email' if you removed the manual check)
    if (error.code === 'P2002') {
      const target = error.meta?.target || 'unknown field';
      throw new ConflictException(`The ${target} is already taken.`);
    }

    // 3. For any other unexpected error
    console.error("Prisma/Service Error during Registration:", error); // Log the underlying error
    throw new InternalServerErrorException('Failed to create user.');
  }
}

 
  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: UserResponseDto }>{
    try {
      const existingUser = await this.prisma.user.findUnique({
        where:{email:loginDto.email},
        include:{
          portfolio:true,
          projects:true,
          portfolioLikes:true,
          projectLikes:true,
          projectComments:true,
          jobs:true,
          sentMessages:true,
          notifications:true,
          conversations:true,
          followers:true,
          following:true,
        }
      });

      if(!existingUser){
        throw new ConflictException(`Email ${loginDto.email} does not exist! register it`)
      }

      const passwordMatch = await bcrypt.compare(loginDto.password, existingUser.password);

      if(!passwordMatch){
        throw new ConflictException("Password doesnot match!")
      };

      const payload = {
        sub: existingUser.id,
        email:existingUser.email,
        role: existingUser.role
      }

      const token  = await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn:'1h'
      });

      console.log("User", payload);

      return {accessToken:token, user:this.toResponse(existingUser)}

    
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Login failed.');
    }
  }

  async me(userId: string): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({ 
        where: { id: userId },
        include: {
         portfolio: {
            include: {
             portfolioProjects: true,
        },
      },
      projects: true,
      followers: true,
      following: true,
      notifications: true,
    },
      
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.toResponse(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Failed to retrieve user profile.');
    }
  }

  logOut(){}

  async forgotPassword(email: string): Promise<{ resetToken: string }>{
    try{
      const user = await this.prisma.user.findUnique({ where: { email } });

      if(!user){
        throw new ConflictException(`Email ${email} does not exist.`);
      }

      const payload = { sub: user.id, type: 'reset' };

      const resetToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      });

      // TODO: send `resetToken` to user's email via mailer service
      return { resetToken };
    }catch(error){
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Failed to generate reset token.');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<UserResponseDto>{
    try{
      let payload: any;
      try{
        payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      }catch(err){
        throw new UnauthorizedException('Invalid or expired reset token');
      }

      if(!payload || payload.type !== 'reset' || !payload.sub){
        throw new UnauthorizedException('Invalid reset token');
      }

      const userId = payload.sub as string;
      const user = await this.prisma.user.findUnique({ where: { id: userId } });

      if(!user){
        throw new UnauthorizedException('User not found');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await this.prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });

      return this.toResponse(updatedUser);
    }catch(error){
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Failed to reset password.');
    }
  }

}
