/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './dogCardAnt.module.css';
import { EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import DogAvatar from '../../DogAvatar/DogAvatar';
import { ChangeEvent, useState } from 'react';
import { supabase } from '../../../../supabase.config';
import { DogData } from '../../../../Api/get-users-dogs';
import { useUserProvider } from '../../../Providers/User.provider';

const { Meta } = Card;

type CardProps = {
  key: string;
  dogData: DogData;
};

export const DogCardAnt = ({ dogData }: CardProps) => {
  const { fetchDogs } = useUserProvider();
  const [, setLoading] = useState(true);

  async function updateUrl(event: ChangeEvent<HTMLInputElement>, url: string) {
    event.preventDefault();
    setLoading(true);

    await supabase
      .from('dogs')
      .update({ dog_pic_url: url })
      .eq('id', dogData.id)
      .then(() => {
        fetchDogs();
        setLoading(false);
      });
  }

  return (
    <Card
      className={styles.cardContainer}
      cover={
        <DogAvatar
          url={dogData.dog_pic_url}
          // size={'150px'}
          onUpload={(event: ChangeEvent<HTMLInputElement>, url: string) => {
            updateUrl(event, url);
          }}
        />
      }
      actions={[
        <EditOutlined key="edit" />,
        // <SettingOutlined key="setting" />,
        // <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        // avatar={
        //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        //     <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        // }
        title={`${dogData.name}`}
        description={`${dogData.breed} ${dogData.age}`}
      />
    </Card>
  );
};
