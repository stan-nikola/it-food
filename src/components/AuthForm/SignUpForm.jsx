import { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import { signUp, verification } from 'redux/auth/operations';
import { useAuth } from 'components/hooks/useAuth';
import { toast } from 'react-toastify';

import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';
import { signUpSchema } from 'constants/schema';

import { mainToast } from 'constants/toastConfig';
import { error } from 'redux/auth/authSlice';

export const SignUpForm = ({ modalToggle }) => {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const { user, isError, isLoading, isLoggedIn } = useAuth();

  const { email: savedEmail } = user;

  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError, mainToast);
    }

    dispatch(error(null));
  }, [dispatch, isError]);

  useEffect(() => {
    if (isLoggedIn) {
      modalToggle(false);
    }
  }, [isLoggedIn, modalToggle]);

  const handleSubmit = ({ name, email, password }) => {
    dispatch(
      signUp({
        name,
        phone,
        email,
        password,
      })
    );
  };

  const handleVerification = () => {
    dispatch(verification({ email: savedEmail, verificationCode }));
  };

  return (
    <div className={s.signIn}>
      <div className={s.signIn_logo}>
        <LogoIcon />
        <p className={s.signIn_logoText}>IT FOOD</p>
      </div>
      <h1 className={s.signIn_title}>SIGN UP</h1>
      {user.email ? (
        <div>
          <p className={s.signIn_subTitle}>
            For verification, enter the code that was sent to:
            <span> {savedEmail}</span>
          </p>

          <form className={s.signIn_form}>
            <input
              placeholder="Code"
              className={s.signIn_field}
              name="vilificationCode"
              onChange={e => setVerificationCode(e.target.value)}
              value={verificationCode}
            />
            <button
              onClick={handleVerification}
              className={s.signIn_btn}
              type="button"
              disabled={isLoading}
            >
              {isLoading ? 'LOADING...' : 'SIGN UP'}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p className={s.signIn_subTitle}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
            incidunt facere laborum!
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signUpSchema}
          >
            {({ errors, touched }) => (
              <Form className={s.signIn_form}>
                <label htmlFor="name">
                  <Field
                    className={s.signIn_field}
                    placeholder="Name"
                    id="name"
                    name="name"
                    type="text"
                  />

                  {errors.name && touched.name && (
                    <div className={s.signIn_form_error}>{errors.name}</div>
                  )}
                </label>

                <label htmlFor="email">
                  <Field
                    className={s.signIn_field}
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                  />
                  {errors.email && touched.email && (
                    <div className={s.signIn_form_error}>{errors.email}</div>
                  )}
                </label>

                <label htmlFor="phone">
                  <PhoneInput
                    className={s.signIn_phone}
                    inputClass={s.signIn_phone_input}
                    buttonClass={s.signIn_phone_flag}
                    id="phone"
                    name="phone"
                    type="phone"
                    // isValid={value => {
                    //   if (value.length < 12) {
                    //     return;
                    //   } else {
                    //     return true;
                    //   }
                    // }}
                    country={'ua'}
                    onChange={setPhone}
                    value={phone}
                  />
                  {errors.phone && touched.phone && (
                    <div className={s.signIn_form_error}>{errors.phone}</div>
                  )}
                </label>
                <label htmlFor="password">
                  <Field
                    placeholder="Password"
                    className={s.signIn_field}
                    type="password"
                    name="password"
                  />
                  {errors.password && touched.password && (
                    <div className={s.signIn_form_error}>{errors.password}</div>
                  )}
                </label>
                <button
                  disabled={isLoading}
                  type="submit"
                  className={s.signIn_btn}
                >
                  {isLoading ? 'LOADING...' : 'SIGN UP'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};
