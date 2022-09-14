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
  Heading,
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
    <Container maxWidth="container.xl" mt={12}>
      <Heading mb={6}>All Users</Heading>
      <Table {...props} variant="striped" boxShadow="lg">
        <Thead bgColor={theme.colors.darkBlue}>
          <Tr>
            <Th color="white">Name</Th>
            <Th color="white">Public Key</Th>
            <Th color="white">Current Balance</Th>
          </Tr>
        </Thead>
        <Tbody bgColor={theme.colors.lightBlue}>
          {usersWithBalance.map((user: any, index: any) => {
            return (
              <Tr key={index}>
                <Td maxWidth="sm">{user.name}</Td>
                <Td maxWidth="xs" >
                  <Text noOfLines={1} maxWidth="lg">
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
