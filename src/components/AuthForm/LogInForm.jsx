import { useEffect, useState } from 'react';

import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';
import { useDispatch } from 'react-redux';
import { forgotPassword, logIn } from 'redux/auth/operations';
import { Field, Form, Formik } from 'formik';
import { forgotPasswordSchema, logInSchema } from 'constants/schema';

import { useAuth } from 'components/hooks/useAuth';
import { toast } from 'react-toastify';
import { mainToast } from 'constants/toastConfig';
import { error } from 'redux/auth/authSlice';

export const LogInForm = ({ modalToggle }) => {
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [emailToSend, setEmailToSend] = useState(null);
  const dispatch = useDispatch();

  const { isLoggedIn, isError, isLoading } = useAuth();

  const initialLoginValues = {
    email: '',
    password: '',
  };

  const initialForgotPassValues = {
    email: '',
  };

  useEffect(() => {
    if (isError === 404) toast.error('User not found', mainToast);

    if (isError === 401)
      toast.error('Email or password is incorrect', mainToast);

    if (isError === 200) {
      toast.success(`Email successfully sended to ${emailToSend}`, mainToast);
      modalToggle(false);
    }

    if (isLoggedIn) modalToggle(false);

    dispatch(error(null));
  }, [dispatch, emailToSend, isError, isLoggedIn, modalToggle]);

  const handleLogIn = ({ email, password }) => {
    dispatch(logIn({ email, password }));
  };

  const handForgotPass = ({ email }) => {
    setEmailToSend(email);
    dispatch(forgotPassword({ email }));
  };

  return (
    <div className={s.signIn}>
      <div className={s.signIn_logo}>
        <LogoIcon />
        <p className={s.signIn_logoText}>IT FOOD</p>
      </div>
      {!showForgotPass ? (
        <>
          <h1 className={s.signIn_title}>LOG IN</h1>
          <p className={s.signIn_subTitle}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
            incidunt facere laborum!
          </p>

          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLogIn}
            validationSchema={logInSchema}
          >
            {({ errors, touched }) => (
              <Form className={s.signIn_form}>
                <label htmlFor="email">
                  <Field
                    className={s.signIn_name}
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                  />
                  {errors.email && touched.email && (
                    <div className={s.signIn_form_error}>{errors.email}</div>
                  )}
                </label>

                <label htmlFor="password">
                  <Field
                    placeholder="Password"
                    className={s.signIn_name}
                    type="password"
                    name="password"
                  />
                  {errors.password && touched.password && (
                    <div className={s.signIn_form_error}>{errors.password}</div>
                  )}
                </label>

                <button
                  disabled={isLoading}
                  className={s.signIn_btn}
                  type="submit"
                >
                  {isLoading ? 'LOADING...' : 'LOG IN'}
                </button>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <div className={s.signIn}>
          <h1 className={s.signIn_title}>FORGOT PASSWORD?</h1>

          <p className={s.signIn_subTitle}>
            Enter your email and click get password. Instructions will be sent
            to your inbox.
          </p>

          <Formik
            initialValues={initialForgotPassValues}
            onSubmit={handForgotPass}
            validationSchema={forgotPasswordSchema}
          >
            {({ errors, touched }) => (
              <Form className={s.signIn_form}>
                <label htmlFor="email">
                  <Field
                    className={s.signIn_name}
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                  />
                  {errors.email && touched.email && (
                    <div className={s.signIn_form_error}>{errors.email}</div>
                  )}
                </label>

                <button
                  disabled={isLoading}
                  className={s.signIn_btn}
                  type="submit"
                >
                  {isLoading ? 'LOADING...' : 'GET NEW PASSWORD'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <button
        onClick={() => setShowForgotPass(prev => !prev)}
        className={s.forgot_pass_btn}
        type="button"
      >
        {!showForgotPass ? 'Forgot password?' : 'Log In'}
      </button>
    </div>
  );
};
