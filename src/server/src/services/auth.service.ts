import { ENUM_USER_ROLE, ENUM_USER_STATUS } from '@/data/enum';
import { HttpException } from '@/exceptions/HttpException';
import { SECRET_KEY } from '@config';
import { DB } from '@database';
import { CreateUserDto, CreateUserGithub, LoginUserDto } from '@dtos/users.dto';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';

export const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { user: user };
  const expiresIn: number = 60 * 60 * 24;

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

  public async loginWithGithub({
    userBody,
    email,
    uid,
  }: {
    userBody: CreateUserGithub;
    email: string;
    uid: string;
  }): Promise<{ tokenData: TokenData; findUser: User }> {
    const findUser: User = await DB.Users.findOne({ where: { email } });
    if (findUser) {
      const tokenData = createToken(findUser);
      // const cookie = createCookie(tokenData);

      return { tokenData, findUser };
    }

    const createUserData: User = await DB.Users.create({
      email: email,
      password: null,
      name: userBody.name,
      username: userBody.login,
      uid: uid,
      role: ENUM_USER_ROLE.USER,
      status: ENUM_USER_STATUS.ACTIVE,
      avatar: userBody.avatar_url,
    });

    const tokenData = createToken(createUserData);
    // const cookie = createCookie(tokenData);

    return { tokenData, findUser: createUserData };
  }

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);

    const newUser: User = {
      ...userData,
      password: hashedPassword,
      username: new Date().getTime().toString(),
    };

    const createUserData: User = await DB.Users.create(newUser);

    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{ tokenData: TokenData; findUser: User }> {
    const findUser: User = await DB.Users.scope('withPassword').findOne({
      where: { email: userData.email },
    });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);
    if (findUser.uid)
      throw new HttpException(
        409,
        `The account ${userData.email} is linked to Github. Please login with Github`,
      );

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const tokenData = createToken(findUser);
    // const cookie = createCookie(tokenData);

    return { tokenData, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { id: userData.id } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}
