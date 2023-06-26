import Typography from 'antd/es/typography/Typography';
import React, { useEffect, useState } from 'react';
import { getOrders } from '../../API';
import { Avatar, Rate, Space, Table } from 'antd';

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  console.log({ data: dataSource });

  useEffect(() => {
    try {
      setLoading(true);
      getOrders().then((res) => {
        setDataSource(res.products);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4} style={{ textAlign: 'center' }}>
        Orders
      </Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
          },
          {
            title: 'Price',
            dataIndex: 'price',
            render: (value) => <span>${value}</span>,
          },

          {
            title: 'Quantity',
            dataIndex: 'quantity',
          },
          {
            title: 'Total',
            dataIndex: 'total',
          },
          {
            title: 'Discount',
            dataIndex: 'discountedPrice',
          },
        ]}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </Space>
  );
};

export default Orders;
