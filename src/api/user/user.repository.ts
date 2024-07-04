import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserListRequestDto,
} from './dto';
import { Op } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types/model';
import { WorkField } from '../work-field/entities/work-field.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(userData: CreateUserRequestDto): Promise<User> {
    return this.userModel.create(userData);
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async clearRefreshTokenById(id: number): Promise<[affectedCount: number]> {
    return this.userModel.update(
      {
        refreshToken: null,
      },
      {
        where: {
          id,
          refreshToken: {
            [Op.ne]: null,
          },
        },
      },
    );
  }

  async getUserProfileById(id: number) {
    return await this.userModel.findOne({
      where: { id },
      include: [{ model: WorkField, required: false }],
    });
  }

  async updateProfile(
    id: number,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<[affectedCount: number]> {
    return this.userModel.update(updateUserDto, {
      where: {
        id,
      },
    });
  }

  async findAll(userListRequestDto: UserListRequestDto) {
    const { name, surname, type, page = 1, limit = 10 } = userListRequestDto;

    const searchParams: FindOptions = {};

    if (name) {
      searchParams.where = {
        ...searchParams.where,
        name: { [Op.iLike]: `%${name}%` },
      };
    }

    if (surname) {
      searchParams.where = {
        ...searchParams.where,
        surname: { [Op.iLike]: `%${surname}%` },
      };
    }

    if (type) {
      searchParams.where = {
        ...searchParams.where,
        type,
      };
    }

    const users = await this.userModel.findAndCountAll({
      where: searchParams.where,
      include: [{ model: WorkField, required: false }],
      limit,
      offset: (page - 1) * limit,
      order: [['id', 'DESC']],
    });

    return {
      total: users.count,
      page,
      perPage: limit,
      items: users.rows,
    };
  }
}
