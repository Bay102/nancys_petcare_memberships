/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { FaHandHoldingHeart, FaMoneyCheckAlt } from 'react-icons/fa';
import { GiJumpingDog } from 'react-icons/gi';

import { NPC } from '../../NPC/NPC';
import { useUserProvider } from '../../Providers/User.provider';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../UserProfile/UserProfile';

const { Header, Sider, Content } = Layout;

export const UserDashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [component, setComponent] = useState(<UserProfile />);

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
      <Layout style={{ height: '80.5vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          {user && (
            <div className={styles.welcome}>
              <p>Welcome Back, {userData?.first_name}</p>
              <img
                onClick={() => navigate('/')}
                className={styles.navLogo}
                src="/Logo.jpeg"
                alt=""
              />
            </div>
          )}
          <Menu
            // theme="light"
            mode="inline"
            className={styles.menu}
            defaultSelectedKeys={['3']}
            items={[
              {
                key: '1',
                icon: <DesktopOutlined />,
                label: 'Nancys Pet Care',
                onClick: () => setComponent(<NPC />),
              },
              {
                key: '3',
                icon: <UserOutlined />,
                label: 'Profile',
                onClick: () => setComponent(<UserProfile />),
              },
              {
                key: '7',
                icon: <GiJumpingDog />,
                label: 'Services',
              },
              {
                key: '6',
                icon: <FaHandHoldingHeart />,
                label: 'Membership',
              },
              // {
              //   key: '2',
              //   icon: <MessageOutlined />,
              //   label: 'Message Nancy',
              // },
              // {
              //   key: '4',
              //   icon: <FaMoneyCheckAlt />,
              //   label: 'Pay Now',
              // },
              // {
              //   key: '5',
              //   icon: <UploadOutlined />,
              //   label: 'Invoices',
              // },
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
          </Header>
          <Content className={styles.content}>{component}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
