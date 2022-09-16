import { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { User, SelectOption, Transaction } from "../Interfaces";
import { SingleValue } from "chakra-react-select";
import { FieldInputProps } from "formik";
import { useAuthContext } from "./authContext";

const TransactionContext = createContext<any>(null!);

interface TransactionProviderProps {
  children: ReactNode;
}

interface FormValues {
  toAddress?: string;
  amount: string;
}

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const {
    isOpen: transactionIsOpen,
    onOpen: transactionOnOpen,
    onClose: transactionOnClose,
  } = useDisclosure();

  const {
    isOpen: buyCoinIsOpen,
    onOpen: buyCoinOnOpen,
    onClose: buyCoinOnClose,
  } = useDisclosure();

  const { privateKey, publicKey, name } = useAuthContext();

  const [recipient, setRecipient] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");

  const createTransaction = async (
    values: FormValues,
    toast: typeof useToast,
    setPendingTransactions: (value: Transaction[]) => void
  ) => {
    const [recipientName, recipientAddress] = values.toAddress
      ? values.toAddress.split(" ")
      : [null, null];
    try {
      const body = {
        privateKey,
        transactionDetails: {
          fromName: recipientAddress ? name : "Coinbase",
          fromAddress: recipientAddress ? publicKey : null,
          toName: recipientName ? recipientName : name,
          toAddress: recipientAddress ? recipientAddress : publicKey,
          amount: recipientAddress
            ? parseInt(values.amount)
            : parseInt(values.amount) / 5000,
        },
      };

      const response = await (
        await axios.post("api/transaction", body)
      ).data;

      setPendingTransactions(response.pendingTransactions);
      transactionOnClose();
      transactionSuccessToast(
        toast,
        recipientAddress
          ? values.amount
          : (parseInt(values.amount) / 5000).toString(),
        recipientName ? recipientName : name
      );
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        insufficientFundsErrorToast(toast);
      } else {
        transactionSendingErrorToast(toast);
      }
    }
  };

  const transactionSendingErrorToast = (toast: typeof useToast) => {
    toast({
      title: "Transaction Not Sent!",
      description: "Something went wrong.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const insufficientFundsErrorToast = (toast: typeof useToast) => {
    toast({
      title: "Transaction Not Sent!",
      description: "Insufficient Funds.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const transactionSuccessToast = (
    toast: typeof useToast,
    amount: string,
    name: string
  ) => {
    toast({
      title: "Transaction Created.",
      description: `${amount} TawsifCoin was sent to ${name}.`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleOnChange = (
    option: SingleValue<SelectOption>,
    field: any,
    form: any
  ) => {
    form.setFieldValue(field.name, option?.value);
    if (option) {
      const [selectedRecipient, selectedAddress] = option.value.split(" ");
      setRecipient(selectedRecipient);
      setRecipientAddress(selectedAddress);
    }
  };

  const contextValues = {
    recipient,
    setRecipient,
    recipientAddress,
    setRecipientAddress,
    handleOnChange,
    transactionIsOpen,
    transactionOnOpen,
    transactionOnClose,
    buyCoinIsOpen,
    buyCoinOnOpen,
    buyCoinOnClose,
    createTransaction,
  };
  return (
    <TransactionContext.Provider value={contextValues}>
      {children}
    </TransactionContext.Provider>
  );
};

export function useTransactionContext() {
  return useContext(TransactionContext);
}
