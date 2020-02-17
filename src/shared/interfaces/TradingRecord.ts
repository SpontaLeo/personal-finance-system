import { CommmonField } from './common';

export interface TradingRecordItem extends CommmonField {
  title: string;
  // 市场类型
  category: string;
  // 标的物
  target: string;
  content: string;
  // 根据content生成的摘要
  brief: string;
}
