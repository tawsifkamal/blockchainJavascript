import Modal from "../Modal/Modal";
import { useAuthContext } from "../../lib/contexts/authContext";
import {
  useToast,
  Link,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { validateInput } from "../Modal/formUtils";

const LoginModal = () => {
  const toast = useToast();
  const { loginIsOpen, loginOnClose, signUpOnOpen, login } = useAuthContext();
  const initialFormValues = {
    name: "",
    privateKey: "",
  };

  return (
    <Modal
      isOpen={loginIsOpen}
      onClose={loginOnClose}
      headerValue="Login"
    >
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values) => login(values, toast)}
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
    </Modal>
  );
};

export default LoginModal;
