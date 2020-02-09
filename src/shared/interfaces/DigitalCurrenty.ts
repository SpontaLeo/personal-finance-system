import { AccountName } from '../constants/digital-currency/index';
import { AccountType } from '../constants/digital-currency';
import { CommmonField } from './common';

// 美元单位
export interface DigitalCurrentyAccountItem extends CommmonField {
  accountName: AccountName;
  accountType: AccountType;
  amount: number;
}
