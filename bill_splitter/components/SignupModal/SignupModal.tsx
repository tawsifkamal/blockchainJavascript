import Modal from "../Modal/Modal";
import { useAuthContext } from "../../lib/contexts/authContext";
import { User } from "../../lib/Interfaces";
import { FC } from "react";
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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { validateInput } from "../Modal/formUtils";

interface SignUpModalProps {
  users: User[];
  setUsers: (value: User[]) => void;
}
const SignUpModal: FC<SignUpModalProps> = ({
  users,
  setUsers,
}: SignUpModalProps) => {
  const { signUpIsOpen, signUpOnClose, signUp, loginOnOpen } = useAuthContext();
  const toast = useToast();
  const initialFormValues = {
    name: "",
    privateKey: "",
  };

  return (
    <Modal
      isOpen={signUpIsOpen}
      onClose={signUpOnClose}
      headerValue="Sign Up"
    >
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values) => signUp(values, toast, users, setUsers)}
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
              Login
            </Link>
          </Flex>
        </Form>
      </Formik>
    </Modal>
  );
};

export default SignUpModal;
