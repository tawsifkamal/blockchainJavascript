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

import Block from "../components/Block/Block";
import TransactionsTable from "../components/TransactionsTable/TransactionsTable";
import axios from "axios";
import React, { FC, useState } from "react";
import Transaction from "../lib/models/Transaction";
import BlockType from "../lib/models/Block";
import Navbar from "../components/Navbar";
import UsersTable from '../components/UsersTable/UsersTable';

const Main: FC<any> = ({ tawsifCoin, users }: any) => {
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [blockchain, setBlockchain] = useState(tawsifCoin.chain);

  const createTransaction = async () => {
    try {
      const body = {
        privateKey,
        transactionDetails: {
          fromAddress: publicKey,
          toAddress: "broskiTf",
          amount: 100,
        },
      };

      const response = await (
        await axios.post("http://localhost:3000/api/transaction", body)
      ).data;

      setPendingTransactions(response.pendingTransactions);
    } catch (error) {
      console.log(error);
    }
  };


  const resetKey = async () => {
    setIsLoggedIn(false);
    setPrivateKey(null);
    setPublicKey(null);
    setName(null);
  };

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
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        publicKey={publicKey}
        setPublicKey={setPublicKey}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        name={name}
        setName={setName}
        resetKey={resetKey}
      />

      {publicKey && privateKey && (
        <Button onClick={createTransaction}>Create Transaction</Button>
      )}

      <Text>Public Key: {publicKey}</Text>
      <Text>Private Key: {privateKey}</Text>
      <Text>Name : {name}</Text>
      <Grid templateColumns="repeat(5, 1fr)" gap={3}>
        {blockchain.map((block: any, index: number) => {
          return (
            <Block
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
