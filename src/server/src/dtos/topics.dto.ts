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
}

//   export interface TopicCreate {
//     title: string;
//     description: string;
//     courseId: string;
//     teacherId: string;
//     authorId: string;
//     isCustom: boolean;
//     status: string;
//     tags?: Array<string>;
//   }
