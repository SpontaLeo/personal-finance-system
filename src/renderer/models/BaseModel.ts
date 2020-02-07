import { CommmonField } from '../../shared/interfaces/common';
import { observable } from 'mobx';

export default abstract class BaseModel {
  id: string;
  createdAt: string;
  @observable
  updatedAt: string;

  constructor(data: CommmonField) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
