import Modal from "../Modal/Modal";
import { useAuthContext } from "../../lib/contexts/authContext";
import { useTransactionContext } from "../../lib/contexts/transactionContext";
import { Transaction, User } from "../../lib/Interfaces";
import React, { FC, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Text,
  useToast,
  Link,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { validateInput } from "../Modal/formUtils";
import { CheckIcon } from "@chakra-ui/icons";
import { fileURLToPath } from "node:url";

interface BuyCoinModalProps {
  setPendingTransactions: (value: Transaction[]) => void;
}
const BuyCoinModal: FC<BuyCoinModalProps> = ({
  setPendingTransactions,
}: BuyCoinModalProps) => {
  const { signUpOnOpen, signUpOnClose, loginOnOpen, isLoggedIn } =
    useAuthContext();

  const { createTransaction, buyCoinIsOpen, buyCoinOnClose } =
    useTransactionContext();
  const toast = useToast();

  const initialFormValues = {
    amount: "",
  };

  return (
    <Modal
      isOpen={buyCoinIsOpen}
      onClose={buyCoinOnClose}
      headerValue="Buy TawsifCoin"
    >
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values) => {
          createTransaction(values, toast, setPendingTransactions);
        }}
      >
        <Form>
          <Field name="amount" validate={validateInput}>
            {({ field, form }: any) => (
              <>
                <FormControl
                  isInvalid={form.errors.amount && form.touched.amount}
                  pb={3}
                >
                  <FormLabel>Enter USD Amount</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children="$"
                    />
                    <Input
                      {...field}
                      disabled={!isLoggedIn}
                      placeholder="Enter amount"
                    />
                  </InputGroup>

                  <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
                </FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="T"
                  />
                  <Input disabled value={field.value / 5000} />
                </InputGroup>

                <Button
                  disabled={!isLoggedIn}
                  width="100%"
                  bgColor={"teal"}
                  my={3}
                  type="submit"
                >
                  Buy {field.value / 5000} TawsifCoin
                </Button>
              </>
            )}
          </Field>

          {!isLoggedIn && (
            <Flex gap="4px">
              <Text fontSize="xs">Login to buy!</Text>
              <Link
                fontSize="xs"
                color={"blue.400"}
                onClick={() => {
                  signUpOnClose();
                  loginOnOpen();
                }}
              >
                Login
              </Link>
            </Flex>
          )}
        </Form>
      </Formik>
    </Modal>
  );
};

export default BuyCoinModal;
