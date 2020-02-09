import { AssetAccount, LiabilityAccount } from '../constants/bill/index';

import { CommmonField } from './common';

export interface BillItem extends CommmonField {
  // 金额
  amount: number;
}

export interface IncomeBillItem extends BillItem {
  account: AssetAccount;
}

export interface ExpenseBillItem extends BillItem {
  account: LiabilityAccount;
}

export interface TransferBillItem extends BillItem {
  from: AssetAccount;
  to: AssetAccount;
}
