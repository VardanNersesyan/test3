import { UserProfileResponseDto } from './user-profile.response.dto';
import { User } from '../entities/user.entity';

export class UserListResponse {
  total: number;
  page: number;
  perPage: number;
  items: UserProfileResponseDto[];

  constructor(total: number, page: number, perPage: number, items: User[]) {
    this.total = total;
    this.page = page;
    this.perPage = perPage;
    this.items = items.map(
      (item) => new UserProfileResponseDto(item.get({ plain: true })),
    );
  }
}
