import { UserRole } from '@prisma/client';

export class UserResponseDto {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  website?: string;
  role: UserRole;
  isAvailableForHire: boolean;
  createdAt: Date;
  updatedAt: Date;

  // ✅ Relations (all visible, as you requested)
  portfolio?: any;
  projects?: any[];
  portfolioLikes?: any[];
  projectLikes?: any[];
  projectComments?: any[];
  jobs?: any[];
  sentMessages?: any[];
  notifications?: any[];
  conversations?: any[];
  followers?: any[];
  following?: any[];
}
