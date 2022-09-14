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
  const [blockchain, setBlockchain] = useState<Block[][]>(
    sliceIntoChunks(tawsifCoin.chain, 4)
  );
  const [currentPage, setCurrentPage] = useState<number>(blockchain.length - 1);

  const [users, setUsers] = useState<User[]>(usersFromFetchCall || []);
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>(
    tawsifCoin.pendingTransactions
  );

  const { isLoggedIn, publicKey, name, logout, signUpOnOpen, loginOnOpen } =
    useAuthContext();

  const theme = useTheme();

  const { transactionOnOpen } = useTransactionContext();

  function sliceIntoChunks(arr: Block[], chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const mineBlock = async () => {
    try {
      const response = await (
        await axios.post("http://localhost:3000/api/block")
      ).data;

      setPendingTransactions(response.pendingTransactions);
      setBlockchain(sliceIntoChunks(response.chain, 4));
      setCurrentPage(sliceIntoChunks(response.chain, 4).length - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="container.xl"
      py={10}
      display="flex"
      flexDirection="column"
    >
      <Navbar setUsers={setUsers} users={users} />
      <Flex justifyContent="space-between" px={3} pt={5}>
        {isLoggedIn && <Heading> Welcome, {name}! </Heading>}

        <Flex gap={3}>
          <Button
            onClick={mineBlock}
            bgColor={theme.colors.purple}
            color="white"
          >
            Mine Block
          </Button>
          {isLoggedIn && (
            <Button
              onClick={transactionOnOpen}
              bgColor={theme.colors.purple}
              color="white"
            >
              Create Transaction
            </Button>
          )}
        </Flex>
      </Flex>

      <TransactionModal
        users={users}
        setPendingTransactions={setPendingTransactions}
      />

      <Flex
        height="min"
        alignItems="center"
        border="1px solid black"
        flexWrap="wrap"
        mt={3}
        gap={9}
        pl={2}
      >
        {blockchain[currentPage].map((block: any, index: number) => (
          <>
            {index > 0 && index % 4 !== 0 && (
              <Icon as={HiOutlineLink} boxSize="1.2em" />
            )}

            <BlockComponent
              hash={block.hash}
              previousHash={block.previousHash}
              nonce={block.nonce}
              timestamp={block.timestamp}
              transactions={block.transactions}
              index={currentPage * 4 + index}
            />
          </>
        ))}
      </Flex>

      <Flex
        alignSelf="center"
        mt={10}
        bgColor={theme.colors.darkBlue}
        maxWidth="min"
        rounded={6}
        p={1}
        boxShadow="base"
        border="1px solid"
        borderColor="gray.300"
      >
        {[...Array(blockchain.length).keys()]
          .map((i) => i + 1)
          .map((page, index) => (
            <Button
              size="sm"
              variant="link"
              color={index === currentPage ? "teal" : "white"}
              onClick={() => setCurrentPage(page - 1)}
            >
              {page}
            </Button>
          ))}
      </Flex>

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
