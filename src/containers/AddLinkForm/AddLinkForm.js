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
import Loader from '@/components/Loader/Loader';
import {
  form,
  formGroup,
  label,
  input,
  inputError,
  dropdownContainer,
  dropdownOption,
  show,
  errorMessage,
  buttonGroup,
  cancelButton,
  submitButton,
} from './AddLinkForm.module.scss';

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

const AddLinkFormSchema = Yup.object().shape({
  title: Yup.string().required('A title is required.'),
  url: Yup.string()
    .url('Invalid URL.')
    .required('A URL is required.'),
  category: Yup.string().required('A category is required.'),
});

const AddLinkForm = ({ toggleClose }) => {
  const [serverError, setServerError] = useState('');
  const [refresh, toggleRefresh] = useContext(RefreshContext);
  const [{ links }, dispatch] = useContext(LinksContext);
  const [showDropdown, toggleDropdown] = useState(false);

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
            category: '',
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
              toggleClose();
            }
          }}
          render={({ values, errors, handleSubmit, handleChange, setFieldValue, resetForm, isSubmitting }) => (
            <form className={form} onSubmit={e => handleSubmit(e)}>
              <div className={formGroup}>
                <label className={label} htmlFor="title">
                  <span>Title:</span>
                  {errors.title && <span className={errorMessage}>{errors.title}</span>}
                </label>
                <input
                  className={clsx(input, errors.title && inputError)}
                  disabled={isSubmitting}
                  name="title"
                  onChange={handleChange}
                  placeholder="Add a Title"
                  type="text"
                  value={values.title}
                />
              </div>
              <div className={formGroup}>
                <label className={label} htmlFor="url">
                  <span>URL:</span>
                  {errors.url && <span className={errorMessage}>{errors.url}</span>}
                </label>
                <input
                  className={clsx(input, errors.url && inputError)}
                  disabled={isSubmitting}
                  name="url"
                  onChange={handleChange}
                  placeholder="Add a URL"
                  type="url"
                  value={values.url}
                />
              </div>
              <div className={formGroup}>
                <label className={label} htmlFor="category">
                  <span>Category:</span>
                  {errors.category && <span className={errorMessage}>{errors.category}</span>}
                </label>
                <input
                  className={clsx(input, errors.category && inputError)}
                  disabled={isSubmitting}
                  name="category"
                  onBlur={() => toggleDropdown(false)}
                  onChange={handleChange}
                  onFocus={() => toggleDropdown(true)}
                  placeholder="Add a New/Existing Category"
                  type="category"
                  value={values.category}
                />
                <div className={clsx(dropdownContainer, showDropdown && show)}>
                  {links.map(({ category }) => {
                    return (
                      <p
                        key={category}
                        className={clsx(dropdownOption)}
                        data-id={category}
                        onClick={e => setFieldValue('category', e.currentTarget.dataset.id)}
                      >
                        {category}
                      </p>
                    );
                  })}
                </div>
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
                  <button className={cancelButton} onClick={() => toggleClose()} type="button">
                    Cancel
                  </button>
                  <button className={submitButton} type="submit">
                    Add Link
                  </button>
                </div>
              )}
            </form>
          )}
          validationSchema={AddLinkFormSchema}
        />
      </CardBody>
    </Card>
  );
};

AddLinkForm.propTypes = {
  toggleClose: PropTypes.func.isRequired,
};

export default AddLinkForm;
