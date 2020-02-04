import DigitalCurrency from '../pages/home/digital-currency/DigitalCurrency';
import Fund from '../pages/home/fund/Fund';
import Liabilities from '../pages/home/liabilities/Liabilities';
import Liability from '../pages/home/liabilities/liability/Liability';
import PersonalBill from '../pages/home/personal-bill/PersonalBill';

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
    key: 'currency',
    to: '/digital-currency',
    title: '数字货币',
    iconType: 'icon-digital-currency',
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
    key: 'bill',
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
];

export const ChildRoute: RouteItem[] = [
  {
    key: 'liability',
    parentKey: 'liabilities',
    to: '/liabilities/detail',
    component: Liability,
  },
];
