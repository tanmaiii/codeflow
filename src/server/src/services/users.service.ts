import { HttpException } from '@exceptions/HttpException';
import { DB } from '@database';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { Op } from 'sequelize';
@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await DB.Users.findAll();
    return allUser;
  }

  public async findAllUserWithPagination(
    page: number,
    limit: number,
    sortBy: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<{ rows: User[]; count: number }> {
    const whereCondition = search
      ? {
          [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { email: { [Op.like]: `%${search}%` } }, { username: { [Op.like]: `%${search}%` } }],
        }
      : {};

    const { count, rows }: { count: number; rows: User[] } = await DB.Users.findAndCountAll({
      where: whereCondition,
      offset: (page - 1) * limit,
      limit: limit,
      order: [[sortBy, order]],
      distinct: true,
      col: 'users.id',
    });

    return { rows, count };
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await DB.Users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async findUserByUsername(username: string): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { username } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await DB.Users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    const findUser: User = await DB.Users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    await DB.Users.update({ ...userData }, { where: { id: userId } });

    const updateUser: User = await DB.Users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: string): Promise<User> {
    const findUser: User = await DB.Users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await DB.Users.destroy({ where: { id: userId } });

    return findUser;
  }

  public async destroyUser(userId: string): Promise<User> {
    const findUser: User = await DB.Users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await DB.Users.destroy({ where: { id: userId }, force: true });

    return findUser;
  }
}
