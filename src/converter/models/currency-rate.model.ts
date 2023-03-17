import { ResponseStatus } from './currency.model';

type Rate = {
  currency_name: string;
  rate: string;
  rate_for_amount: string;
};

export type CurrencyRateResponse = {
  status: ResponseStatus;
  amount: string;
  base_currency_code: string;
  base_currency_name: string;
  rates: {
    [key: string]: Rate;
  };
  updated_date: string;
};
