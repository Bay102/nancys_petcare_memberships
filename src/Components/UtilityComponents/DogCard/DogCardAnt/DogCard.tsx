import {
  EditOutlined,
  //   EllipsisOutlined,
  //   SettingOutlined,
} from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

type CardProps = {
  name: string;
  breed: string;
  age: number;
};

const styles = {
  width: 320,
  filter: 'drop-shadow(2px 2px 1px black)',
};

export const DogCardAnt = ({ name, breed, age }: CardProps) => (
  <Card
    style={styles}
    cover={<img alt="example" src="/charlieBoy.jpeg" />}
    actions={[
      <EditOutlined key="edit" />,
      // <SettingOutlined key="setting" />,
      // <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      // avatar={
      //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
      //   //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
      // }
      title={`${name} ${age}`}
      description={breed}
    />
  </Card>
);
