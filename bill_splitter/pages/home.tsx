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
} from "@chakra-ui/react";

import BlockComponent from "../components/Block/Block";
import TransactionsTable from "../components/TransactionsTable/TransactionsTable";
import axios from "axios";
import React, { FC, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import UsersTable from "../components/UsersTable/UsersTable";
import { Transaction, Block, Blockchain, User } from "../lib/Interfaces";
import { useAuthContext } from "../lib/contexts/authContext";

interface MainProps {
  tawsifCoin: Blockchain;
  usersFromFetchCall: User[];
}

const Main: FC<MainProps> = ({ tawsifCoin, usersFromFetchCall }: MainProps) => {
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>(
    []
  );
  const [blockchain, setBlockchain] = useState<Block[]>(tawsifCoin.chain);
  const [users, setUsers] = useState<User[]>(usersFromFetchCall || []);

  const { isLoggedIn, publicKey, name, logout, signUpOnOpen, loginOnOpen } =
    useAuthContext();

  // const createTransaction = async () => {
  //   try {
  //     const body = {
  //       privateKey,
  //       transactionDetails: {
  //         fromAddress: publicKey,
  //         toAddress: "broskiTf",
  //         amount: 100,
  //       },
  //     };

  //     const response = await (
  //       await axios.post("http://localhost:3000/api/transaction", body)
  //     ).data;

  //     setPendingTransactions(response.pendingTransactions);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const mineBlock = async () => {
    try {
      const body = {
        minerAddress: "ZeyadTheMiner",
      };

      const response = await (
        await axios.post("http://localhost:3000/api/block", body)
      ).data;

      setPendingTransactions(response.pendingTransactions);
      setBlockchain(response.chain);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="container.xl" py={10}>
      <Navbar setUsers={setUsers} users={users}>
        {!isLoggedIn ? (
          <Box>
            <Button onClick={signUpOnOpen}>Sign Up</Button>
            <Button onClick={loginOnOpen}>Login</Button>
          </Box>
        ) : (
          <Button onClick={logout}>Logout</Button>
        )}
      </Navbar>

      {isLoggedIn && <Button>Create Transaction</Button>}

      <Text>Public Key: {publicKey}</Text>
      <Text>Name : {name}</Text>
      <Grid templateColumns="repeat(5, 1fr)" gap={3}>
        {blockchain.map((block: any, index: number) => {
          return (
            <BlockComponent
              hash={block.hash}
              previousHash={block.previousHash}
              nonce={block.nonce}
              timestamp={block.timestamp}
              transactions={block.transactions}
              key={index}
            />
          );
        })}
      </Grid>
      <Button onClick={mineBlock}>Mine Block</Button>
      <Heading>Transactions Table</Heading>
      <TransactionsTable transactions={pendingTransactions} />
      <Heading>Users Table</Heading>
      <UsersTable users={users} />
    </Container>
  );
};

export async function getServerSideProps() {
  const blockchainResponse = await (
    await axios.get("http://localhost:3000/api/blockchain")
  ).data; // make the api call to backend here

  const usersResponse = await (
    await axios.get("http://localhost:3000/api/user")
  ).data;
  return { props: { tawsifCoin: blockchainResponse, users: usersResponse } };
}

export default Main;
