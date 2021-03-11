import { Table } from 'antd';
import React from 'react';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

class Month extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    data: [],
  };
  componentDidMount() {
    setTimeout(() => {
      const data: any = [];
      for (let i = 0; i < 46; i++) {
        data.push({
          key: i,
          name: `Edward King ${i}`,
          age: 32,
          address: `London, Park Lane no. ${i}`,
        });
      }
      this.setState({ data });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys, data } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: (changableRowKeys: any) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter(
              (key: number, index: number) => {
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              },
            );
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: (changableRowKeys: any) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter(
              (key: number, index: number) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              },
            );
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <div>
        {this.props.children}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}

export default Month;
