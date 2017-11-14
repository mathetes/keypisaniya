import React, { Component } from 'react';
import * as Table from 'reactabular-table';
import globalStyles from '../styles';

const rows = [
  {
    id: 100,
    name: 'John',
    tools: {
      hammer: true
    },
    country: 'fi'
  },
  {
    id: 101,
    name: 'Jack',
    tools: {
      hammer: false
    },
    country: 'dk'
  },
  {
    id: 102,
    name: 'Roman',
    tools: {
      hammer: true
    },
    country: 'ru'
  },
  {
    id: 103,
    name: 'Jack',
    tools: {
      hammer: false
    },
    country: 'dk'
  },
];
const countries = {
  fi: 'Finland',
  dk: 'Denmark',
  ru: 'Russia'
};

const columns = [
  {
    property: 'name',
    header: {
      label: 'Name',
      transforms: [
        label => ({
          onClick: () => alert(`clicked ${label}`)
        })
      ]
    }
  },
  {
    property: 'tools',
    header: {
      label: 'Active',
      transforms: [
        label => ({
          onClick: () => alert(`clicked ${label}`)
        })
      ]
    },
    cell: {
      formatters: [
        tools => tools.hammer ? 'Hammertime' : 'nope'
      ]
    }
  },
  {
    property: 'country',
    header: {
      label: 'Country',
      transforms: [
        label => ({
          onClick: () => alert(`clicked ${label}`)
        })
      ]
    },
    cell: {
      formatters: [
        country => countries[country]
      ]
    }
  },
];

class Keyparams extends Component {
    render() {
      return (
        <div>
          <h3 style={globalStyles.navigation}>Главная / Панель управления</h3>
          <Table.Provider
            className="pure-table pure-table-striped"
            columns={columns}
          >
            <Table.Header />

            <Table.Body rows={rows} rowKey="id" />
          </Table.Provider>

        </div>
      );
    }
}

export default Keyparams;
