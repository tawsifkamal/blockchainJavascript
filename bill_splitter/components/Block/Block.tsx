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
} from "@chakra-ui/react";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import { Transaction } from "../../lib/Interfaces";

interface BlockProps {
  hash: string;
  previousHash: string;
  timestamp: Date;
  nonce: number;
  transactions: Transaction[];
}

const Block: FC<BlockProps> = ({
  hash,
  previousHash,
  timestamp,
  nonce,
  transactions,
}: BlockProps) => {
  const StyledDivider: FC<any> = (props) => (
    <Divider width="95%" borderColor="gray.400" {...props} />
  );

  const StyledText: FC<any> = ({ children, ...props }: any) => (
    <Text fontSize="0.65em" noOfLines={1} {...props}>
      {children}
    </Text>
  );

  return (
    <Box
      display="flex"
      px={4}
      py={4}
      rounded={4}
      gap={1}
      flexDirection="column"
      border="1px solid black"
      mt={10}
      maxWidth={36}
    >
      <Heading size="sm">Genesis Block</Heading>

      <StyledDivider />
      <StyledText>Hash</StyledText>
      <StyledText color="hotpink">{hash}</StyledText>

      <StyledDivider />
      <StyledText>Previous Hash</StyledText>
      <StyledText>{previousHash}</StyledText>

      <StyledDivider />
      <StyledText>Nonce</StyledText>
      <StyledText>{nonce}</StyledText>

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
      <StyledText>{timestamp.toString()}</StyledText>

      <StyledDivider />
      <Popover>
        <PopoverTrigger>
          <Button>Transactions</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>All Transactions</PopoverHeader>
          <PopoverBody>
            <TransactionsTable transactions={transactions} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Block;
