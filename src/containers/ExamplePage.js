import React, { Component } from 'react';
import * as Table from 'reactabular-table';

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
      }
    ];
    const countries = {
      fi: 'Finland',
      dk: 'Denmark'
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


class Example extends Component {

  render() {

    return (
    <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />

          <Table.Body rows={rows} rowKey="id" />
    </Table.Provider>
    );
  }
}

export default Example;
