import { ENUM_LANGUAGE } from '@/data/enum';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRepoDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public name: string;

  @IsString()
  @MinLength(1)
  public topicId: string;

  @IsString()
  @MinLength(1)
  public language: ENUM_LANGUAGE;
}

export class UpdateRepoDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public name: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  public topicId: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  public language: ENUM_LANGUAGE;
}
