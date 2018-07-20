export class Overview {
  heading = 'Farming Cycle';
  farmingCycles = [
    {
      slug: 'planning',
      title: 'Planning',
      image: '../static/planning.png',
      notifications: '1'
    },
    {
      slug: 'preparing',
      title: 'Preparing',
      image: '../static/preparing.png',
      notifications: ''
    },
    {
      slug: 'seeds',
      title: 'Seeds',
      image: '../static/seeds.png',
      notifications: '4'
    },
    {
      slug: 'planting',
      title: 'Planting',
      image: '../static/planting.png',
      notifications: '4'
    },
    {
      slug: 'growing',
      title: 'Growing',
      image: '../static/growing.png',
      notifications: ''
    },
    {
      slug: 'harvesting',
      title: 'Harvesting',
      image: '../static/harvesting.png',
      notifications: '2'
    },
    {
      slug: 'transporting',
      title: 'Transporting',
      image: '../static/transporting.png',
      notifications: '9'
    },
    {
      slug: 'processing',
      title: 'Processing',
      image: '../static/mill.png',
      notifications: '2'
    },
    {
      slug: 'storing',
      title: 'Storing',
      image: '../static/storage.png',
      notifications: '1'
    },
    {
      slug: 'selling',
      title: 'Selling',
      image: '../static/market.png',
      notifications: '2'
    }
  ];

  constructor() {
  }

}
