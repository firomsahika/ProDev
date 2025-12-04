    import { IsString, IsEmail, MinLength, IsEnum, IsOptional, IsNotEmpty } from 'class-validator'
    import { UserRole } from '@prisma/client'

    export class RegisterUserDto {

        @IsString()
        @IsNotEmpty()
        fullName: string

        @IsString()
        @IsNotEmpty()
        userName: string

        @IsEmail()
        email: string

        @IsString()
        @MinLength(6, {message: "Password must be morethan 6 character"})
        password: string

        @IsEnum(UserRole)
        @IsOptional()
        role?: UserRole

    }