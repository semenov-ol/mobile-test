import { observable, action, makeObservable } from 'mobx';
import { Rockets } from '../screens/TabOneScreen';

export class Store {
  @observable data: { rockets: Rockets[]; } | undefined;

  @action updateData = (data: { rockets: Rockets[] } | undefined) => {
    this.data = data;
  };

 /* constructor() {
    makeObservable(this, {
      data: observable,
      updateData: action,
    });
  }*/
}
