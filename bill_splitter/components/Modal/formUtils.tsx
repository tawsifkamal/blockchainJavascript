export const validateInput = (value: string | number) => {
  let error;
  if (!value) {
    error = "is required";
  }

  return error;
};
