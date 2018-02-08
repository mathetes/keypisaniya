import React from 'react';
import * as Table from 'reactabular-table';
import * as Sticky from 'reactabular-sticky';
import * as resizable from 'reactabular-resizable';
import uuid from 'uuid';
import { cloneDeep } from 'lodash';
import VisibilityToggles from 'react-visibility-toggles';
import * as search from 'searchtabular';
import { generateRows } from './helpers';
import * as resolve from 'table-resolver';



class Mixed extends React.Component {
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
  componentWillMount() {
    this.resizableHelper = resizable.helper({
      globalId: uuid.v4(),
      getId: ({ property}) => property
    });

    // Patch the column definition with class names.
    this.setState({
      columns: this.resizableHelper.initialize(this.state.columns)
    });
  }
  componentWillUnmount() {
    this.resizableHelper.cleanup();
  }
  getColumns() {
    const resizableFormatter = resizable.column({
      onDragStart: (width, { column }) => {
        console.log('drag start', width, column);
      },
      onDrag: (width, { column }) => {
        this.resizableHelper.update({
          column,
          width
        });
      },
      onDragEnd: (width, { column }) => {
        console.log('drag end', width, column);
      }
    });

    return [
      {
        property: 'theme`',
        header: {
          label: '`Тема`',
          formatters: [
            resizableFormatter
          ]
        },
        width: 100
      },
      {
        header: {
          label: 'About'
        },
        children: [
          {
            property: 'company',
            header: {
              label: 'Company',
              formatters: [
                resizableFormatter
              ],
            },
            width: 100
          },
          {
            property: 'address',
            header: {
              label: 'Address',
              formatters: [
                resizableFormatter
              ],
            },
            width: 200
          },
        ],
      },
      {
        property: 'age',
        header: {
          label: 'Age'
        }
      }
    ];
  }
  getClassName(column, i) {
    return `column-${this.id}-${i}`;
  }
  render() {
    const components = {
      header: {
        cell: FixedWidthHeader
      }
    };
    const { searchColumn, rows, columns, query } = this.state;
    const searchedRows = search.multipleColumns({ columns, query })(rows);
    const resolvedColumns = resolve.columnChildren({ columns });
    const resolvedRows = resolve.resolve({
        columns: resolvedColumns,
        method: resolve.nested
      })(rows);

    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={resolvedColumns}
        columns={columns.filter(column => column.visible)}
        style={{ width: 'auto' }}
        components={components}
      >
      <span>Search</span>
      <search.Field
        column={searchColumn}
        query={query}
        columns={columns}
        rows={rows}
        onColumnChange={searchColumn => this.setState({ searchColumn })}
        onChange={query => this.setState({ query })}
      />

        <VisibilityToggles
          columns={columns}
          onToggleColumn={this.onToggleColumn}
        />

        <Sticky.Header
          style={{
            maxWidth: 800
          }}
          headerRows={resolve.headerRows({ columns })}
          ref={tableHeader => {
            this.tableHeader = tableHeader && tableHeader.getRef();
          }}
          tableBody={this.tableBody}
        />

        <Sticky.Body
          rows={searchedRows, resolvedRows} rowKey="id"
          rowKey="id"
          onRow={this.onRow}
          style={{
            maxWidth: 800,
            maxHeight: 400
          }}
          ref={tableBody => {
            this.tableBody = tableBody && tableBody.getRef();
          }}
          tableHeader={this.tableHeader}
        />
      </Table.Provider>
    );
  }
  onRow(row, { rowIndex }) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
    };
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

export default Mixed;