// In your types/userProfile.ts

export interface UserProfileData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
}

export interface UserProfileCreateInput extends UserProfileData {
  authUserId: string;
}
