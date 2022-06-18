import * as DbActions from './db';

const validateEmail = email => {
  const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailValidate.test(email);
};

const validatePrice = price => {
  const priceValidate = /^[0-9]*$/;
  return priceValidate.test(price);
};

export const Validators = {
  validateLogin: values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (values.email && !validateEmail(values.email)) {
      errors.email = 'Wrong format of email';
    }
    if (values.password && values.password.length < 8) {
      errors.password = 'be at least 8 characters long';
    }
    if (!Object.keys(errors).length && !DbActions.loginUser(values)) {
      errors.wrongEmailOrPassword = 'Wrong email or password';
    }
    return errors;
  },

  validateClientSignup: values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (values.email && !validateEmail(values.email)) {
      errors.email = 'Wrong format of email';
    }
    if (values.password && values.password.length < 8) {
      errors.password = 'be at least 8 characters long';
    }
    if (values.password.length >= 8 && values.password !== values.cpassword) {
      errors.cpassword = "Passwords doesn't match";
    }
    return errors;
  },

  validateBarberSignup: values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (values.email && !validateEmail(values.email)) {
      errors.email = 'Wrong format of email';
    }
    if (!values.firstName) {
      errors.firstName = 'Firstname is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Lastname is required';
    }
    if (!values.address) {
      errors.address = 'Address is required';
    }
    if (!values.price) {
      errors.price = 'Price is required';
    }
    if (values.price && !validatePrice(values.price)) {
      errors.price = 'make sure to use digits only';
    }
    return errors;
  },
};
