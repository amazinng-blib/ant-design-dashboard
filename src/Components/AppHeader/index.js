import React, { useState, useEffect } from 'react';
import { Badge, Drawer, Image, List, Space, Typography } from 'antd';
import { MailOutlined, BellFilled } from '@ant-design/icons';
import { getComments, getOrders } from '../../API';

const AppHeader = () => {
  const [comments, setComments] = useState([]);
  const [notification, setNotification] = useState([]);

  const [openComments, setOpenComments] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res?.comments);
    });
    getOrders().then((res) => {
      setNotification(res?.products);
    });
  }, []);
  return (
    <div className="AppHeader">
      <Image width={40} src="images/alogo-2.webp"></Image>
      <Typography.Title className="text">
        Nwankwo&apos;s Dashboard
      </Typography.Title>
      <Space>
        <Badge count={comments?.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => setOpenComments(true)}
          />
        </Badge>
        <Badge count={notification?.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => setOpenNotification(true)}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        open={openComments}
        onClose={() => setOpenComments(false)}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item?.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        maskClosable
      >
        <List
          dataSource={notification}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong> {item?.title} </Typography.Text> has
                been ordered
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
};

export default AppHeader;
