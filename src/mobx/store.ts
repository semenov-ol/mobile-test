import { observable, action, makeObservable } from 'mobx';

export class Store {
  data = {};

  updateData = (data: {rockets: []}) => {
    this.data = data
  };

  constructor() {
    makeObservable(this, {
      data: observable,
      updateData: action,
    });
  }
}
