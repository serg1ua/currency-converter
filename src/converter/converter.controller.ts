import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from '../email/email.service';
import { ConverterService } from './converter.service';
import { Currencies, CurrencyRateResponse } from './models';
import { ConvertRequestDto } from './dto/convert-request.dto';

@ApiTags('Currency-converter')
@Controller('currency')
export class ConverterController {
  constructor(
    private readonly converter: ConverterService,
    private readonly emailService: EmailService,
  ) {}

  @Get('list')
  async getList(): Promise<Currencies | null> {
    return this.converter.getList();
  }

  @Post('convert')
  async getRate(@Body() dto: ConvertRequestDto): Promise<CurrencyRateResponse | null> {
    const { email, ...convertInfo } = dto;
    const data = await this.converter.getRate(convertInfo);

    if (email) {
      this.emailService.sendEmail(email, JSON.stringify(data));
    }
    return data;
  }
}
