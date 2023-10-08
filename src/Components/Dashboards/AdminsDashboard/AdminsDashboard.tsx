import { useState } from 'react';
import styles from './admins.module.css';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IssuesCloseOutlined,
  CalendarOutlined,
  MessageOutlined,
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { FaUserFriends, FaDog, FaMoneyCheckAlt } from 'react-icons/fa';

import { Layout, Menu, Button, ConfigProvider } from 'antd';
import { MembersList } from './MembersList';
import { Schedule } from './Schedule';
import { useUserProvider } from '../../Providers/User.provider';
import { useNavigate } from 'react-router-dom';
import Textline from './Textline';

const { Header, Sider, Content } = Layout;

export const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [component, setComponent] = useState(<Schedule />);
  const navigate = useNavigate();

  const { user, signOut } = useUserProvider();

  const logOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          // className={styles.sider}
          theme="light"
          // style={{ backgroundColor: '#f19fce' }}
        >
          {user && (
            <div className={styles.welcome}>
              {/* Welcome Back {userData?.first_name} */}
              <img
                onClick={() => navigate('/')}
                className={styles.navLogo}
                src="./src/assets/Logo.jpeg"
                alt=""
              />
            </div>
          )}
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            className={styles.menu}
            items={[
              {
                key: '1',
                icon: <CalendarOutlined />,
                label: 'Schedule',
                onClick: () => setComponent(<Schedule />),
              },
              {
                key: '3',
                icon: (
                  <MessageOutlined onClick={() => setComponent(<Textline />)} />
                ),
                label: 'Messages',
                onClick: () => setComponent(<Textline />),
              },
              {
                key: '5',
                icon: <IssuesCloseOutlined />,
                label: 'Requests',
              },
              {
                key: '4',
                icon: <FaUserFriends />,
                label: 'Members',
                onClick: () => setComponent(<MembersList />),
              },
              {
                key: '6',
                icon: <FaDog />,
                label: 'My Dogs',
              },
              {
                key: '7',
                icon: <FaMoneyCheckAlt />,
                label: 'Charge',
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
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={() => logOut()}
              className={styles.headerButton}
            />
          </Header>
          <Content className={styles.content}>{component}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

// export default App;
