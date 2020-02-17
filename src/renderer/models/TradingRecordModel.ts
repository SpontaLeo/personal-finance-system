import BaseModel from './BaseModel';
import { TradingRecordItem } from '../../shared/interfaces/TradingRecord';
export default class TradingRecordModel extends BaseModel {
  title: string;
  tags: string[];
  content: string;
  brief: string;

  constructor(data: TradingRecordItem) {
    super(data);
    this.title = data.title;
    this.tags = data.tags;
    this.content = data.content;
    this.brief = data.brief;
  }
}
