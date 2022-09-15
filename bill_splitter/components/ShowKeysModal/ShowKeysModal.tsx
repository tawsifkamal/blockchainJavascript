import { FC } from "react";
import Modal from "../Modal/Modal";
import { Text, FormLabel, useTheme, Code } from "@chakra-ui/react";
import { useAuthContext } from "../../lib/contexts/authContext";

const ShowKeysModal: FC = () => {
  const { publicKey, privateKey, name, keyModalIsOpen, keyModalOnClose } =
    useAuthContext();
  const theme = useTheme();
  return (
    <Modal
      isOpen={keyModalIsOpen}
      onClose={keyModalOnClose}
      headerValue={"Welcome, " + name + "!"}
    >
      <FormLabel>Your Public Key:</FormLabel>
      <Code
        color={theme.colors.teal}
        width="full"
        bgColor={theme.colors.darkBlue}
        mb={3}
        fontWeight="bold"
        boxShadow="base"
        p={2}
      >
        {publicKey}
      </Code>
      <FormLabel>
        Your Private Key:
      </FormLabel>
      <Code
        color={theme.colors.teal}
        width="full"
        bgColor={theme.colors.darkBlue}
        mb={3}
        fontWeight="bold"
        boxShadow="base"
        p={2}
      >
        {privateKey}
      </Code>
      <Text fontWeight="bold" color="red">Copy and save your private key very carefully! Or else you cannot transact.</Text>
    </Modal>
  );
};

export default ShowKeysModal;
