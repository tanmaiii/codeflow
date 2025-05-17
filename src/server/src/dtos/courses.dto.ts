import { IsArray, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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

  @IsNumber()
  public maxGroupMembers: number;
}
