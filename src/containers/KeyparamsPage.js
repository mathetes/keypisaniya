import React, { Component } from 'react';
import StickyTable from '../components/dashboard/StickyTable';
import globalStyles from '../styles';


class Keyparams extends Component {
    render() {
      return (
        <div>
          <h3 style={globalStyles.navigation}>Главная / Панель управления</h3>
      <StickyTable />

        </div>
      );
    }
}

export default Keyparams;
