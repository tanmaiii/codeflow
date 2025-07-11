import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { GetAllQueryDto } from './common.dto';

export class CreateCourseDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public startDate: Date;

  @IsString()
  public endDate: Date;

  @IsString()
  public regStartDate: Date;

  @IsString()
  public regEndDate: Date;

  @IsString()
  public topicDeadline: Date;

  @IsOptional()
  @IsArray()
  public tags?: Array<string> | null;

  @IsOptional()
  @IsString()
  public type: string;

  @IsOptional()
  @IsNumber()
  public maxGroupMembers: number;

  @IsOptional()
  @IsArray()
  public documents?: Array<string> | null;

  @IsOptional()
  @IsString()
  public password?: string | null;
}

export class JoinCourseDto {
  @IsString()
  public password: string;
}

export class GetAllCoursesDto extends GetAllQueryDto {
  @IsOptional()
  @IsBoolean()
  public registered?: boolean;

  @IsOptional()
  @IsString()
  public type?: string;
}
