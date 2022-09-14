import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Container,
  HStack,
  Button,
  Heading,
  Divider,
  Badge,
  Grid,
  AccordionButton,
  Icon,
  useTheme,
} from "@chakra-ui/react";

import { HiOutlineLink } from "react-icons/hi";

import BlockComponent from "../components/Block/Block";
import TransactionsTable from "../components/TransactionsTable/TransactionsTable";
import axios from "axios";
import React, { FC, useState } from "react";
import Navbar from "../components/Navbar/NavbarChakra";
import UsersTable from "../components/UsersTable/UsersTable";
import { Transaction, Block, Blockchain, User } from "../lib/Interfaces";
import { useAuthContext } from "../lib/contexts/authContext";

import { useTransactionContext } from "../lib/contexts/transactionContext";

import TransactionModal from "../components/TransactionModal/TransactionModal";

interface MainProps {
  tawsifCoin: Blockchain;
  usersFromFetchCall: User[];
}

const Main: FC<MainProps> = ({ tawsifCoin, usersFromFetchCall }: MainProps) => {
  const [blockchain, setBlockchain] = useState<Block[]>(tawsifCoin.chain);
  const [users, setUsers] = useState<User[]>(usersFromFetchCall || []);
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>(
    tawsifCoin.pendingTransactions
  );

  const { isLoggedIn, publicKey, name, logout, signUpOnOpen, loginOnOpen } =
    useAuthContext();

  const theme = useTheme();

  const { transactionOnOpen } = useTransactionContext();

  const mineBlock = async () => {
    try {
      const response = await (
        await axios.post("http://localhost:3000/api/block")
      ).data;

      setPendingTransactions(response.pendingTransactions);
      setBlockchain(response.chain);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="container.xl" py={10}>
      <Navbar setUsers={setUsers} users={users} />

      {isLoggedIn && (
        <Button onClick={transactionOnOpen}>Create Transaction</Button>
      )}

      <Text>Public Key: {publicKey}</Text>
      <Text>Name : {name}</Text>
      <TransactionModal
        users={users}
        setPendingTransactions={setPendingTransactions}
      />

      <Flex height="lg" flexWrap="wrap">
        {blockchain.map((block: any, index: number) => {
          {
            return (
              <>
                {index > 0 && <Icon as={HiOutlineLink} m={5} />}

                <BlockComponent
                  hash={block.hash}
                  previousHash={block.previousHash}
                  nonce={block.nonce}
                  timestamp={block.timestamp}
                  transactions={block.transactions}
                  index={index}
                />
              </>
            );
          }
        })}
      </Flex>
      <Button onClick={mineBlock}>Mine Block</Button>

      {pendingTransactions.length !== 0 && (
        <Box>
          <Heading mt={4}>Pending Transactions</Heading>
          <TransactionsTable transactions={pendingTransactions} />
        </Box>
      )}
    </Container>
  );
};

export async function getServerSideProps() {
  const blockchainResponse = await (
    await axios.get("http://localhost:3000/api/blockchain")
  ).data; // make the api call to backend here

  console.log(blockchainResponse);

  const usersResponse = await (
    await axios.get("http://localhost:3000/api/user")
  ).data;

  return {
    props: {
      tawsifCoin: blockchainResponse,
      usersFromFetchCall: usersResponse,
    },
  };
}

export default Main;
