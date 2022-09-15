import { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { User } from "../Interfaces";

const AuthContext = createContext<any>(null!);

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [publicKey, setPublicKey] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

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

  const invalidCredentialsError = (toast: typeof useToast) => {
    toast({
      title: "Incorrect Credentials!",
      description: "Name/PrivateKey is wrong.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const internalServerError = (toast: typeof useToast) => {
    toast({
      title: "Internal Server Error!",
      description: "Something went wrong.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const userExistsError = (
    toast: typeof useToast,
    signUpOnClose: () => void,
    loginOnOpen: () => void
  ) => {
    toast({
      title: "User Already Exists!",
      description: "Login instead.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });

    signUpOnClose();
    loginOnOpen();
  };

  const login = async (
    values: { name: string; privateKey: string },
    toast: typeof useToast
  ) => {
    try {
      const response = await (
        await axios.get(`/user/${values.name}?privateKey=${values.privateKey}`)
      ).data;

      setName(response.name);
      setPublicKey(response.publicKey);
      setPrivateKey(response.privateKey);
      loginOnClose();
      setIsLoggedIn(true);
    } catch (error: any) {
      if (error.response.status === 401) {
        invalidCredentialsError(toast);
      } else {
        console.log(error);
        internalServerError(toast);
      }
    }
  };

  const signUp = async (
    values: { name: string; privateKey: string },
    toast: typeof useToast,
    users: User[],
    setUsers: (user: User[]) => void
  ) => {
    try {
      const response = await (await axios.post("/user", values)).data;

      setName(response.name);
      setPublicKey(response.publicKey);
      setPrivateKey(response.privateKey);
      setUsers([...users, response]);
      signUpOnClose();
      keyModalOnOpen();
      setIsLoggedIn(true);
    } catch (error: any) {
      if (error.response.status === 400) {
        console.log("the user already exists");
        userExistsError(toast, signUpOnClose, loginOnOpen);
      } else {
        console.log(error);
        internalServerError(toast);
      }
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setPrivateKey("");
    setPublicKey("");
    setName("");
  };

  const authContextValues = {
    publicKey,
    setPublicKey,
    privateKey,
    setPrivateKey,
    isLoggedIn,
    setIsLoggedIn,
    name,
    setName,
    signUp,
    login,
    logout,
    signUpIsOpen,
    signUpOnOpen,
    signUpOnClose,
    loginIsOpen,
    loginOnOpen,
    loginOnClose,
    keyModalIsOpen,
    keyModalOnOpen,
    keyModalOnClose,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
