import React, { Component } from 'react';
import * as Table from 'reactabular-table';
import { cloneDeep } from 'lodash';
import VisibilityToggles from 'react-visibility-toggles';
import * as search from 'searchtabular';

class Mix4 extends Component {
  constructor(props) {
      super(props);

      this.state = {
        searchColumn: 'all',
        query: {}, // Search query
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
      const components = {
        header: {
          cell: FixedWidthHeader
        }
      };
      const { searchColumn, rows, columns, query } = this.state;
      const searchedRows = search.multipleColumns({ columns, query })(rows);

      return (
        <div>
          <div className="search-container">
            <span>Search</span>
            <search.Field
              column={searchColumn}
              query={query}
              columns={columns}
              rows={rows}
              onColumnChange={searchColumn => this.setState({ searchColumn })}
              onChange={query => this.setState({ query })}
            />
          </div>
          <VisibilityToggles
            columns={columns}
            onToggleColumn={this.onToggleColumn}
          />

          <Table.Provider
            components={components}
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

  class FixedWidthHeader extends React.Component {
    constructor(props) {
      super(props);

      this.widthSet = false;
      this.state = {
        style: {}
      };
    }
    componentDidUpdate() {
      if (this.widthSet) {
        return;
      }

      const width = this.refs.header.clientWidth;

      // Wait till width is available and set then
      if (width) {
        this.widthSet = true;

        this.setState({ // eslint-disable-line react/no-did-update-set-state
          style: { width }
        });
      }
    }
    render() {
      return (
        <th style={this.state.style} ref="header">{this.props.children}</th>
      );
    }
  }

export default Mix4;
