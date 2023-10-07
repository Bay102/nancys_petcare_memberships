import { useState } from 'react';
import styles from './admins.module.css';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IssuesCloseOutlined,
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Button } from 'antd';
import { MembersList } from './MembersList';
import { Schedule } from './Schedule';
import { useUserProvider } from '../../Providers/User.provider';
import { useNavigate } from 'react-router-dom';
import Textline from './Textline';

const { Header, Sider, Content } = Layout;

export const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [component, setComponent] = useState(<Textline />);
  const navigate = useNavigate();
  const { signOut } = useUserProvider();

  const logOut = () => {
    signOut();
    navigate('/');
  };

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: (
                <MessageOutlined onClick={() => setComponent(<Textline />)} />
              ),
              label: 'Messages',
              onClick: () => setComponent(<Textline />),
            },
            {
              key: '2',
              icon: <CalendarOutlined />,
              label: 'Schedule',
              onClick: () => setComponent(<Schedule />),
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: 'Members',
              onClick: () => setComponent(<MembersList />),
            },
            {
              key: '4',
              icon: <IssuesCloseOutlined />,
              label: 'Requests',
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
  );
};

// export default App;
