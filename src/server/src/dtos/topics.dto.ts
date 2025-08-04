import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { GetAllQueryDto } from './common.dto';
import { Type } from 'class-transformer';

export class CreateTopicDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  public description: string;

  @IsString()
  @IsNotEmpty()
  public courseId: string;

  @IsOptional()
  @IsString()
  public teacherId: string;

  @IsBoolean()
  @IsNotEmpty()
  public isCustom: boolean;

  @IsOptional()
  @IsArray()
  public tags?: Array<string> | null;

  @IsOptional()
  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public groupName: string;

  @IsOptional()
  @IsArray()
  public members?: Array<string> | null;
}

export class UpdateTopicDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public title: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  public description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public courseId: string;

  @IsOptional()
  @IsString()
  public teacherId: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  public isCustom: boolean;

  @IsOptional()
  @IsArray()
  public tags?: Array<string> | null;

  @IsOptional()
  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public groupName: string;

  @IsOptional()
  @IsArray()
  public members?: Array<string> | null;
}

export class CreateTopicEvaluationDto {
  @IsString()
  @IsNotEmpty()
  public evaluation: string;
  public topicId: string;
}

export class GetTopicAllDto extends GetAllQueryDto {
  @IsOptional()
  @IsString()
  public status: string;
    
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isCustom?: boolean;
}
