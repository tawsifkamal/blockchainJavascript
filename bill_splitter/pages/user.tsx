import { Container, Flex } from "@chakra-ui/react";
import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import Navbar from "../components/Navbar/NavbarChakra";
import UsersTable from "../components/UsersTable/UsersTable";
import { Block, Blockchain, User } from "../lib/Interfaces";

interface UserPageProps {
  usersFromFetchCall: User[];
  tawsifCoin: Blockchain;
}
const UserPage = ({ usersFromFetchCall, tawsifCoin }: UserPageProps) => {
  const [blockchain, setBlockchain] = useState<Block[]>(tawsifCoin.chain);
  const [users, setUsers] = useState<User[]>(usersFromFetchCall || []);
  return (
    <Container maxWidth="container.xl" py={10}>
      <Navbar setUsers={setUsers} users={users} />
      <UsersTable users={users} blockchain={blockchain} />
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

export default UserPage;
