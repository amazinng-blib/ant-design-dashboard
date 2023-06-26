import { Typography } from 'antd';
import { TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import React from 'react';

const AppFooter = () => {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+2347061847132" target={'_blank'}>
        +2347061847132
      </Typography.Link>
      <Typography.Link
        href="https://twitter.com/@NwankwoErnest02"
        target={'_blank'}
      >
        <TwitterOutlined style={{ fontSize: 24 }} />
      </Typography.Link>
      <Typography.Link
        href="https://www.instagram.com/ernestpredict/"
        target={'_blank'}
      >
        <InstagramOutlined style={{ fontSize: 24 }} />
      </Typography.Link>
    </div>
  );
};

export default AppFooter;
