import { Container, Flex } from "@chakra-ui/react";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/NavbarChakra";
import UsersTable from "../components/UsersTable/UsersTable";
import { Block, Blockchain, User } from "../lib/Interfaces";

interface UserPageProps {
  usersFromFetchCall: User[];
  tawsifCoin: Blockchain;
}


const UserPage = () => {
  const [blockchain, setBlockchain] = useState<Block[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const blockchainResponse = await (await axios.get("api/blockchain")).data;
      const usersResponse = await (await axios.get("api/user")).data;

      setBlockchain(blockchainResponse.chain);
      setUsers(usersResponse);
    }

    fetchData();
  }, []);
  
  return (
    <Container maxWidth="container.xl" py={10}>
      <Navbar setUsers={setUsers} users={users} />
      <UsersTable users={users} blockchain={blockchain} />
    </Container>
  );
};


export default UserPage;
