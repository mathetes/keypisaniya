import React from 'react';
import * as Table from 'reactabular-table';
import * as Sticky from 'reactabular-sticky';
import * as resizable from 'reactabular-resizable';
import uuid from 'uuid';
import { generateRows } from './helpers';
import * as resolve from 'table-resolver';



const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'age', 'company']
};
const rows = generateRows(100, schema);

class Resize extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      rows
    };

    this.tableHeader = null;
    this.tableBody = null;
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
        property: 'name',
        header: {
          label: 'Name',
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
    const { rows, columns } = this.state;

    const resolvedColumns = resolve.columnChildren({ columns });
    const resolvedRows = resolve.resolve({
        columns: resolvedColumns,
        method: resolve.nested
      })(rows);

    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={resolvedColumns}
        style={{ width: 'auto' }}
      >
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
          rows={resolvedRows}
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
}

export default Resize;