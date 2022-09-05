import {
  Button,
  Heading,
  HStack,
  Box,
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  Flex,
  Text,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { Formik, Form, Field } from "formik";

const Navbar: FC<any> = ({
  isLoggedIn,
  setIsLoggedIn,
  name,
  setName,
  publicKey,
  setPublicKey,
  privateKey,
  setPrivateKey,
  resetKey,
}): any => {
  const {
    isOpen: signUpIsOpen,
    onOpen: signUpOnOpen,
    onClose: signUpOnClose,
  } = useDisclosure();
  const {
    isOpen: loginIsOpen,
    onOpen: loginOnOpen,
    onClose: loginOnClose,
  } = useDisclosure();

  const {
    isOpen: keyModalIsOpen,
    onOpen: keyModalOnOpen,
    onClose: keyModalOnClose,
  } = useDisclosure();

 

  return (
    <HStack justifyContent="space-between" borderBottom="2px solid black">
      <Heading>Blockchain</Heading>
      {!isLoggedIn ? (
        <Box>
          <Button onClick={signUpOnOpen}>Sign Up</Button>
          <Button onClick={loginOnOpen}>Login</Button>
        </Box>
      ) : (
        <Button onClick={resetKey}>Logout</Button>
      )}
      <SignUpModal
        signUpIsOpen={signUpIsOpen}
        signUpOnClose={signUpOnClose}
        loginOnOpen={loginOnOpen}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setName={setName}
        setPublicKey={setPublicKey}
        setPrivateKey={setPrivateKey}
        keyModalOnOpen={keyModalOnOpen}
      />

      <LoginModal
        signUpOnOpen={signUpOnOpen}
        loginIsOpen={loginIsOpen}
        loginOnClose={loginOnClose}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <ShowKeyModal
        publicKey={publicKey}
        privateKey={privateKey}
        isOpen={keyModalIsOpen}
        onClose={keyModalOnClose}
        name={name}
      />
    </HStack>
  );
};

const SignUpModal = ({
  signUpIsOpen,
  signUpOnClose,
  loginOnOpen,
  isLoggedIn,
  setIsLoggedIn,
  setName,
  setPublicKey,
  setPrivateKey,
  keyModalOnOpen,
}: any) => {
  const validateInput = (value: string) => {
    let error;
    if (!value) {
      error = "is required";
    }

    return error;
  };
  const initialFormValues = {
    username: "",
    password: "",
  };

  const toast = useToast();

  const userExistsError = () => {
    toast({
      title: "User Already Exists!",
      description: "Login instead.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });

    signUpOnClose();
    loginOnOpen();
  };
  return (
    <Modal isOpen={signUpIsOpen} onClose={signUpOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialFormValues}
            onSubmit={async (values) => {
              try {
                const response = await (
                  await axios.post("http://localhost:3000/api/user", values)
                ).data;

                setName(response.name);
                setPublicKey(response.publicKey);
                setPrivateKey(response.privateKey);
                signUpOnClose();
                keyModalOnOpen();
                setIsLoggedIn(true);
              } catch (error: any) {
                if (error.response.data === "user exists") {
                  console.log("the user already exists");
                  userExistsError();
                }
              }
            }}
          >
            <Form>
              <Field name="name" validate={validateInput}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel>Name</FormLabel>
                    <Input {...field} placeholder="name" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button width="100%" my={3} type="submit">
                Generate Private Key
              </Button>
              <Flex gap="4px">
                <Text fontSize="xs">Already have an account?</Text>
                <Link
                  fontSize="xs"
                  color={"blue.400"}
                  onClick={() => {
                    signUpOnClose();
                    loginOnOpen();
                  }}
                >
                  {isLoggedIn ? "Sign up" : "Login"}
                </Link>
              </Flex>
            </Form>
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={signUpOnClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const LoginModal = ({
  signUpOnOpen,
  loginIsOpen,
  loginOnClose,
  isLoggedIn,
  setIsLoggedIn,
}: any) => {
  const validateInput = (value: string) => {
    let error;
    if (!value) {
      error = "is required";
    }

    return error;
  };
  const initialFormValues = {
    username: "",
    password: "",
  };
  return (
    <Modal isOpen={loginIsOpen} onClose={loginOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialFormValues}
            onSubmit={async (values) => {
              console.log("bruh");
            }}
          >
            <Form>
              <Field name="name" validate={validateInput}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel>Name</FormLabel>
                    <Input {...field} placeholder="name" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="privateKey" validate={validateInput}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel>Private Key</FormLabel>
                    <Input {...field} placeholder="private key" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button width="100%" my={3} type="submit">
                Login
              </Button>
              <Flex gap="4px">
                <Text fontSize="xs">Don't have an account?</Text>
                <Link
                  fontSize="xs"
                  color={"blue.400"}
                  onClick={() => {
                    loginOnClose();
                    signUpOnOpen();
                  }}
                >
                  Sign Up
                </Link>
              </Flex>
            </Form>
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={loginOnClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ShowKeyModal: FC<any> = ({
  isOpen,
  onClose,
  name,
  publicKey,
  privateKey,
}: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Welcome ${name}!`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Your Public Key is {publicKey}</Text>
          <Text>
            Your Private Key is {privateKey}. Save this value very carefully!!!!
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default Navbar;
