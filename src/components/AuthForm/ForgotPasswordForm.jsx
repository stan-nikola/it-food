import s from './AuthForm.module.css';

import { useDispatch } from 'react-redux';
import { forgotPassword } from 'redux/auth/operations';
import { Field, Form, Formik } from 'formik';
import { forgotPasswordSchema } from 'constants/schema';

export const ForgotPasswordForm = ({ modalToggle }) => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
  };

  const handForgotPass = ({ email }) => {
    dispatch(forgotPassword({ email }));
    modalToggle();
  };

  return (
    <div className={s.signIn}>
      <h1 className={s.signIn_title}>FORGOT PASSWORD?</h1>

      <p className={s.signIn_subTitle}>
        Enter your email and click get password. Instructions will be sent to
        your inbox.
      </p>

      <Formik
        initialValues={initialValues}
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

            <button className={s.signIn_btn} type="submit">
              GET NEW PASSWORD
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
