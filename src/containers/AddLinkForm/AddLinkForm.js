import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import to from 'await-to-js';
import store from 'store';
import clsx from 'clsx';
import { RefreshContext } from '@/state/context/RefreshContext';
import { LinksContext } from '@/state/context/LinksContext';
import Card, { CardHeader, CardBody } from '@/components/Card/Card';
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
} from './AddLinkForm.module.scss';

/* eslint-disable no-unused-vars */

const AddLinkFormSchema = Yup.object().shape({
  title: Yup.string().required('A title is required.'),
  url: Yup.string()
    .url('Invalid URL.')
    .required('A URL is required.'),
  category: Yup.string().required('A category is required.'),
});

const AddLinkForm = ({ toggleVisibility }) => {
  const [serverError, setServerError] = useState('');
  const [refresh, toggleRefresh] = useContext(RefreshContext);
  const [, dispatch] = useContext(LinksContext);

  return (
    <Card>
      <CardHeader style={{ paddingTop: '1.3rem' }}>
        <h3>Add a New Link</h3>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            title: '',
            url: '',
            category: 'Test',
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const token = store.get('token');
            const [error, response] = await to(
              axios.post(`/links`, values, {
                headers: { Authorization: token },
              })
            );

            if (error) {
              setServerError('There was an error adding the link, please try again later.');
              setSubmitting(false);
            } else {
              dispatch({ type: 'ADD_LINK', payload: response.data });
              toggleRefresh(!refresh);
              setSubmitting(false);
              resetForm();
              toggleVisibility(false);
            }
          }}
          render={({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
            <form className={form} onSubmit={e => handleSubmit(e)}>
              <label className={label} htmlFor="title">
                Title:
                <input
                  className={clsx(input, errors.title && inputError, !errors.title && touched.title && validInput)}
                  disabled={isSubmitting}
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Netflix"
                  type="text"
                  value={values.title}
                />
                {errors.title && touched.title ? <p className={errorMessage}>{errors.title}</p> : null}
              </label>
              <label className={label} htmlFor="url">
                URL:
                <input
                  className={clsx(input, errors.url && inputError, !errors.url && touched.url && validInput)}
                  disabled={isSubmitting}
                  name="url"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="https://netflix.com"
                  type="url"
                  value={values.url}
                />
                {errors.url && touched.url ? (
                  <p className={errorMessage} style={{ marginBottom: '0' }}>
                    {errors.url}
                  </p>
                ) : null}
              </label>
              {serverError.length > 0 ? <p className={errorMessage}>{serverError}</p> : null}
              <div className={buttonGroup}>
                <button className={cancelButton} onClick={() => toggleVisibility(false)} type="button">
                  Cancel
                </button>
                <button className={submitButton} type="submit">
                  Add Link
                </button>
              </div>
            </form>
          )}
          validationSchema={AddLinkFormSchema}
        />
      </CardBody>
    </Card>
  );
};

AddLinkForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default AddLinkForm;
