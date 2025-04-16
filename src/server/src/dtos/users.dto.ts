import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

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
