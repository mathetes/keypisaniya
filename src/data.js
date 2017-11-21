import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import {cyan600, pink600, purple600} from 'material-ui/styles/colors';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const data = {
  menus: [
    { text: 'Главная', icon: <Assessment/>, link: '/dashboard' },
    { text: 'Таблица', icon: <Assessment/>, link: '/evo' },
    { text: 'Авторизация  ', icon: <PermIdentity/>, link: '/login' }
  ],
  dashBoardPage: {
    browserUsage: [
      {name: 'Chrome', value: 800, color: cyan600, icon: <ExpandMore/>},
      {name: 'Firefox', value: 300, color: pink600, icon: <ChevronRight/>},
      {name: 'Safari', value: 300, color: purple600, icon: <ExpandLess/>}
    ]
  }
};

export default data;
