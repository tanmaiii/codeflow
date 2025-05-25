import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public message: string;

  @IsString()
  @IsOptional()
  public type?: string;

  @IsString()
  @IsOptional()
  public link?: string;
}

export class UpdateNotificationDto {
  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public message?: string;

  @IsString()
  @IsOptional()
  public type?: string;

  @IsString()
  @IsOptional()
  public link?: string;
} 