import AssetsCurve from '../../pages/home/digital-currency/assets-curve/AssetsCurve';
import Bill from '../../pages/home/personal-bill/bill/Bill';
import DigitalCurrency from '../../pages/home/digital-currency/DigitalCurrency';
import Fund from '../../pages/home/fund/Fund';
import Liabilities from '../../pages/home/liabilities/Liabilities';
import PersonalBill from '../../pages/home/personal-bill/PersonalBill';
import TradingRecord from '../../pages/home/trading-record/TradingRecord';

interface RouteItem {
  key: string;
  parentKey?: string;
  to: string;
  title?: string;
  iconType?: string;
  component: any;
}

export const HomeMenu: RouteItem[] = [
  {
    key: 'digital-currency',
    to: '/digital-currency',
    title: '数字货币',
    iconType: 'icon-btc',
    component: DigitalCurrency,
  },
  {
    key: 'fund',
    to: '/fund',
    title: '基金定投',
    iconType: 'icon-fund',
    component: Fund,
  },
  {
    key: 'personal-bill',
    to: '/personal-bill',
    title: '个人账单',
    iconType: 'icon-bill',
    component: PersonalBill,
  },
  {
    key: 'liabilities',
    to: '/liabilities',
    title: '资产负债',
    iconType: 'icon-liabilities',
    component: Liabilities,
  },
  {
    key: 'trading-record',
    to: '/trading-record',
    title: '交易记录',
    iconType: 'icon-trading',
    component: TradingRecord,
  },
];

export const ChildRoute: RouteItem[] = [
  {
    key: 'assets-curve',
    parentKey: 'digital-currency',
    to: '/digital-currency/assets-curve',
    component: AssetsCurve,
  },
  {
    key: 'bill',
    parentKey: 'personal-bill',
    to: '/personal-bill/detail',
    component: Bill,
  },
];
