import type { NextPage } from "next";
import React, { FC, useState, FormEvent } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Container,
  Link,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState(false);
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

  const LoginForm: FC = () => (
    <Box border="1px solid black" boxShadow="5px 9px" rounded={6} p={4}>
      <Heading> {isLogin ? "Log In" : "Sign Up"}</Heading>
      <Formik
        initialValues={initialFormValues}
        onSubmit={async (values) => {
          if (isLogin) {
            const response = await axios.put('http://localhost:3000/api/user', values);
          } else {
            const reponse = await axios.post('http://localhost:3000/api/user', values);
          }
          
          
        }}
      >
        <Form>
          <Field name="username" validate={validateInput}>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.username && form.touched.username}
              >
                <FormLabel>Username</FormLabel>
                <Input {...field} placeholder="username" />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="password" validate={validateInput}>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel>Password</FormLabel>
                <Input type="password" {...field} placeholder="password" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button width="100%" my={3} type="submit">
            Submit
          </Button>
          <Flex gap="4px">
            <Text fontSize="xs">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </Text>
            <Link
              fontSize="xs"
              color={"blue.400"}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </Link>
          </Flex>
        </Form>
      </Formik>
    </Box>
  );

  return (
    <Container maxWidth="container.xl" py={10}>
      <Navbar />
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <LoginForm />
      </Flex>
    </Container>
  );
};

export default Home;
