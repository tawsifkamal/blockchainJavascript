import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import {FC} from 'react';


interface Transaction {
    fromAddress: string | null;
    toAddress: string;
    amount: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable : FC<TransactionsTableProps> = ({transactions, ...props}: TransactionsTableProps) => {
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
              <Td>{transaction.fromAddress}</Td>
              <Td>{transaction.toAddress}</Td>
              <Td>{transaction.amount}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  )
}


export default TransactionsTable;