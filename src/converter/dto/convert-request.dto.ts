import { IsPositive, IsString, IsNotEmpty, IsEmail, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConvertRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiPropertyOptional()
  @ValidateIf(o => typeof o.email === 'string')
  @IsEmail()
  email?: string;
}
