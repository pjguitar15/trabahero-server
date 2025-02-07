import valid from 'validator';

export const validateSignupData = (
  username: string,
  email: string,
  password: string,
) => {
  if (!username || !email || !password) {
    return {
      error: 'All fields are required',
    };
  }

  const isEmailValid = valid.isEmail(email);

  if (!isEmailValid) {
    return {
      error: 'Email is invalid',
    };
  }
};
