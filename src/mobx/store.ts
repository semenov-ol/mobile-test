import { makeAutoObservable } from 'mobx';
import { Rockets } from '../screens/TabOneScreen';

export class Store {
  data?: { rockets: Rockets[] };
  wishList: { value: string; key: number }[] = [];

  updateData = (data?: { rockets: Rockets[] }) => {
    this.data = data;
  };

  updateWishList = (item: {value: string, key: number}) => {
    this.wishList = [...this.wishList, item];
  };

  deleteFromWishList = (key: number) => {
    const removedItemIndex = this.wishList.findIndex(item => item.key === key)
    this.wishList = [...this.wishList.slice(0, removedItemIndex), ...this.wishList.slice(removedItemIndex + 1)]
  }

  constructor() {
    makeAutoObservable(this);
  }
}
