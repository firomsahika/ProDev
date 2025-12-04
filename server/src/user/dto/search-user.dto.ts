import { IsOptional, IsString } from "class-validator";

export class SearchUserDto {
  @IsOptional()
  @IsString()
  query?: string;   // username or fullname

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  skill?: string;   // search inside portfolio.skills
}