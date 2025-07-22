import { IsOptional, IsString, IsIn } from 'class-validator';

export class CodeAnalysisTimeframeQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(['7d', '30d', '3m', '6m', '1y'])
  public timeframe?: string = '7d';
} 