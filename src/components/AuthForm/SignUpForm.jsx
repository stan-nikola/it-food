import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import PhoneInput from 'react-phone-input-2';
import s from './AuthForm.module.css';
import { ReactComponent as LogoIcon } from '../../images/svg/logoIcon.svg';
import { useDispatch } from 'react-redux';
import { signUp } from 'redux/auth/operations';
import { useAuth } from 'components/hooks/useAuth';
import { signUpSchema } from 'constants/schema';
import { VerificationForm } from './VerificationForm';

export const SignUpForm = ({ modalToggle }) => {
  const [phone, setPhone] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const { user } = useAuth();

  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = ({ name, email, password }) => {
    dispatch(
      signUp({
        name,
        phone,
        email,
        password,
      })
    );
    setShowVerification(prev => !prev);
  };

  return (
    <div className={s.signIn}>
      <div className={s.signIn_logo}>
        <LogoIcon />
        <p className={s.signIn_logoText}>IT FOOD</p>
      </div>
      <h1 className={s.signIn_title}>SIGN UP</h1>
      {showVerification || user.email ? (
        <VerificationForm modalToggle={modalToggle} />
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
                    className={s.signIn_name}
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

                <label htmlFor="phone">
                  <PhoneInput
                    className={s.signIn_phone}
                    inputClass={s.signIn_phone_input}
                    buttonClass={s.signIn_phone_flag}
                    id="phone"
                    name="phone"
                    type="phone"
                    isValid={value => {
                      if (value.length < 12) {
                        return;
                      } else {
                        return true;
                      }
                    }}
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
                    className={s.signIn_name}
                    type="password"
                    name="password"
                  />
                  {errors.password && touched.password && (
                    <div className={s.signIn_form_error}>{errors.password}</div>
                  )}
                </label>
                <button type="submit" className={s.signIn_btn}>
                  SIGN UP
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};
