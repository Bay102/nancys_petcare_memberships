import { useState } from 'react';
import styles from './userDashboard.module.css';
import { Layout, Menu, Button, ConfigProvider } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  DesktopOutlined,
  MessageOutlined,
} from '@ant-design/icons';

import { NPC } from '../../NPC/NPC';
import { useUserProvider } from '../../Providers/User.provider';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export const UserDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [component, setComponent] = useState(<NPC />);

  const { user, userData, signOut } = useUserProvider();
  const navigate = useNavigate();

  const logOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'white',
        },
        components: {
          Layout: {},
        },
      }}
    >
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: 'white' }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <DesktopOutlined />,
                label: 'Nancys Pet Care',
                onClick: () => setComponent(<NPC />),
              },
              {
                key: '2',
                icon: <MessageOutlined />,
                label: 'Message Nancy',
              },
              {
                key: '3',
                icon: <UserOutlined />,
                label: 'Profile',
              },
              {
                key: '4',
                icon: <UploadOutlined />,
                label: 'Pay Now',
              },
              {
                key: '5',
                icon: <UploadOutlined />,
                label: 'Invoices',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className={styles.headerButton}
              style={{ marginRight: 'auto' }}
            />
            <Button
              type="text"
              icon={<HomeOutlined />}
              onClick={() => navigate('/')}
              className={styles.headerButton}
            />
            {user && (
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={() => logOut()}
                className={styles.headerButton}
              />
            )}

            {user && <div>Hello, {userData?.first_name}</div>}
          </Header>
          <Content className={styles.content}>{component}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
