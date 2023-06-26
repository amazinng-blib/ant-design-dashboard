import React, { useEffect, useMemo, useState } from 'react';
import { Card, Space, Statistic, Table, Typography } from 'antd';
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import { getCustomers, getInventory, getOrders, getRevenue } from '../../API';
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chartjs.register(
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const Dashboard = () => {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res?.total);
      setRevenue(res?.discountedTotal);
    });

    getInventory().then((res) => {
      setInventory(res?.total);
    });
    getCustomers().then((res) => {
      setCustomers(res?.total);
    });
    // getRevenue().then((res) => {
    //   setRevenue(res?.total);
    // });
  }, []);
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal" style={{ overflowX: 'auto' }}>
        <DashboardCard
          title="Orders"
          value={orders}
          icon={
            <ShoppingCartOutlined
              style={{
                color: 'green',
                backgroundColor: 'rgba(0,255,0,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
        />
        <DashboardCard
          title="Inventory"
          value={inventory}
          icon={
            <ShoppingOutlined
              style={{
                color: 'blue',
                backgroundColor: 'rgba(0,0,255,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
        />
        <DashboardCard
          title="Customers"
          value={customers}
          icon={
            <UserOutlined
              style={{
                color: 'purple',
                backgroundColor: 'rgba(0,255,255,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
        />
        <DashboardCard
          title="Revenue"
          value={revenue}
          icon={
            <DollarCircleOutlined
              style={{
                color: 'red',
                backgroundColor: 'rgba(255,0,0,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
};

export default Dashboard;

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log({ data: dataSource });

  useEffect(() => {
    try {
      setLoading(true);
      getOrders().then((res) => {
        setDataSource(res?.products?.splice(0, 3));
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  // useMemo(() => {
  //   try {
  //     setLoading(true);
  //     getOrders().then((res) => {
  //       setDataSource(res?.products?.splice(0, 3));
  //       setLoading(false);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      {dataSource?.length > 0 ? (
        <Table
          loading={loading}
          columns={[
            {
              title: 'Title',
              dataIndex: 'title',
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
            },
            {
              title: 'DiscountedPrice',
              dataIndex: 'discountedPrice',
            },
          ]}
          dataSource={dataSource}
          pagination={false}
        ></Table>
      ) : (
        <Space direction="vertical" style={{ display: 'block' }}>
          <Typography.Text>No data fetched</Typography.Text>
        </Space>
      )}
    </>
  );
}

function DashboardChart() {
  const [fetched, setFetched] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: '',
      },
    ],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts?.map((cart) => {
        return `User-${cart.userId}`;
      });

      const data = res.carts?.map((cart) => {
        return cart?.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data: data,
            backgroundColor: 'rgba(255, 0, 0, 1)',
          },
        ],
      };

      setFetched(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Revenue',
      },
    },
  };
  // const labels = [
  //   'jan',
  //   'feb',
  //   'Mar',
  //   'Apr',
  //   'May',
  //   'Jun',
  //   'Jul',
  //   'Aug',
  //   'Sept',
  //   'Oct',
  //   'Nov',
  //   'Dec',
  // ];

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: labels.map(() => Math.random() * 1000),
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => Math.random() * 1000),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <Card style={{ width: 500, height: 350 }}>
      {' '}
      <Bar options={options} data={fetched} />{' '}
    </Card>
  );
}
