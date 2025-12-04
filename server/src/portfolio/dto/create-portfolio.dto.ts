import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsInt,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreatePortfolioDto {
  @IsUUID()
  userId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  college?: string;

  @IsOptional()
  @IsInt()
  graduationYear?: number;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsOptional()
  @IsUrl()
  resumeUrl?: string;

  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  coverImageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @IsInt()
  rank?: number;
}
