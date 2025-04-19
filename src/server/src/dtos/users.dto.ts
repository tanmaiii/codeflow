import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Request } from 'express';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(32)
  public username: string;

  @IsString()
  @MaxLength(255)
  public avatar: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(32)
  public username: string;

  @IsString()
  @MaxLength(255)
  public avatar: string;
}

export class CreateUserGithubDto {
  @IsString()
  @IsNotEmpty()
  public uid: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public accessToken: string;
}


export class CreateUserGithub{
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  avatar_url: string;
}
