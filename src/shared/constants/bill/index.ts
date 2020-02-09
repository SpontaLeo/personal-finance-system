export type AssetAccount =
  | 'alipay' // 支付宝
  | 'wechat wallet' // 微信钱包
  | 'deposit card' // 储蓄卡
  | 'cash' // 现金
  | 'fund' // 基金
  | 'stock' // 股票
  | 'provident fund' // 公积金
  | 'DIGICCY' // 数字货币
  | 'other';

export type LiabilityAccount =
  | 'credit card' // 信用卡
  | 'debt' // 负债
  | 'other';

export type IncomeType =
  | 'salary' // 工资
  | 'redpack' // 红包
  | 'bonus' // 奖金
  | 'borrow' // 借入
  | 'other';

export type ExpenseType =
  | 'food' // 餐饮
  | 'shopping' // 购物
  | 'dwell' // 居住
  | 'traffic' // 交通
  | 'loan' // 借出
  | 'medical treatment' // 医疗
  | 'education' // 教育
  | 'favour' // 人情
  | 'entertainment' // 娱乐
  | 'other';
