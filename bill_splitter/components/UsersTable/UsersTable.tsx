import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { User, Block } from "../../lib/Interfaces";

interface UsersTableProps {
  users: User[];
  blockchain: Block[];
}
const UsersTable: FC<UsersTableProps> = ({
  users,
  blockchain,
  ...props
}: UsersTableProps) => {
  const [usersWithBalance, setUsersWithBalance] = useState(users);

  useEffect(() => {
    async function fetchData() {
      const response = await (
        await axios.get("http://localhost:3000/api/user/getBalance")
      ).data;

      setUsersWithBalance(response);
    }

    fetchData();
  }, [blockchain, users]);

  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Public Key</Th>
          <Th>Current Balance</Th>
        </Tr>
      </Thead>
      <Tbody>
        {usersWithBalance.map((user: any, index: any) => {
          return (
            <Tr key={index}>
              <Td>{user.name}</Td>
              <Td>{user.publicKey}</Td>
              <Td>{user.balance}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default UsersTable;
