import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Currencies, CurrencyListResponse, CurrencyRateResponse, ResponseStatus } from './models';
import { ConvertRequestDto } from './dto/convert-request.dto';

@Injectable()
export class ConverterService {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>('RAPIDAPI_URL');
    this.headers = this.configService.get<Record<string, string>>('rapidApiReqHeaders');
  }
  async getList(): Promise<Currencies | null> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<CurrencyListResponse>(`${this.baseUrl}/list`, { headers: this.headers })
      );
      return data.status === ResponseStatus.Success ? data.currencies : null;
    } catch (error) {
      throw new InternalServerErrorException('An error occur while fetching currency list', { cause: error });
    }
  }

  async getRate(params: Omit<ConvertRequestDto, 'email'>): Promise<CurrencyRateResponse | null> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<CurrencyRateResponse>(`${this.baseUrl}/convert`, { headers: this.headers, params })
      );

      return data.status === ResponseStatus.Success ? data : null;
    } catch (error) {
      throw new InternalServerErrorException('Conversion error', { cause: error });
    }
  }
}
