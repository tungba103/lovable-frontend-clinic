import { User } from "./user";

export interface LoginApiRequest {
  username: string;
  password: string;
}

export interface LoginApiResponse {
  result: {
      message: string;
      statusCode: number;
      result: {
            accessToken: string;
            refreshToken: string;
            user: User;
          };
  };
}