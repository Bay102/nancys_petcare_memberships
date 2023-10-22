/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from 'antd';
import { Member } from '../../Dashboards/AdminsDashboard/MembersList/MembersList';

type MemberData = {
  key: number;
  memberData: Member;
};

export const MemberCard = ({ memberData }: MemberData) => (
  <Card
    title={`${memberData.first_name} ${memberData.last_name}`}
    bordered={true}
    style={{
      width: 200,
      height: 350,
      boxShadow: '1px 1px 5px black',
      textAlign: 'center',
    }}
  >
    <p>{memberData.phone}</p>
    <div>
      Member Status:
      {!memberData.member_status ? (
        <div>
          <strong>IN-ACTIVE</strong>
        </div>
      ) : (
        <div>✅</div>
      )}
    </div>
    <br />
    <div>
      Dogs:
      {memberData.dogs &&
        memberData.dogs.map((dog: any, index: number) => (
          <div key={index}>{dog.name}</div>
        ))}
    </div>
  </Card>
);
