import Typography from 'antd/es/typography/Typography';
import React, { useEffect, useState } from 'react';
import { getInventory } from '../../API';
import { Avatar, Rate, Space, Table } from 'antd';

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  console.log({ data: dataSource });

  useEffect(() => {
    try {
      setLoading(true);
      getInventory().then((res) => {
        setDataSource(res?.products);
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
        Inventory
      </Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            render: (link) => {
              return <Avatar src={link} alt="icons" />;
            },
          },
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
            title: 'Rating',
            dataIndex: 'rating',
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: 'Stock',
            dataIndex: 'stock',
          },
          {
            title: 'Brand',
            dataIndex: 'brand',
          },
          {
            title: 'Category',
            dataIndex: 'category',
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
};

export default Inventory;
