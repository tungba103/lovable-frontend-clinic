import { User } from "../auth";

export interface LoginApiResponse {
  result: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  message: string;
  status: string;
}