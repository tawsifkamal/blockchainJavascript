import React, { FC, ReactNode } from "react";
import {
  Box,
  Divider,
  Heading,
  Text,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useTheme,
} from "@chakra-ui/react";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import { Transaction } from "../../lib/Interfaces";

interface BlockProps {
  hash: string;
  previousHash: string;
  timestamp: Date;
  nonce: number;
  transactions: Transaction[];
  index: number;
}

const Block: FC<BlockProps> = ({
  hash,
  previousHash,
  timestamp,
  nonce,
  transactions,
  index,
}: BlockProps) => {
  const StyledDivider: FC<any> = (props) => (
    <Divider width="95%" borderColor="gray.400" {...props} />
  );

  const theme = useTheme();

  const StyledText: FC<any> = ({ children, ...props }: any) => (
    <Text fontSize="sm" noOfLines={1} {...props}>
      {children}
    </Text>
  );

  return (
    <Box
      display="flex"
      alignSelf="start"
      px={4}
      py={4}
      rounded={4}
      gap={1}
      flexDirection="column"
      boxShadow="base"
      maxWidth={60}
      border="1px solid"
      borderColor="gray.300"
    >
      <Heading size="md">
        {index === 0 ? "Genesis Block" : "Block " + index}
      </Heading>

      <StyledDivider />
      <StyledText>Hash</StyledText>
      <StyledText color="hotpink">{hash}</StyledText>

      <StyledDivider />
      <StyledText>Previous Hash</StyledText>
      <StyledText color="gray.500">{previousHash}</StyledText>

      <StyledDivider />
      <StyledText>Nonce</StyledText>
      <StyledText color="gray.500">{nonce}</StyledText>

      <StyledDivider />
      <Badge
        size="sm"
        alignSelf="flex-start"
        p={0.5}
        fontSize="0.6em"
        colorScheme="teal"
        variant="subtle"
      >
        Timestamp
      </Badge>
      <StyledText color="gray.500">{timestamp.toString()}</StyledText>

      <StyledDivider />
      <Popover>
        <PopoverTrigger>
          <Button
            variant="link"
            textDecoration="underline"
            textUnderlineOffset={4}
            maxWidth="min"
            py={2}
            color={theme.colors.teal}
          >
            Block Transactions
          </Button>
        </PopoverTrigger>
        <PopoverContent
          width="full"
          maxHeight="200px"
          overflowY="scroll"
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>All Transactions</PopoverHeader>
          <PopoverBody overflowX="hidden">
            <TransactionsTable transactions={transactions} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Block;
