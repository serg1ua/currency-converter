export enum ResponseStatus {
  Success = 'success',
  Fail = 'fail'
}

export type Currencies = {
  [key: string]: string;
};

export type CurrencyListResponse = {
  currencies: Currencies;
  status: ResponseStatus;
};
