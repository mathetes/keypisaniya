import React, { Component } from 'react';
import * as Table from 'reactabular-table';
import { cloneDeep } from 'lodash';
import VisibilityToggles from 'react-visibility-toggles';


class Toggling extends Component {
  constructor(props) {
      super(props);

      this.state = {
        columns: [
          {
            property: 'theme',
            header: {
              label: 'Тема'
            },
            visible: true
          },
          {
            property: 'book',
            header: {
              label: 'Книга'
            },
            visible: true
          },
          {
            property: 'keyverse',
            header: {
              label: 'Кл.стих'
            },
            visible: true
          },
          {
            property: 'color',
            header: {
              label: 'Color'
            },
            cell: {
              transforms: [color => ({ style: { color } })]
            },
            visible: false
          }
        ],
        rows: [
          {
            id: 100,
            book: 'Бытие',
            theme: 'Начало всего',
            keyverse: 12,
            color: '#f754e1'
          },
          {
            id: 101,
            book: 'Исход',
            theme: 'Искупление',
            keyverse: 44,
            color: 'green'
          },
          {
            id: 102,
            book: 'Левит',
            theme: 'Святость',
            keyverse: 25,
            color: 'blue'
          }
        ]
      };

      this.onToggleColumn = this.onToggleColumn.bind(this);
    }
    render() {
      const { columns, rows } = this.state;

      return (
        <div>
          <VisibilityToggles
            columns={columns}
            onToggleColumn={this.onToggleColumn}
          />

          <Table.Provider
            columns={columns.filter(column => column.visible)}
          >
            <Table.Header />

            <Table.Body rows={rows} rowKey="id" />
          </Table.Provider>
        </div>
      );
    }
    onToggleColumn({ columnIndex }) {
      const columns = cloneDeep(this.state.columns);

      columns[columnIndex].visible = !columns[columnIndex].visible;

      this.setState({ columns });
    }
  }

export default Toggling;
