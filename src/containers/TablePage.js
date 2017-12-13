import React, { Component } from 'react';
import {
  Grid, TableView, TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

class RTable extends Component {

  render() {

    return (
      <Grid
    rows={[
      { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
      { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
    ]}
    columns={[
      { name: 'id', title: 'ID' },
      { name: 'product', title: 'Product' },
      { name: 'owner', title: 'Owner' },
    ]}>
    <TableView />
    <TableHeaderRow />
  </Grid>
    );
  }
}

export default RTable;
