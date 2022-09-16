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
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  IconButton,
  Image,
  Tooltip,
  VisuallyHidden,
} from "@chakra-ui/react";

import { HiOutlineLink } from "react-icons/hi";
import { FcMoneyTransfer, FcAddDatabase, FcFlashOn } from "react-icons/fc";

import BlockComponent from "../components/Block/Block";
import TransactionsTable from "../components/TransactionsTable/TransactionsTable";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Navbar from "../components/Navbar/NavbarChakra";
import { Transaction, Block, Blockchain, User } from "../lib/Interfaces";
import { useAuthContext } from "../lib/contexts/authContext";
import dbConnect from "../lib/utils/dbConnect";

import { useTransactionContext } from "../lib/contexts/transactionContext";
import TransactionModal from "../components/TransactionModal/TransactionModal";
import BuyCoinModal from "../components/buyCoinModal/BuyCoinModal";

const Main: FC = () => {
  const [blockchain, setBlockchain] = useState<Block[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [users, setUsers] = useState<User[]>([]);
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>(
    []
  );

  const { isLoggedIn, name } = useAuthContext();

  const theme = useTheme();

  const { transactionOnOpen, buyCoinOnOpen } = useTransactionContext();

  useEffect(() => {
    async function fetchData() {
      const blockchainResponse = await (await axios.get("api/blockchain")).data;
      const usersResponse = await (await axios.get("api/user")).data;

      setBlockchain(sliceIntoChunks(blockchainResponse.chain, 4));
      setPendingTransactions(blockchainResponse.pendingTransactions);
      setUsers(usersResponse);
      setCurrentPage(sliceIntoChunks(blockchainResponse.chain, 4).length - 1);
    }

    fetchData();
  }, []);

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
      const response = await (await axios.post("/api/block")).data;

      setPendingTransactions(response.pendingTransactions);
      setBlockchain(sliceIntoChunks(response.chain, 4));
      setCurrentPage(sliceIntoChunks(response.chain, 4).length - 1);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currentPage);


  return (
    <Container
      maxWidth="container.xl"
      py={10}
      display="flex"
      flexDirection="column"
    >
      <Navbar setUsers={setUsers} users={users} />
      <Flex justifyContent="space-between" px={2} py={10} position="relative">
        <Box>
          <Heading size="3xl">TawsifCoin Blockchain</Heading>
          <StatGroup px={2}>
            <Stat>
              <StatLabel>USD to TawsifCoin</StatLabel>
              <StatNumber>$5000 USD</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </StatGroup>

          <Button
            onClick={buyCoinOnOpen}
            border="2px solid"
            color="white"
            bgColor={theme.colors.darkBlue}
            rightIcon={<FcFlashOn />}
            _hover={{ bgColor: theme.colors.teal }}
          >
            Buy TawsifCoin
          </Button>
          <BuyCoinModal setPendingTransactions={setPendingTransactions} />
        </Box>

        <Box position="absolute" right={0} top={3}>
          <Heading size="md" mb={3} textAlign="right">
            {isLoggedIn ? `Welcome, ${name}!` : ""}
          </Heading>
          <Flex gap={3}>
            <Button
              leftIcon={<FcMoneyTransfer />}
              onClick={transactionOnOpen}
              bgColor={theme.colors.purple}
              color="white"
              _hover={{ bgColor: theme.colors.teal }}
              disabled={!isLoggedIn}
            >
              Create Transaction
            </Button>

            <Button
              leftIcon={<FcAddDatabase />}
              onClick={mineBlock}
              bgColor={theme.colors.purple}
              _hover={{ bgColor: theme.colors.teal }}
              color="white"
            >
              Mine Block
            </Button>
          </Flex>
        </Box>
      </Flex>

      <TransactionModal
        users={users}
        setPendingTransactions={setPendingTransactions}
      />

      <Flex
        height="min"
        alignItems="center"
        flexWrap="wrap"
        mt={3}
        gap={9}
        pl={1.5}
      >
        {blockchain[currentPage] &&
          blockchain[currentPage].map((block: any, index: number) => (
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

export default Main;
