import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { FC } from "react";

const UsersTable: FC<any> = ({ users, ...props }: any) => (
  <Table {...props}>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Public Key</Th>
      </Tr>
    </Thead>
    <Tbody>
      {users.map((user: any, index: any) => {
        return (
          <Tr key={index}>
            <Td>{user.name}</Td>
            <Td>{user.publicKey}</Td>
          </Tr>
        );
      })}
    </Tbody>
  </Table>
);

export default UsersTable
