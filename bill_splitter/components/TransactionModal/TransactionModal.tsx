import { FC, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAuthContext } from "../../lib/contexts/authContext";
import { useTransactionContext } from "../../lib/contexts/transactionContext";
import { Formik, Form, Field, FieldProps } from "formik";
import { validateInput } from "../Modal/formUtils";
import { SelectOption } from "../../lib/Interfaces";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
  SingleValue,
} from "chakra-react-select";
import axios from "axios";
import { User, Transaction } from "../../lib/Interfaces";
import { CheckIcon } from "@chakra-ui/icons";

interface TransactionModalProps {
  users: User[];
  setPendingTransactions: (value: Transaction[]) => void;
}

const TransactionModal: FC<TransactionModalProps> = ({
  users,
  setPendingTransactions,
}: TransactionModalProps) => {
  const { publicKey, name } = useAuthContext();

  const {
    transactionIsOpen,
    transactionOnClose,
    createTransaction,
    handleOnChange,
    recipient,
    recipientAddress,
  } = useTransactionContext();

  const initialFormValues = {
    toName: "",
    toAddress: "",
  };

  const toast = useToast();

  const selectOptions = users
    .filter((user) => user.name !== name)
    .map((user) => {
      return {
        value: user.name + " " + user.publicKey,
        label: user.name,
      };
    });

  return (
    <Modal
      isOpen={transactionIsOpen}
      onClose={transactionOnClose}
      headerValue={"Create Transaction"}
    >
      <Text>From Name : {name}</Text>
      <Text>From Address: {publicKey}</Text>

      <Formik
        initialValues={initialFormValues}
        onSubmit={(values) =>
          createTransaction(values, toast, setPendingTransactions)
        }
      >
        <Form>
          <Field name="toAddress" validate={validateInput}>
            {({ field, form, meta }: FieldProps) => {
              return (
                <FormControl isInvalid={!!meta.touched && !!meta.error}>
                  <Select
                    placeholder="Select recipient"
                    name={field.name}
                    options={selectOptions}
                    onChange={(option: SingleValue<SelectOption>) =>
                      handleOnChange(option, field, form)
                    }
                    value={
                      selectOptions
                        ? selectOptions.find(
                            (option) => option.value === field.value
                          )
                        : ""
                    }
                    onBlur={field.onBlur}
                  />

                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>

          <Field name="amount" validate={validateInput}>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.amount && form.touched.amount}
              >
                <FormLabel>Enter Amount</FormLabel>
                <Input {...field} placeholder={100} />
                <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Text>Recipient: {recipient}</Text>
          <Text>Recipient Address: {recipientAddress}</Text>

          <Button width="100%" my={3} type="submit">
            Create Transaction
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default TransactionModal;
