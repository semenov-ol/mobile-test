import { observable, action, makeObservable } from 'mobx';

export class Store {
  text = '';

  updateText = (text: string) => {
    this.text = text;
  };

  constructor() {
    makeObservable(this, {
      text: observable,
      updateText: action,
    });
  }
}
