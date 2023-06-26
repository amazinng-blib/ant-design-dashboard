import Typography from 'antd/es/typography/Typography';
import React, { useEffect, useState } from 'react';
import { getCustomers } from '../../API';
import { Avatar, Rate, Space, Table } from 'antd';

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  console.log({ data: dataSource });

  useEffect(() => {
    try {
      setLoading(true);
      getCustomers().then((res) => {
        setDataSource(res?.users);
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
        Customers
      </Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: 'Profile',
            dataIndex: 'image',
            render: (link) => {
              return <Avatar src={link} alt="icons" />;
            },
          },
          {
            title: 'First Name',
            dataIndex: 'lastName',
          },
          {
            title: 'Last Name',
            dataIndex: 'price',
          },

          {
            title: 'Age',
            dataIndex: 'age',
            // render: (rating) => {
            //   return <Rate value={rating} allowHalf disabled />;
            // },
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
          },
          {
            title: 'Email',
            dataIndex: 'email',
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
          },
          {
            title: 'User Name',
            dataIndex: 'username',
          },
          {
            title: 'Hair Color',
            dataIndex: 'hair',
            render: (item) => Object.values(item)[0],
          },
          {
            title: 'Address',
            dataIndex: 'address',
            render: (address) => {
              return (
                <span>
                  {address?.address}, {address?.city}
                </span>
              );
            },
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

export default Customers;
