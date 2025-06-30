import { UserProfileData } from './userProfile';

export interface RegisterUserData extends UserProfileData {
  password: string;
}
