import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, Req, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthModuleService } from './auth-module.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('/api/auth')
export class AuthModuleController {
  constructor(private readonly authModuleService: AuthModuleService) {}

  @Post('signup')
  async register(@Body() signUpDto: RegisterUserDto){
    try {
      const user = await this.authModuleService.register(signUpDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: "User Created Successfully!",
        data:user
      }
    } catch (error) {
       console.error("Signup error:", error); 
    // P2002 is the Prisma unique constraint violation code
          if (error.code === 'P2002') {
            // NestJS will automatically send 409 Conflict if you throw a HttpException
            throw new ConflictException("User with this email or username already exists"); 
          }
          // For any other unexpected error, let it fall through or throw a 500
          throw new InternalServerErrorException("An unexpected error occurred during registration.");
        }
    }


    @Post("login")
    async login(@Body() loginDto: LoginDto){
      try {
        const user  = await this.authModuleService.login(loginDto);

        return {
          statusCode: HttpStatus.OK,
          message:"User logged in succesfully!",
          data:user,
        }
      } catch (error) {
         if (error instanceof UnauthorizedException) {
            return {
                statusCode: HttpStatus.UNAUTHORIZED, // 401
                message: error.message // This will be "Password not matches" or "Invalid credentials"
            }
        }
        
        // 2. Handle ConflictException (If used, e.g., in signup for P2002, though not needed in login)
        if (error instanceof ConflictException) {
            return {
                statusCode: HttpStatus.CONFLICT, // 409
                message: error.message
            }
        }
        
        // 3. Handle Prisma errors (P2002 should ideally be caught in the service)
        if(error.code === 'P2002'){
            return {
                statusCode: HttpStatus.CONFLICT,
                message: "User with this email already exists"
            }
        }
        
        // 4. Default to Internal Server Error (500) for all other exceptions
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal server error"
        }
      }
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async me(@Req() req){
      try{
        const userId = req.user?.sub ?? req.user?.id ?? req.user;
        const user = await this.authModuleService.me(userId);
        return {
          statusCode: HttpStatus.OK,
          message: 'User profile fetched successfully!',
          data: user,
        }
      }catch(error){
        if (error.status === 401 || error instanceof Error && error.name === 'UnauthorizedException'){
          return {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized',
          }
        }
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error'
        }
      }
    }



    
}


