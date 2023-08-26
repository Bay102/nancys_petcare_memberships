import { useState } from 'react';

export const Admins = () => {
  return (
    <>
      <AdminDashboard />
    </>
  );
};

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IssuesCloseOutlined,
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { MembersList } from './MembersList';
import { Schedule } from './Schedule';

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [component, setComponent] = useState(<MembersList />);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
              icon: <UserOutlined onClick={() => setComponent(<MembersList />)} />,
              label: 'Members',
            },
            {
              key: '2',
              icon: <CalendarOutlined onClick={() => setComponent(<Schedule />)} />,
              label: 'Schedule',
            },
            {
              key: '3',
              icon: <MessageOutlined />,
              label: 'Messages',
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
        <Header style={{ padding: 0, background: colorBgContainer, height: 60 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 10,
            minHeight: '78vh',
            background: colorBgContainer,
          }}
        >
          {component}
        </Content>
      </Layout>
    </Layout>
  );
};

// export default App;
