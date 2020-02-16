import DigitalCurrencyService from './DigitalCurrencyService';
import ExchangeRateService from './ExchangRateService';
import FundService from './FundService';
import LiabilitiesService from './LiabilitiesService';
import TradingRecordService from './TradingRecordService';

export const digitalCurrencyService = new DigitalCurrencyService();
export const fundService = new FundService();
export const liabilitiesService = new LiabilitiesService();
export const exchangeRateService = new ExchangeRateService();
export const tradingRecordService = new TradingRecordService();
