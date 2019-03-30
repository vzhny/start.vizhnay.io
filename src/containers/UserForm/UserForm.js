import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import to from 'await-to-js';
import store from 'store';
import clsx from 'clsx';
import { AuthContext } from '@/context/AuthContext';
import Card, { CardHeader, CardBody, CardFooter } from '@/components/Card/Card';
import {
  form,
  label,
  input,
  validInput,
  inputError,
  errorMessage,
  buttonGroup,
  cancelButton,
  submitButton,
  toggleFormButton,
} from './UserForm.module.scss';

const UserFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email!')
    .required('An email address is required.'),
  password: Yup.string().required('A password is required.'),
});

const UserForm = ({ toggleVisibility }) => {
  const [formType, setFormType] = useState('login');
  const [serverError, setServerError] = useState('');
  const [, setAuth] = useContext(AuthContext);

  const toggleBetweenForms = () => {
    if (formType === 'login') {
      setFormType('register');
    } else {
      setFormType('login');
    }
  };

  return (
    <Card>
      <CardHeader style={{ paddingTop: '1.3rem' }}>
        <h3>{formType === 'login' ? 'Log into an existing account!' : 'Register a new account!'}</h3>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const [error, response] = await to(axios.post(`/auth/${formType}`, values));

            if (error) {
              setServerError('There was an error logging in, please try again later.');
              setSubmitting(false);
            } else {
              const { jwt } = response.data;
              store.set('token', jwt);
              setAuth(true);
              setSubmitting(false);
              toggleVisibility(false);
            }
          }}
          render={({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
            <form className={form} onSubmit={e => handleSubmit(e)}>
              <label className={label} htmlFor="email">
                Email:
                <input
                  className={clsx(input, errors.email && inputError, !errors.email && touched.email && validInput)}
                  disabled={isSubmitting}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="hello@gmail.com"
                  type="text"
                  value={values.email}
                />
                {errors.email && touched.email ? <p className={errorMessage}>{errors.email}</p> : null}
              </label>
              <label className={label} htmlFor="password">
                Password:
                <input
                  className={clsx(
                    input,
                    errors.password && inputError,
                    !errors.password && touched.password && validInput
                  )}
                  disabled={isSubmitting}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="••••••"
                  type="password"
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <p className={errorMessage} style={{ marginBottom: '0' }}>
                    {errors.password}
                  </p>
                ) : null}
              </label>
              {serverError.length > 0 ? <p className={errorMessage}>{serverError}</p> : null}
              <div className={buttonGroup}>
                <button className={cancelButton} onClick={() => toggleVisibility(false)} type="button">
                  Cancel
                </button>
                <button className={submitButton} type="submit">
                  {formType === 'login' ? 'Login' : 'Register'}
                </button>
              </div>
            </form>
          )}
          validationSchema={UserFormSchema}
        />
      </CardBody>
      <CardFooter>
        <button className={toggleFormButton} onClick={() => toggleBetweenForms()} type="button">
          {formType === 'login' ? 'Register a new account!' : 'Log into an existing account!'}
        </button>
      </CardFooter>
    </Card>
  );
};

UserForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default UserForm;
