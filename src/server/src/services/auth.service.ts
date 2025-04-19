import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { DB } from '@database';
import { CreateUserDto, CreateUserGithub, CreateUserGithubDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User, UserGithub } from '@interfaces/users.interface';
import { logger } from '@/utils/logger';

export const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

export const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async createToken(user: User): Promise<TokenData> {
    return createToken(user);
  }

  public async createCookie(tokenData: TokenData): Promise<string> {
    return createCookie(tokenData);
  }

  public async loginWithGithub({ userBody, email }: { userBody: CreateUserGithub; email: string }): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await DB.Users.findOne({ where: { email } });
    if (findUser) {
      const tokenData = createToken(findUser);
      const cookie = createCookie(tokenData);
      return { cookie, findUser };
    }

    const hashedPassword = await hash(userBody.id.toString(), 10);
    const createUserData: User = await DB.Users.create({
      email: email,
      password: await hashedPassword,
      name: userBody.name,
      username: userBody.login,
      role: 'user',
      status: 'active',
      avatar: userBody.avatar_url,
    });

    const tokenData = createToken(createUserData);
    const cookie = createCookie(tokenData);

    return { cookie: cookie, findUser: createUserData };
  }

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await DB.Users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}
