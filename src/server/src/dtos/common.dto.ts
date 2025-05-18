import { IsInt, IsOptional, IsPositive, IsIn, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsString()
  sortBy: string = 'created_at';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC';

  @IsOptional()
  @IsString()
  search?: string;
  
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isCustom?: boolean;
}
