/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from 'antd';
import { Member } from '../../Dashboards/AdminsDashboard/MembersList/MembersList';
import { AvatarAnt } from '../Avatar';

export const MemberCard = ({
  first_name,
  last_name,
  phone,
  member_status,
  dogs,
}: Member) => (
  <Card
    title={`${first_name} ${last_name}`}
    bordered={true}
    style={{
      width: 200,
      height: 350,
      boxShadow: '1px 1px 5px black',
      textAlign: 'center',
    }}
  >
    <AvatarAnt />
    <p>{phone}</p>
    <div>
      Member Status:
      {!member_status ? (
        <div>
          {' '}
          <strong>IN-ACTIVE</strong>{' '}
        </div>
      ) : (
        <div>✅</div>
      )}
    </div>
    <br />
    <div>
      Dogs:
      {dogs &&
        dogs.map((dog: any, index: number) => (
          <div key={index}>{dog.name}</div>
        ))}
    </div>
  </Card>
);
