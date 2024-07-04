import { Request } from '@nestjs/common';

export interface RequestUserData {
  email: string;
  id: number;
}

export interface RequestWithUser extends Request {
  user?: RequestUserData;
}
