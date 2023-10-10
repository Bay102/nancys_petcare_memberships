import { Input, Space } from 'antd';
import { SearchProps } from 'antd/es/input';
// import { AudioOutlined } from '@ant-design/icons';
// import type { SearchProps } from '../Search';

const { Search } = Input;

// const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
//   console.log(info?.source, value);

export const SearchInput = ({ onSearch }: SearchProps) => (
  <Space direction="vertical">
    <Search
      placeholder="Client Search"
      onSearch={onSearch}
      enterButton
      style={{ width: '300px' }}
    />
  </Space>
);
