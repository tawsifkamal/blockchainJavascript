import {
  Button,
  Heading,
  HStack,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { useAuthContext } from "../../lib/contexts/authContext";
import SignupModal from "../SignupModal/SignupModal";
import LoginModal from "../LoginModal/LoginModal";
import ShowKeysModal from "../ShowKeysModal/ShowKeysModal";

const Navbar: FC<any> = ({ setUsers, users, children }): any => {
  const { logout, signUpOnOpen, loginOnOpen, isLoggedIn } = useAuthContext();

  return (
    <HStack justifyContent="space-between" borderBottom="2px solid black">
      <Heading>Blockchain</Heading>
      {children}
      <SignupModal setUsers={setUsers} users={users} />
      <LoginModal />
      <ShowKeysModal />
    </HStack>
  );
};

export default Navbar;




