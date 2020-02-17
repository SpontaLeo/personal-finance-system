import BaseModel from './BaseModel';
import { TradingRecordItem } from '../../shared/interfaces/TradingRecord';

export default class TradingRecordModel extends BaseModel {
  title: string;
  category: string;
  target: string;
  content: string;
  brief: string;

  constructor(data: TradingRecordItem) {
    super(data);
    this.title = data.title;
    this.category = data.category;
    this.target = data.target;
    this.content = data.content;
    this.brief = data.brief;
  }
}
