import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Container,
  useTheme,
} from "@chakra-ui/react";
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
  const theme = useTheme(); 
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
    <Container maxWidth="container.lg" mt={12} >
      <Table {...props} variant="striped" >
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
                <Td maxWidth="sm">{user.name}</Td>
                <Td>
                  <Text noOfLines={1} maxWidth="sm">
                    {user.publicKey}{" "}
                  </Text>
                </Td>
                <Td maxWidth="sm">{user.balance}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
};

export default UsersTable;
