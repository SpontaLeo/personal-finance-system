import { observable } from 'mobx';

export default class HomeStore {
  @observable
  data = [
    { genre: 'Sports', sold: 275, income: 2300 },
    { genre: 'Strategy', sold: 115, income: 667 },
    { genre: 'Action', sold: 120, income: 982 },
    { genre: 'Shooter', sold: 350, income: 5271 },
    { genre: 'Other', sold: 150, income: 3710 },
  ];
  
  @observable
  cols = {
    sold: { alias: '销售量' },
    genre: { alias: '游戏种类' },
  };
}