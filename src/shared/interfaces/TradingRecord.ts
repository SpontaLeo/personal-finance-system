import { CommmonField } from './common';

export interface TradingRecordItem extends CommmonField {
  title: string;
  tags: string[];
  content: string;
}
