import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  Text,
  PopoverTrigger,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Button,
} from "@chakra-ui/react";
import { FC } from "react";
import { Transaction } from "../../lib/Interfaces";

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: FC<TransactionsTableProps> = ({
  transactions,
  ...props
}: TransactionsTableProps) => {
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th>From Address</Th>
          <Th>To Address</Th>
          <Th>Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction, index) => {
          return (
            <Tr key={index}>
              <Td>
                <Popover>
                  <PopoverTrigger>
                    <Button>{transaction.fromName}</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>User Details</PopoverHeader>
                    <PopoverBody>
                      <Text>Name : {transaction.fromName}</Text>
                      <Text>Public Address: {transaction.fromAddress}</Text>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>
              <Td>
                <Popover>
                  <PopoverTrigger>
                    <Button>{transaction.toName}</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>User Details</PopoverHeader>
                    <PopoverBody>
                      <Text>Name : {transaction.toName}</Text>
                      <Text>Public Address: {transaction.toAddress}</Text>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>
              <Td>{transaction.amount}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default TransactionsTable;
