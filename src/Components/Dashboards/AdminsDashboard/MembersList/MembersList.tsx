/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../../Api/get-all-users';
import styles from './membersList.module.css';
import { MemberCard } from '../../../UtilityComponents/MemberCard/MemberCard';
import { Dog } from '../../../../Api/create-dog';
import { SearchInput } from '../../../UtilityComponents/SearchInput';

export type Member = {
  id?: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  phone: number;
  member_status: string;
  avatarUrl?: string;
  dogs?: Dog[];
};

export const MembersList = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    getAllUsers().then((data: any) => setMembers(data));
  }, []);

  const onSearch = (value: string) => {
    const filteredMembers = members.filter((member) =>
      member.first_name.includes(value)
    );
    setMembers(filteredMembers);
  };

  return (
    <>
      <div className={styles.filterContainer}>
        <SearchInput onSearch={onSearch} />
      </div>
      <div className={styles.membersListContainer}>
        <div className={styles.members}>
          {members &&
            members.map((member, index) => (
              <MemberCard
                key={index}
                first_name={member.first_name}
                last_name={member.last_name}
                phone={member.phone}
                member_status={member.member_status}
                avatarUrl={member.avatarUrl}
                dogs={member.dogs}
              />
            ))}
        </div>
      </div>
    </>
  );
};
