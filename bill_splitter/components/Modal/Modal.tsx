import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal as ChakraModal,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  useTheme,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerValue: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  headerValue,
  children,
}: ModalProps) => {
  const theme = useTheme();
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerValue}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button
            bgColor={theme.colors.darkBlue}
            color="white"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
export default Modal;
