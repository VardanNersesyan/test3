import {
  Injectable,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserProfileResponseDto,
  UserListRequestDto,
  UserListResponse,
} from './dto';
import { User } from './entities/user.entity';
import { SignOutResponseDto } from '../auth/dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserRequestDto): Promise<User> {
    const user = await this.userRepository.findByEmail(createUserDto.email);

    if (user) {
      throw new NotAcceptableException(['User already exist']);
    }

    return await this.userRepository.createUser(createUserDto);
  }

  async clearUserRefreshToken(userId: number): Promise<SignOutResponseDto> {
    const [affectedRows] =
      await this.userRepository.clearRefreshTokenById(userId);

    const isUpdated = !!affectedRows;

    if (!isUpdated) {
      throw new NotAcceptableException(['Refresh token is expired']);
    }

    return new SignOutResponseDto({
      success: isUpdated,
    });
  }

  async findAll(userListRequestDto: UserListRequestDto) {
    const list = await this.userRepository.findAll(userListRequestDto);

    return new UserListResponse(
      list.total,
      list.page,
      list.perPage,
      list.items,
    );
  }

  async findOne(id: number) {
    const user = await this.userRepository.getUserProfileById(id);

    if (!user) {
      throw new NotFoundException(['User not found']);
    }

    return new UserProfileResponseDto(user.get({ plain: true }));
  }

  async updateProfile(id: number, updateUserDto: UpdateUserRequestDto) {
    const [affectedRows] = await this.userRepository.updateProfile(
      id,
      updateUserDto,
    );

    const isUpdated = !!affectedRows;

    if (!isUpdated) {
      throw new MethodNotAllowedException(['Not allowed']);
    }

    const profile = await this.userRepository.getUserProfileById(id);
    return new UserProfileResponseDto(profile.get({ plain: true }));
  }
}
