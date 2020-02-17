import { KtItem } from './interface';
export const AssetAccountList: KtItem[] = [
  {
    key: 'cash',
    title: '现金',
  },
  {
    key: 'debitCard',
    title: '储蓄卡',
  },
  {
    key: 'fund',
    title: '基金',
  },
  {
    key: 'lend',
    title: '借出',
  },
  {
    key: 'alipay',
    title: '支付宝',
  },
  {
    key: 'wechatPay',
    title: '微信支付',
  },
  {
    key: 'digitalCurrency',
    title: '数字货币',
  },
  {
    key: 'housingFund',
    title: '住房公积金',
  },
  {
    key: 'otherAsset',
    title: '其它',
  },
];

export const LiabilityAccountList: KtItem[] = [
  {
    key: 'creditCard',
    title: '信用卡',
  },
  {
    key: 'borrow',
    title: '借入',
  },
  {
    key: 'antCheckLater',
    title: '花呗',
  },
  {
    key: 'otherLiability',
    title: '其它',
  },
];
