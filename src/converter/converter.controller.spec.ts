import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';
import { EmailService } from '../email/email.service';
import { ResponseStatus } from './models';
import config from '../config';

describe('Converter Controller', () => {
  let controller: ConverterController;
  let converterService: ConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
      ],
      controllers: [ConverterController],
      providers: [
        ConverterService,
        {
          provide: EmailService,
          useValue: {
            getList: jest.fn(),
            getRate: jest.fn()
          }
        }
      ]
    }).compile();
    controller = module.get<ConverterController>(ConverterController);
    converterService = module.get<ConverterService>(ConverterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return currencies', async () => {
    const expectedResult = { USD: 'United States Dollar' };

    jest
      .spyOn(converterService, 'getList')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await controller.getList();
    expect(result).toBe(expectedResult);
  });

  it('should return rate', async () => {
    const expectedResult = {
      base_currency_code: 'USD',
      base_currency_name: 'United States dollar',
      amount: '10.0000',
      updated_date: '2023-03-17',
      rates: {
        PLN: {
          currency_name: 'Polish złoty',
          rate: '4.4165',
          rate_for_amount: '44.1652'
        }
      },
      status: ResponseStatus.Success
    };

    jest
      .spyOn(converterService, 'getRate')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const result = await controller.getRate({ amount: 10, from: 'USD', to: 'PLN' });
    expect(result).toBe(expectedResult);
  });
});
