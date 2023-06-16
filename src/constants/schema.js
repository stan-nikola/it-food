import * as yup from 'yup';

export const mailFormat = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
const phoneRegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const signUpSchema = yup.object({
  name: yup
    .string()
    .min(4, 'Name must be at least 4 letters long')
    .max(16, 'Name must be not longer than 16 letters')

    .required('Please enter name. For example Mango, Polly'),
  email: yup
    .string()
    .email('Must be a valid email. Example: my.mail@mail.com')
    .matches(mailFormat, 'E-mail is not valid')
    .required('Please enter e-mail '),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),

  password: yup
    .string()
    .min(6, 'Password must contain at least 7 characters')
    .required('Please enter password'),
});

export const logInSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email Example: my.mail@mail.com')
    .matches(mailFormat, 'E-mail is not valid')
    .required('Please enter e-mail '),
  password: yup
    .string()
    .min(6, 'Password must contain at least 7 characters')
    .required('Please enter password'),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email Example: my.mail@mail.com')
    .matches(mailFormat, 'E-mail is not valid')
    .required('Please enter e-mail '),
});
