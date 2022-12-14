import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Text,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/NavbarChakra";
import { Block, Blockchain, User } from "../lib/Interfaces";


const UserPage = () => {
  const [blockchain, setBlockchain] = useState<Blockchain>(null);
  const [users, setUsers] = useState<User[]>([]);
  const initialFormValues = {
    difficulty: blockchain ? blockchain.difficulty : "",
    miningReward: blockchain ? blockchain.miningReward : "",
  };

  useEffect(() => {
    async function fetchData() {
      const blockchainResponse = await (await axios.get("api/blockchain")).data;
      const usersResponse = await (await axios.get("api/user")).data;

      setBlockchain(blockchainResponse);
      setUsers(usersResponse);
    }

    fetchData();
  }, []);

  const toast = useToast();
  const theme = useTheme();

  const handleSubmit = async (values) => {
    try {
      const body = {
        difficulty: parseInt(values.difficulty),
        miningReward: parseInt(values.miningReward),
      };
      const response = await (await axios.put("api/blockchain/update", body)).data;
      setBlockchain(response);

      toast({
        title: "Blockchain Updated!.",
        description: `The difficulty/miningReward has been changed.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error!.",
        description: `Something went wrong.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <Container maxWidth="container.xl" py={10}>
      <Navbar setUsers={setUsers} users={users} />
      <Text pt={3}>Current Difficulty: {blockchain ? blockchain.difficulty : ""}</Text>
      <Text>Current Mining Reward: {blockchain ? blockchain.miningReward : ""}</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
        <Form>
          <Field name="difficulty">
            {({ field, form }: any) => (
              <FormControl
                pt={4}
                isInvalid={form.errors.difficulty && form.touched.difficulty}
              >
                <FormLabel>Difficulty</FormLabel>
                <Input {...field} placeholder={blockchain ? blockchain.difficulty : ""} />
                <FormErrorMessage>{form.errors.difficulty}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="miningReward">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={
                  form.errors.miningReward && form.touched.miningReward
                }
              >
                <FormLabel>Mining Reward</FormLabel>
                <Input {...field} placeholder={blockchain ? blockchain.miningReward : ""} />
                <FormErrorMessage>{form.errors.difficulty}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            width="100%"
            bgColor={theme.colors.darkBlue}
            color="white"
            my={3}
            type="submit"
          >
            Update Values
          </Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default UserPage;
