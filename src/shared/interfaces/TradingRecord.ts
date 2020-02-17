import { CommmonField } from './common';

export interface TradingRecordItem extends CommmonField {
  title: string;
  tags: string[];
  content: string;
  // 根据content生成的摘要
  brief: string;
}
