import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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
