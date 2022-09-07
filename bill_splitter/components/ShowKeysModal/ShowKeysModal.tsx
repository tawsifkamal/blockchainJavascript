import { FC } from "react";
import Modal from "../Modal/Modal";
import { Text } from "@chakra-ui/react";
import { useAuthContext } from "../../lib/contexts/authContext";

const ShowKeysModal: FC = () => {
  const { publicKey, privateKey, name, keyModalIsOpen, keyModalOnClose } =
    useAuthContext();
  return (
    <Modal isOpen={keyModalIsOpen} onClose={keyModalOnClose} headerValue={name}>
      <Text>Your Public Key is {publicKey}</Text>
      <Text>
        Your Private Key is {privateKey}. Save this value very carefully!!!!
      </Text>
    </Modal>
  );
};

export default ShowKeysModal;
