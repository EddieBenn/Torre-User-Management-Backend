import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, IUser, UserFilter } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UtilService } from 'src/utils/utility-service';
import { buildUserFilter } from 'src/filters/query-filter';
import { RolesEnum } from 'src/base.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    const { email, phone } = data;
    const emailExist = await this.usersRepository.exists({ where: { email } });
    if (emailExist) {
      throw new HttpException(
        `user with email: ${email} already exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const phoneNumberExist = await this.usersRepository.exists({
      where: { phone },
    });
    if (phoneNumberExist) {
      throw new HttpException(
        `user with phone number: ${phone} already exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newPassword = UtilService.generatePassword(
      data.last_name.toLowerCase(),
    );
    const hashedPassword = await UtilService.hashPassword(newPassword);
    const newUser: IUser = {
      ...data,
      role: RolesEnum.USER,
      password: hashedPassword,
    };
    const createdUser = await this.usersRepository.save(newUser);
    await UtilService.sendPasswordMail(email, newPassword);
    return createdUser;
  }

  async getAllUsers(queryParams: UserFilter) {
    const page = queryParams?.page ? Number(queryParams?.page) : 1;
    const size = queryParams?.size ? Number(queryParams.size) : 10;
    const skip = queryParams?.page ? (Number(queryParams.page) - 1) * size : 0;
    const query = await buildUserFilter(queryParams);
    const [users, count] = await this.usersRepository.findAndCount({
      where: query,
      skip,
      take: size,
      order: { created_at: 'DESC' },
    });

    const totalPages = Math.ceil(count / size);
    return {
      users,
      pagination: {
        totalRows: count,
        perPage: size,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
      },
    };
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user?.id) {
      throw new HttpException(
        `user with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async updateUserById(id: string, data: UpdateUserDto) {
    return this.usersRepository.update(id, data);
  }

  async deleteUserById(id: string) {
    return this.usersRepository.delete(id);
  }
}
