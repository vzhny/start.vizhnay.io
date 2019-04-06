import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import to from 'await-to-js';
import store from 'store';
import clsx from 'clsx';
import { RefreshContext } from '@/state/context/RefreshContext';
import { AuthContext } from '@/state/context/AuthContext';
import Card, { CardHeader, CardBody, CardFooter } from '@/components/Card/Card';
import Loader from '@/components/Loader/Loader';
import {
  form,
  formGroup,
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

const UserForm = ({ toggleClose }) => {
  const [formType, setFormType] = useState('login');
  const [serverError, setServerError] = useState('');
  const [refresh, toggleRefresh] = useContext(RefreshContext);
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
              toggleRefresh(!refresh);
              toggleClose();
            }
          }}
          render={({ values, errors, handleSubmit, handleChange, resetForm, isSubmitting }) => (
            <form className={form} onSubmit={e => handleSubmit(e)}>
              <div className={formGroup}>
                <label className={label} htmlFor="email">
                  <span>Email:</span>
                  <span>{errors.email && <span className={errorMessage}>{errors.email}</span>}</span>
                </label>
                <input
                  className={clsx(input, errors.email && inputError, !errors.email && validInput)}
                  disabled={isSubmitting}
                  name="email"
                  onChange={handleChange}
                  placeholder="hello@gmail.com"
                  type="text"
                  value={values.email}
                />
              </div>
              <div className={formGroup}>
                <label className={label} htmlFor="password">
                  <span>Password:</span>
                  {errors.password && <span className={errorMessage}>{errors.password}</span>}
                </label>
                <input
                  className={clsx(input, errors.password && inputError, !errors.password && validInput)}
                  disabled={isSubmitting}
                  name="password"
                  onChange={handleChange}
                  placeholder="••••••"
                  type="password"
                  value={values.password}
                />
              </div>
              {serverError.length > 0 && (
                <div className={formGroup}>
                  <p className={errorMessage}>{serverError}</p>
                </div>
              )}
              {isSubmitting ? (
                <Loader />
              ) : (
                <div className={buttonGroup}>
                  <button
                    className={cancelButton}
                    onClick={() => {
                      resetForm();
                      toggleClose();
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button className={submitButton} type="submit">
                    {formType === 'login' ? 'Login' : 'Register'}
                  </button>
                </div>
              )}
            </form>
          )}
          validationSchema={UserFormSchema}
        />
      </CardBody>
      <CardFooter>
        <button
          className={toggleFormButton}
          onClick={() => {
            toggleBetweenForms();
          }}
          type="button"
        >
          {formType === 'login' ? 'Register a new account!' : 'Log into an existing account!'}
        </button>
      </CardFooter>
    </Card>
  );
};

UserForm.propTypes = {
  toggleClose: PropTypes.func.isRequired,
};

export default UserForm;
