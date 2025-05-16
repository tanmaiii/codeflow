import { IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public name: string;

  @IsString()
  @Length(36)
  public topicId: string;
}


export class AddMemberToGroupDto {
  @IsString()
  @Length(36)
  public userId: string;
}


