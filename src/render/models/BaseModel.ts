import { CommmonField } from '../../shared/interfaces/common';
import moment from 'moment';
import { observable } from 'mobx';

export default abstract class BaseModel {
  id: string;
  createdAt: string;
  @observable
  updatedAt: string;

  constructor(data: CommmonField) {
    this.id = data.id || '';
    this.createdAt = data.createdAt || moment().toString();
    this.updatedAt = data.updatedAt || moment().toString();
  }
}
