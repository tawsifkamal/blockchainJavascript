export const validateInput = (value: string) => {
  let error;
  if (!value) {
    error = "is required";
  }

  return error;
};
