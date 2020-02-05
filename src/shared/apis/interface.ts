export interface ExchangeRateResponse {
  success: '0' | '1';
  result?: {
    rate: string;
  };
  msgid: string;
  msg: string;
}
