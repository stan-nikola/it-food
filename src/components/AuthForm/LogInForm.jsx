import { useState } from 'react';

import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import { Field, Form, Formik } from 'formik';
import { logInSchema } from 'constants/schema';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const LogInForm = ({ modalToggle }) => {
  const [showForgotPass, setShowForgotPass] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleLogIn = ({ email, password }) => {
    dispatch(logIn({ email, password }));
    modalToggle();
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
            initialValues={initialValues}
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

                <button className={s.signIn_btn} type="submit">
                  LOG IN
                </button>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <ForgotPasswordForm modalToggle={modalToggle} />
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
